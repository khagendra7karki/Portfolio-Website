import React, { useState, useEffect, ReactNode, FC } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { loaderDelay } from "@/utils";
import { usePrefersReducedMotion } from "@/hooks";
import { StyledSideElement } from "./side.style";

interface sideProps {
	children: ReactNode;
	isHome: boolean;
	orientation: "left" | "right";
}

const Side: FC<sideProps> = ({ children, isHome, orientation }) => {
	const [isMounted, setIsMounted] = useState(!isHome);
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		if (!isHome || prefersReducedMotion) {
			return;
		}
		const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
		return () => clearTimeout(timeout);
	}, [isHome, prefersReducedMotion]);

	return (
		<StyledSideElement orientation={orientation}>
			{prefersReducedMotion ? (
				<>{children}</>
			) : (
				<TransitionGroup component={null}>
					{isMounted && (
						<CSSTransition
							classNames={isHome ? "fade" : ""}
							timeout={isHome ? loaderDelay : 0}
						>
							{children}
						</CSSTransition>
					)}
				</TransitionGroup>
			)}
		</StyledSideElement>
	);
};

export default Side;
