import courseService from "@/src/services/courseService";
import useSWR from "swr";
import styles from "../../../..//styles/slideCategory.module.scss";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";

const FavoriteCategory = () => {
  const { data, error } = useSWR("/favorites", courseService.getFavCourses);
  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }
  return (
    <>
      <p className={styles.titleCategory}>Minha Lista</p>
      {data.data.courses.length >= 1 ? (
        <SlideComponent course={data.data.courses} />
      ) : (
        <p className="text-center pt-3 h5">
          <strong>Você não possui cursos na lista de favoritos.</strong>{" "}
        </p>
      )}
    </>
  );
};

export default FavoriteCategory;
