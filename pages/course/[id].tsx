import HeaderAuth from "@/src/components/common/headerAuth";
import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "@/src/services/courseService";
import { Button, Container } from "reactstrap";
import PageSpinner from "@/src/components/common/spinner";
import EpisodeList from "@/src/components/episodeList";
import Footer from "@/src/components/common/footer";

const CoursePage = function () {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const getCourse = async () => {
    if (typeof id !== "string") return;
    const res = await courseService.getEpisodes(id);
    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorited(res.data.favorited);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  const handleLikeCourse = async () => {
    if (typeof id !== "string") return;
    if (liked === true) {
      await courseService.unlike(id);
      setLiked(false);
    } else {
      await courseService.like(id);
      setLiked(true);
    }
  };
  const handleFavoriteCourse = async () => {
    if (typeof id !== "string") return;
    if (favorited === true) {
      await courseService.removeFav(id);
      setFavorited(false);
    } else {
      await courseService.addToFav(id);
      setFavorited(true);
    }
  };

  if (course === undefined) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>Onebitflix - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "450px",
          }}
        >
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course?.name}</p>
          <p className={styles.courseDescription}>{course?.synopsis}</p>
          <Button
            outline
            className={styles.courseBtn}
            disabled={course?.episodes?.length === 0 ? true : false}
          >
            Assistir Agora!
            <img
              src="/buttonPlay.svg"
              alt="buttonImg"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            {favorited === false ? (
              <img
                src="/course/iconLike.svg"
                alt="icon Like"
                className={styles.interactionImages}
                onClick={handleFavoriteCourse}
              />
            ) : (
              <img
                src="/course/iconLiked.svg"
                alt="icon Like"
                className={styles.interactionImages}
                onClick={handleFavoriteCourse}
              />
            )}
            {liked === false ? (
              <img
                src="/course/iconAddFav.svg"
                alt="icon Like"
                className={styles.interactionImages}
                onClick={handleLikeCourse}
              />
            ) : (
              <img
                src="/course/iconFavorited.svg"
                alt="icon Like"
                className={styles.interactionImages}
                onClick={handleLikeCourse}
              />
            )}
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>Episódios</p>
          <p className={styles.episodeLenght}>
            {course?.episodes?.length} Episódios
          </p>
          {course?.episodes?.length === 0 ? (
            <p>
              <strong>Não temos episódios ainda. &#x1F606;</strong>
            </p>
          ) : (
            course?.episodes?.map((episode) => (
              <EpisodeList key={episode.id} episode={episode} />
            ))
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default CoursePage;
