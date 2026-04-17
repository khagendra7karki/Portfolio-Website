import { useState, useEffect, FC, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { Loader, Nav, Social, Email, Footer, Head } from "@/components";
import { GlobalStyle, theme } from "@/styles";
import { StyledContent } from "./layout.style";
import { useRouter } from "next/router";
import Headroom from "react-headroom";

interface layoutProps {
	children: ReactNode;
}

const Layout: FC<layoutProps> = ({ children }) => {
	const router = useRouter();
	const isHome = router.pathname === "/";
	const [isLoading, setIsLoading] = useState(isHome);

	// Sets target="_blank" rel="noopener noreferrer" on external links
	const handleExternalLinks = () => {
		const allLinks = Array.from(document.querySelectorAll("a"));
		if (allLinks.length > 0) {
			allLinks.forEach((link) => {
				if (link.host !== window.location.host) {
					link.setAttribute("rel", "noopener noreferrer");
					link.setAttribute("target", "_blank");
				}
			});
		}
	};

	useEffect(() => {
		if (isLoading) {
			return;
		}

		handleExternalLinks();
	}, [isLoading]);

	return (
		<>
			<Head />

			<div id="root">
				<ThemeProvider theme={theme}>
					<GlobalStyle />

					<a className="skip-to-content" href="#content">
						Skip to Content
					</a>

					{isLoading && isHome ? (
						<>
							<Loader finishLoading={() => setIsLoading(false)} />
						</>
					) : (
						<StyledContent>
							<Headroom>
								<Nav isHome={isHome} />
							</Headroom>
							<Social isHome={isHome} />
							<Email isHome={isHome} />

							<div id="content">
								{children}
								<Footer />
							</div>
						</StyledContent>
					)}
				</ThemeProvider>
			</div>
		</>
	);
};

export default Layout;
