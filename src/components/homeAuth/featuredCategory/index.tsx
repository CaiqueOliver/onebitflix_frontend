import courseService from "@/src/services/courseService";
import useSWR from "swr";
import styles from "../../../..//styles/slideCategory.module.scss";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";

const FeaturedCategory = () => {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourse);
  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }
  return (
    <>
      <p className={styles.titleCategory}>Em destaque</p>
      <SlideComponent course={data.data} />
    </>
  );
};

export default FeaturedCategory;
