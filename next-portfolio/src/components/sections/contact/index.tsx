import React, { useEffect, useRef } from "react";
import { StyledContactSection } from "./contact.style";
import { srConfig, email } from "@/config";
import { usePrefersReducedMotion } from "@/hooks";

const Contact = () => {
	const revealContainer = useRef(null);
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		if (prefersReducedMotion) {
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

	return (
		<StyledContactSection id="contact" ref={revealContainer}>
			<h2 className="numbered-heading overline">What’s Next?</h2>

			<h2 className="title">Get In Touch</h2>

			<p>
				Looking for a Software engineer? have any questions or just want
				to say hi, feel free to reach out. I look forward to hearing
				from you.
			</p>

			<a className="email-link" href={`mailto:${email}`}>
				Say Hello
			</a>
		</StyledContactSection>
	);
};

export default Contact;
