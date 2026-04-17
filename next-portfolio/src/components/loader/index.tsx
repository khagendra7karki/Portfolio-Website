import { useState, useEffect, useCallback, FC } from "react";
import anime from "animejs";
import { StyledLoader } from "./loader.style";
import { IconLoader } from "@/components/icons";

interface loaderProps {
    finishLoading: () => void;
}

const Loader: FC<loaderProps> = ({ finishLoading }) => {
    const [isMounted, setIsMounted] = useState(false);

    const animate = useCallback(() => {
        const loader = anime.timeline({
            complete: () => finishLoading(),
        });

        loader
            .add({
                targets: "#logo path",
                delay: 300,
                duration: 1500,
                easing: "easeInOutQuart",
                strokeDashoffset: [anime.setDashoffset, 0],
            })
            .add({
                targets: "#logo #K",
                duration: 700,
                easing: "easeInOutQuart",
                opacity: 1,
            })
            .add({
                targets: "#logo",
                delay: 500,
                duration: 300,
                easing: "easeInOutQuart",
                opacity: 0,
                scale: 0.1,
            })
            .add({
                targets: ".loader",
                duration: 200,
                easing: "easeInOutQuart",
                opacity: 0,
                zIndex: -1,
            });
    }, [finishLoading]);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10);
        animate();
        return () => clearTimeout(timeout);
    }, [animate]);

    useEffect(() => {
        const body = document.querySelector("body")!;
        body.classList.add("hidden");
        return body.classList.remove("hidden");
    }, []);

    return (
        <StyledLoader className="loader" isMounted={isMounted}>
            <div className="logo-wrapper">
                <IconLoader />
            </div>
        </StyledLoader>
    );
};

export default Loader;
