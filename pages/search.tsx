import styles from "../styles/search.module.scss";
import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "@/src/services/courseService";
import { Container } from "reactstrap";
import SearchCard from "@/src/components/searchCard";
import Footer from "@/src/components/common/footer";

const Search = () => {
  const router = useRouter();
  const searchName = router.query.name as string;
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);

  const searchCourses = async () => {
    try {
      if (searchName) {
        const res = await courseService.getSearch(searchName);
        setSearchResult(res.data.courses);
        console.log(searchResult);
      }
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

  useEffect(() => {
    searchCourses();
  }, [searchName]);

  return (
    <>
      <Head>
        <title>Onebitflix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
        <HeaderAuth />
        </div>
        <section  className={styles.mainContent}>
        {searchResult.length >= 1 ? (
          <div className={styles.searchContainer}>
          <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
            {searchResult?.map((course) => (
              <SearchCard key={course.id} course={course} />
            ))}
          </Container>
          </div>
        ): (
          <div className={styles.searchContainer}>
            <p className={styles.noSearchText}>Nenhum resultado encontrado</p>
          </div>
        )}
        </section>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Search;
