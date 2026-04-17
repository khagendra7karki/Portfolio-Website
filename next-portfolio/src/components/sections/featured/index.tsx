import React, { useEffect, useRef } from "react";
import { srConfig } from "@/config";
import { Icon } from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks";
import { StyledProject, StyledProjectsGrid } from "./featured.style";
import { getFeaturedReturnType } from "@/lib";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface featuredProps {
	data: getFeaturedReturnType[];
}

const Featured: React.FC<featuredProps> = ({ data }) => {
	const featuredProjects = data?.filter((node) => node);
	const revealTitle = useRef(null);
	const revealProjects = useRef<(HTMLLIElement | null)[]>([]);
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}

		async function animate() {
			const sr = (await import("scrollreveal")).default;
			if (revealTitle.current) {
				sr().reveal(revealTitle.current, srConfig());
			}
			if (revealProjects.current) {
				revealProjects.current.forEach((ref, i) => {
					if (ref) sr().reveal(ref, srConfig(i * 100));
				});
			}
		}
		animate();
	}, [prefersReducedMotion]);

	return (
		<section id="projects">
			<h2 className="numbered-heading" ref={revealTitle}>
				Some Things I’ve Built
			</h2>

			<StyledProjectsGrid>
				{featuredProjects &&
					featuredProjects.map((node, i) => {
						const { frontmatter, content } = node;
						const { external, title, tech, github, cover, cta } =
							frontmatter;

						return (
							<StyledProject
								key={i}
								ref={(el) => (revealProjects.current[i] = el)}
							>
								<div className="project-content">
									<div>
										<p className="project-overline">
											Featured Project
										</p>

										<h3 className="project-title">
											<a href={external}>{title}</a>
										</h3>

										<div className="project-description">
											<ReactMarkdown>
												{content}
											</ReactMarkdown>
										</div>

										{tech.length && (
											<ul className="project-tech-list">
												{tech.map(
													(
														tech: string,
														i: number
													) => (
														<li key={i}>{tech}</li>
													)
												)}
											</ul>
										)}

										<div className="project-links">
											{cta && (
												<a
													href={cta}
													aria-label="Course Link"
													className="cta"
												>
													Learn More
												</a>
											)}
											{github && (
												<a
													href={github}
													aria-label="GitHub Link"
												>
													<Icon name="GitHub" />
												</a>
											)}
											{external && !cta && (
												<a
													href={external}
													aria-label="External Link"
													className="external"
												>
													<Icon name="External" />
												</a>
											)}
										</div>
									</div>
								</div>

								<div className="project-image">
									<a
										href={
											external
												? external
												: github
												? github
												: "#"
										}
									>
										<Image
											src={cover}
											alt={title}
											width={580}
											height={360}
											className="img"
										/>
									</a>
								</div>
							</StyledProject>
						);
					})}
			</StyledProjectsGrid>
		</section>
	);
};

export default Featured;
