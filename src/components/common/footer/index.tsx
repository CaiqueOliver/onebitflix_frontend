import { Container } from "reactstrap";
import styles from "./styles.module.scss";

const Footer = () => {
	return (
		<>
			<Container className={styles.footer}>
				<img
					src="/logoOnebitcode.svg"
					alt="logoFooter"
					className={styles.footerLogo}
				/>
				<a
					href="http://onebitcode.com"
					target={"_blank"}
					className={styles.footerLink}
				>
					ONEBITFLIX
				</a>
			</Container>
		</>
	);
};

export default Footer;
