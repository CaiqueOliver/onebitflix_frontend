import courseService from "@/src/services/courseService";
import useSWR from "swr";
import styles from "../../../..//styles/slideCategory/slideCategory.module.scss";
import SlideComponent from "../../common/slideComponent";

const FeaturedCategory = () => {
  const { data, error } = useSWR("/favorites", courseService.getFeaturedCourse);
  if (error) return error;
  if (!data)
    return (
      <>
        <p>Loading...</p>
      </>
    );
  return (
    <>
      <p className={styles.category}>Em destaque</p>
      <SlideComponent course={data.data} />
    </>
  );
};

export default FeaturedCategory;
