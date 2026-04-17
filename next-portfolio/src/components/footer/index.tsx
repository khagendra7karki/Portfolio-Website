import { Icon } from "@/components/icons";
import { socialMedia } from "@/config";
import { StyledCredit, StyledFooter, StyledSocialLinks } from "./footer.style";

const Footer = () => {
    return (
        <StyledFooter>
            <StyledSocialLinks>
                <ul>
                    {socialMedia &&
                        socialMedia.map(({ name, url }, i) => (
                            <li key={i}>
                                <a href={url} aria-label={name}>
                                    <Icon name={name} />
                                </a>
                            </li>
                        ))}
                </ul>
            </StyledSocialLinks>

            <StyledCredit tabIndex={-1}>
                <a href="https://brittanychiang.com/">
                    <div>Inspired by the work of Brittany Chiang</div>
                </a>
            </StyledCredit>
        </StyledFooter>
    );
};

export default Footer;
