import Head from "next/head";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import styles from "../styles/HomeNoAuth.module.scss";
import PresentationSection from "@/src/components/homeNoAuth/presetationSection";
import CardsSection from "@/src/components/homeNoAuth/cardNoAuth";
import SlideSection from "@/src/components/homeNoAuth/slideSection";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "@/src/services/courseService";
import { ReactNode, useEffect } from "react";
import Footer from "@/src/components/common/footer";
import AOS from "aos";
import "aos/dist/aos.css";

interface IndexPageProps {
	children?: ReactNode;
	course: CourseType[];
}

const HomeNoAuth = ({ course }: IndexPageProps) => {
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<>
			<Head>
				<title>OneBitFlix</title>
				<link
					rel="shortcut icon"
					href="/favicon.svg"
					type="image/x-icon"
				/>
				<meta property="og:tittle" content="Onebitflix" key="tittle" />
				<meta
					name="description"
					content="Tenha acesso aos melhores conteúdos de programação."
				/>
			</Head>
			<main>
				<HeaderNoAuth />
				<div
					className={styles.sectionBackground}
					data-aos="fade-right"
					data-aos-duration="1600"
				>
					<PresentationSection />
				</div>
				<div data-aos="fade-left" data-aos-duration="1200">
					<CardsSection />
				</div>
				<div data-aos="fade-up" data-aos-duration="1200">
					<SlideSection newestCourses={course} />
				</div>
				<Footer />{" "}
			</main>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const res = await courseService.getNewestCourse();
	return {
		props: {
			course: res.data,
		},
		revalidate: 3600 * 24,
	};
};
export default HomeNoAuth;
