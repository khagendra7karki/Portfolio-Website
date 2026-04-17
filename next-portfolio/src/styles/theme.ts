import mixins from "./mixins";
import { FlattenSimpleInterpolation } from "styled-components";

export type ThemeInterface = {
	bp: {
		mobileS: string;
		mobileM: string;
		mobileL: string;
		tabletS: string;
		tabletL: string;
		desktopXS: string;
		desktopS: string;
		desktopM: string;
		desktopL: string;
	};

	mixins: {
		flexCenter: FlattenSimpleInterpolation;
		flexBetween: FlattenSimpleInterpolation;
		link: FlattenSimpleInterpolation;
		inlineLink: FlattenSimpleInterpolation;
		button: FlattenSimpleInterpolation;
		smallButton: FlattenSimpleInterpolation;
		bigButton: FlattenSimpleInterpolation;
		boxShadow: FlattenSimpleInterpolation;
		fancyList: FlattenSimpleInterpolation;
		resetList: FlattenSimpleInterpolation;
	};
};

const theme = {
	bp: {
		mobileS: `max-width: 330px`,
		mobileM: `max-width: 400px`,
		mobileL: `max-width: 480px`,
		tabletS: `max-width: 600px`,
		tabletL: `max-width: 768px`,
		desktopXS: `max-width: 900px`,
		desktopS: `max-width: 1080px`,
		desktopM: `max-width: 1200px`,
		desktopL: `max-width: 1400px`,
	},

	mixins,
};

export default theme;
