import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { navDelay, loaderDelay } from "@/utils";
import { usePrefersReducedMotion } from "@/hooks";
import { StyledHeroSection } from "./hero.style";
import Link from "next/link";

const Hero = () => {
    const [isMounted, setIsMounted] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        const timeout = setTimeout(() => setIsMounted(true), navDelay);
        return () => clearTimeout(timeout);
    }, [prefersReducedMotion]);

    // const one = <h1>Hi, my name is</h1>;
    const two = <h2 className="big-heading">Khagendra Karki</h2>;
    const three = <h3 className="big-heading">Software Engineer</h3>;
    const four = (
        <>
            <p className="description">
                I build innovative and scalable software solutions that bring
                ideas to life.
            </p>
        </>
    );
    const five = (
        <Link
            className="email-link"
            href="/#contact"
        // target="_blank"
        // rel="noreferrer"
        >
            Get in touch!
        </Link>
    );

    const items = [two, three, four, five];

    return (
        <StyledHeroSection>
            {prefersReducedMotion ? (
                <>
                    {items.map((item, i) => (
                        <div key={i}>{item}</div>
                    ))}
                </>
            ) : (
                <TransitionGroup component={null}>
                    {isMounted &&
                        items.map((item, i) => (
                            <CSSTransition
                                key={i}
                                classNames="fadeup"
                                timeout={loaderDelay}
                            >
                                <div
                                    style={{ transitionDelay: `${i + 1}00ms` }}
                                >
                                    {item}
                                </div>
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            )}
        </StyledHeroSection>
    );
};

export default Hero;
