import HeaderAuth from "@/src/components/common/headerAuth";
import FeaturedSection from "@/src/components/homeAuth/featuredSession";
import Head from "next/head";
import { Container } from "reactstrap";

const HomeAuth = () => {
  return (
    <>
      <Head>
        <title>Onebitflix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <FeaturedSection />
      </main>
    </>
  );
};

export default HomeAuth;
