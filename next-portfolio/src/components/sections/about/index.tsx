import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { srConfig } from "@/config";
import { usePrefersReducedMotion } from "@/hooks";
import { StyledAboutSection, StyledPic, StyledText } from "./about.style";
import ME from "@/images/me.jpeg";

const About = () => {
    const revealContainer = useRef<HTMLElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !revealContainer.current) {
            return;
        }

        async function animate() {
            if (revealContainer.current) {
                const sr = (await import("scrollreveal")).default;
                sr().reveal(revealContainer.current, srConfig());
            }
        }
        animate();
    }, [prefersReducedMotion]);

    const skills = [
        "Go (Golang)",
        "React",
        "TypeScript",
        "Node.js (with NestJS)",
        "Python (with Django)",
        "PostgreSQL",
    ];

    return (
        <StyledAboutSection id="about" ref={revealContainer}>
            <h2 className="numbered-heading">About Me</h2>

            <div className="inner">
                <StyledText>
                    <div>
                        <p>
                            Hi — I’m Khagendra, a computer engineer who loves solving problems
                            &nbsp;<strong>programmatically</strong>. I care about efficiency, automation, and
                            building systems that scale without human babysitting.
                        </p>

                        <p>
                            I don’t like repeating work. If something can be automated, optimized,
                            or turned into a reusable pattern — I’ll build the abstraction that does it
                            once, properly, and permanently. My focus is on engineered leverage:
                            pipelines, tooling, APIs, scraping systems, and intelligent automation that
                            turn chaotic data into actionable output.
                        </p>

                        <p>
                            I’m currently building toward entrepreneurship — shipping real products that
                            solve actual pain points through software, not hype. My work direction is
                            increasingly around market intelligence, autonomous decision systems, and
                            automation that compounds value over time.
                        </p>

                        <p>
                            <strong>
                                I build efficient systems that outscale human time. If you want to co-build
                                software that turns complexity into leverage — let’s talk.
                            </strong>
                        </p>
                    </div>

                    <ul className="skills-list">
                        {skills &&
                            skills.map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>
                </StyledText>

                <StyledPic>
                    <div className="wrapper">
                        <Image
                            className="img"
                            src={ME}
                            alt="Headshot"
                            width={300}
                            height={300}
                        />
                    </div>
                </StyledPic>
            </div>
        </StyledAboutSection>
    );
};

export default About;
