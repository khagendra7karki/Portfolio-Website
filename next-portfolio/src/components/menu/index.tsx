import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Script from "next/script";
import { navLinks } from "@/config";
import { KEY_CODES } from "@/utils";
import { useOnClickOutside } from "@/hooks";
import { StyledHamburgerButton, StyledMenu, StyledSidebar } from "./menu.style";

const Menu = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const navRef = useRef<HTMLDivElement>(null);

	const menuFocusablesRef = useRef<Array<HTMLElement>>([]);
	const firstFocusableElRef = useRef<HTMLElement | null>(null);
	const lastFocusableElRef = useRef<HTMLElement | null>(null);

	const setFocusables = useCallback(() => {
		const menuFocusables = [
			buttonRef.current!,
			...Array.from(navRef.current!.querySelectorAll("a")),
		];
		menuFocusablesRef.current = menuFocusables;
		firstFocusableElRef.current = menuFocusables[0] || null;
		lastFocusableElRef.current =
			menuFocusables[menuFocusables.length - 1] || null;
	}, []);

	const handleBackwardTab = useCallback((e: KeyboardEvent) => {
		if (
			firstFocusableElRef.current &&
			lastFocusableElRef.current &&
			document.activeElement === firstFocusableElRef.current
		) {
			e.preventDefault();
			lastFocusableElRef.current.focus();
		}
	}, []);

	const handleForwardTab = useCallback((e: KeyboardEvent) => {
		if (
			firstFocusableElRef.current &&
			lastFocusableElRef.current &&
			document.activeElement === lastFocusableElRef.current
		) {
			e.preventDefault();
			firstFocusableElRef.current.focus();
		}
	}, []);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			switch (e.key) {
				case KEY_CODES.ESCAPE:
				case KEY_CODES.ESCAPE_IE11: {
					setMenuOpen(false);
					break;
				}

				case KEY_CODES.TAB: {
					if (menuFocusablesRef.current.length === 1) {
						e.preventDefault();
						break;
					}
					if (e.shiftKey) {
						handleBackwardTab(e);
					} else {
						handleForwardTab(e);
					}
					break;
				}

				default: {
					break;
				}
			}
		},
		[handleBackwardTab, handleForwardTab]
	);

	const onResize = (e: UIEvent) => {
		if ((e.currentTarget as Window).innerWidth > 768) {
			setMenuOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);
		window.addEventListener("resize", onResize);

		setFocusables();

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("resize", onResize);
		};
	}, [onKeyDown, setFocusables]);

	useEffect(() => {
		const body = document.querySelector("body")!;

		if (menuOpen) {
			body.classList.add("blur");
		} else {
			if (body.classList.contains("blur")) body.classList.remove("blur");
		}
	}, [menuOpen]);

	const wrapperRef = useRef<HTMLDivElement>(null);
	useOnClickOutside(wrapperRef, () => setMenuOpen(false));

	return (
		<StyledMenu>
			<div ref={wrapperRef}>
				<StyledHamburgerButton
					onClick={toggleMenu}
					menuOpen={menuOpen}
					ref={buttonRef}
					aria-label="Menu"
				>
					<div className="ham-box">
						<div className="ham-box-inner" />
					</div>
				</StyledHamburgerButton>

				<StyledSidebar
					menuOpen={menuOpen}
					aria-hidden={!menuOpen}
					tabIndex={menuOpen ? 1 : -1}
				>
					<nav ref={navRef}>
						{navLinks && (
							<ol>
								{navLinks.map(({ url, name }, i) => (
									<li key={i}>
										<Link
											href={url}
											onClick={() => setMenuOpen(false)}
										>
											{name}
										</Link>
									</li>
								))}
							</ol>
						)}

						<a href="/resume.pdf" className="resume-link">
							Resume
						</a>
					</nav>
				</StyledSidebar>
			</div>
		</StyledMenu>
	);
};

export default Menu;
