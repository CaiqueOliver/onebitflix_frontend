import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button, Container } from "reactstrap";

import HeaderAuth from "@/src/components/common/headerAuth";
import Footer from "@/src/components/common/footer";
import PageSpinner from "@/src/components/common/spinner";
import EpisodeList from "@/src/components/episodeList";
import courseService, { CourseType } from "@/src/services/courseService";
import styles from "../../styles/coursePage.module.scss";

const CoursePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<CourseType | undefined>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getCourse = async () => {
      if (typeof id !== "string") return;
      const res = await courseService.getEpisodes(id);
      if (res.status === 200) {
        setCourse(res.data);
        setLiked(res.data.liked);
        setFavorited(res.data.favorited);
      }
    };

    getCourse();
  }, [id]);

  const handleLikeCourse = async () => {
    if (typeof id !== "string") return;
    if (liked) {
      await courseService.unlike(id);
      setLiked(false);
    } else {
      await courseService.like(id);
      setLiked(true);
    }
  };

  const handleFavoriteCourse = async () => {
    if (typeof id !== "string") return;
    if (favorited) {
      await courseService.removeFav(id);
      setFavorited(false);
    } else {
      await courseService.addToFav(id);
      setFavorited(true);
    }
  };

  if (loading) {
    return <PageSpinner />;
  }

  if (!course) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>Onebitflix - {course.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "450px",
          }}
        >
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course.name}</p>
          <p className={styles.courseDescription}>{course.synopsis}</p>
          <Button
            outline
            className={styles.courseBtn}
            disabled={course.episodes.length === 0}
          >
            Assistir Agora!
            <img
              src="/buttonPlay.svg"
              alt="buttonImg"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            <img
              src={favorited ? "/course/iconLiked.svg" : "/course/iconLike.svg"}
              alt="icon Like"
              className={styles.interactionImages}
              onClick={handleFavoriteCourse}
            />
            <img
              src={liked ? "/course/iconFavorited.svg" : "/course/iconAddFav.svg"}
              alt="icon Like"
              className={styles.interactionImages}
              onClick={handleLikeCourse}
            />
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>Episódios</p>
          <p className={styles.episodeLenght}>{course.episodes.length} Episódios</p>
          {course.episodes.length === 0 ? (
            <p>
              <strong>Não temos episódios ainda. &#x1F606;</strong>
            </p>
          ) : (
            course.episodes.map((episode) => (
              <EpisodeList key={episode.id} episode={episode} course={course} />
            ))
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default CoursePage;
