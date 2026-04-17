import styled from "styled-components";
import { Layout, Hero, About, Jobs, Featured, Contact } from "@/components";
import { NextPage } from "next";
import { jobs, getJobReturnType, featured, getFeaturedReturnType } from "@/lib";

const StyledMainContainer = styled.main`
	counter-reset: section;
`;

interface homeProps {
	allJobs: getJobReturnType[];
	allFeatured: getFeaturedReturnType[];
}

const Home: NextPage<homeProps> = ({ allJobs, allFeatured }) => {
	return (
		<Layout>
			<StyledMainContainer className="fillHeight">
				<Hero />
				<About />
				<Jobs jobsData={allJobs} />
				<Featured data={allFeatured} />
				<Contact />
			</StyledMainContainer>
		</Layout>
	);
};

export const getStaticProps = async () => {
	const allJobs = jobs();
	const allFeatured = featured();

	return {
		props: { allJobs, allFeatured },
	};
};

export default Home;
