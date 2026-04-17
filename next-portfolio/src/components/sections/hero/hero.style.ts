import styled from "styled-components";

export const StyledHeroSection = styled.section`
	${({ theme }) => theme.mixins.flexCenter};
	flex-direction: column;
	align-items: flex-start;
	min-height: calc(100vh - var(--nav-height));
	height: calc(100vh - var(--nav-height));
	/* min-height: 100vh;
	height: 100vh; */
	padding: 0;

	@media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
		height: auto;
		/* padding-top: var(--nav-height); */
	}

	h1 {
		margin: 0 0 30px 4px;
		color: var(--green);
		font-family: var(--font-mono);
		font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
		font-weight: 400;

		@media (max-width: 480px) {
			margin: 0 0 20px 2px;
		}
	}

	h3 {
		margin-top: 5px;
		color: var(--slate);
		line-height: 0.9;
	}

	p {
		margin: 20px 0 0;
		max-width: 540px;
		font-family: var(--font-sans);
	}

	.email-link {
		${({ theme }) => theme.mixins.bigButton};
		margin-top: 50px;
	}

	.description {
		margin-top: 30px;
	}
`;
