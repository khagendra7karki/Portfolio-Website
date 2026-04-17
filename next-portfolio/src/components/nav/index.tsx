import React, { useState, useEffect, FC } from "react";
import Link from "next/link";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { navLinks } from "@/config";
import { loaderDelay } from "@/utils";
import { usePrefersReducedMotion } from "@/hooks";
import { Menu } from "@/components";
import { IconLogo } from "@/components/icons";
import { StyledHeader, StyledLinks, StyledNav } from "./nav.style";

interface navProps {
    isHome: boolean;
}

const Nav: FC<navProps> = ({ isHome }) => {
    const [isMounted, setIsMounted] = useState(!isHome);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        const timeout = setTimeout(() => {
            setIsMounted(true);
        }, 100);

        return () => {
            clearTimeout(timeout);
        };
    }, [prefersReducedMotion]);

    const timeout = isHome ? loaderDelay : 0;
    const fadeClass = isHome ? "fade" : "";
    const fadeDownClass = isHome ? "fadedown" : "";


    const Logo = (

        <div className="logo" tabIndex={-1}>
            <Link href="/" aria-label="home">
                <div className="hex-container">
                    <svg viewBox="0 0 69 79" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M34.5 2L67 20.5V58.5L34.5 77L2 58.5V20.5L34.5 2Z"
                            fill="var(--green)"
                        />
                    </svg>
                </div>
                <div className="logo-container">
                    <IconLogo />
                </div>
            </Link>
        </div>
        // <div className="logo" tabIndex={-1}>
        //     {isHome ? (
        //         <Link href="/" aria-label="home">
        //             <IconLogo />
        //         </Link>
        //     ) : (
        //         <Link href="/" aria-label="home">
        //             <IconLogo />
        //         </Link>
        //     )}
        // </div>
    );

    const ResumeLink = (
        <a
            className="resume-button"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
        >
            Resume
        </a>
    );

    return (
        <StyledHeader>
            <StyledNav>
                {prefersReducedMotion ? (
                    <>
                        {Logo}

                        <StyledLinks>
                            <ol>
                                {navLinks &&
                                    navLinks.map(({ url, name }, i) => (
                                        <li key={i}>
                                            <Link href={url}>{name}</Link>
                                        </li>
                                    ))}
                            </ol>
                            <div>{ResumeLink}</div>
                        </StyledLinks>

                        <Menu />
                    </>
                ) : (
                    <>
                        <TransitionGroup component={null}>
                            {isMounted && (
                                <CSSTransition
                                    classNames={fadeClass}
                                    timeout={timeout}
                                >
                                    <>{Logo}</>
                                </CSSTransition>
                            )}
                        </TransitionGroup>

                        <StyledLinks>
                            <ol>
                                <TransitionGroup component={null}>
                                    {isMounted &&
                                        navLinks &&
                                        navLinks.map(({ url, name }, i) => (
                                            <CSSTransition
                                                key={i}
                                                classNames={fadeDownClass}
                                                timeout={timeout}
                                            >
                                                <li
                                                    key={i}
                                                    style={{
                                                        transitionDelay: `${isHome ? i * 100 : 0
                                                            }ms`,
                                                    }}
                                                >
                                                    <Link href={url}>
                                                        {name}
                                                    </Link>
                                                </li>
                                            </CSSTransition>
                                        ))}
                                </TransitionGroup>
                            </ol>

                            <TransitionGroup component={null}>
                                {isMounted && (
                                    <CSSTransition
                                        classNames={fadeDownClass}
                                        timeout={timeout}
                                    >
                                        <div
                                            style={{
                                                transitionDelay: `${isHome
                                                    ? navLinks.length * 100
                                                    : 0
                                                    }ms`,
                                            }}
                                        >
                                            {ResumeLink}
                                        </div>
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                        </StyledLinks>

                        <TransitionGroup component={null}>
                            {isMounted && (
                                <CSSTransition
                                    classNames={fadeClass}
                                    timeout={timeout}
                                >
                                    <Menu />
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </>
                )}
            </StyledNav>
        </StyledHeader>
    );
};

export default Nav;
