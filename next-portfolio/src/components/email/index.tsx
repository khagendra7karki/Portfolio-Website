import { FC } from "react";
import { email } from "@/config";
import { Side } from "@/components";
import { StyledLinkWrapper } from "./email.style";

interface emailProps {
    isHome: boolean;
}

const Email: FC<emailProps> = ({ isHome }) => (
    <Side isHome={isHome} orientation="right">
        <StyledLinkWrapper>
            <a href={`mailto:${email}`}>{email}</a>
        </StyledLinkWrapper>
    </Side>
);

export default Email;
