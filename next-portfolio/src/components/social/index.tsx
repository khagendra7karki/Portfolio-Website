import React, { FC } from "react";
import { socialMedia } from "@/config";
import { Side } from "@/components";
import { Icon } from "@/components/icons";
import { StyledSocialList } from "./social.style";

interface socialProps {
	isHome: boolean;
}

const Social: FC<socialProps> = ({ isHome }) => (
	<Side isHome={isHome} orientation="left">
		<StyledSocialList>
			{socialMedia &&
				socialMedia.map(({ url, name }, i) => (
					<li key={i}>
						<a
							href={url}
							aria-label={name}
							target="_blank"
							rel="noreferrer"
						>
							<Icon name={name} />
						</a>
					</li>
				))}
		</StyledSocialList>
	</Side>
);

export default Social;
