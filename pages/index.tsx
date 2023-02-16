import Head from "next/head";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import styles from "../styles/HomeNoAuth.module.scss";
import PresentationSection from "@/src/components/homeNoAuth/presetationSection";
import CardsSection from "@/src/components/homeNoAuth/cardNoAuth";

const HomeNoAuth = () => {
  return (
    <>
      <Head>
        <title>OneBitFlix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:tittle" content="Onebitflix" key="tittle" />
        <meta
          name="description"
          content="Tenha acesso aos melhores conteúdos de programação."
        />
      </Head>
      <main>
        <div className={styles.sectionBackground}>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <CardsSection />
      </main>
    </>
  );
};

export default HomeNoAuth;
