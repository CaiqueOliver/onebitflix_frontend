import categoriesService from "@/src/services/categoriesService";
import styles from "../../../../styles/slideCategory.module.scss";
import SlideComponent from "../../common/slideComponent";
import useSWR from "swr";
import PageSpinner from "../../common/spinner";

interface props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = ({ categoryId, categoryName }: props) => {
  const { data, error } = useSWR(`/categoriesCourses/${categoryId}`, () => {
    categoriesService.getCourses(categoryId);
  });
  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }
  return (
    <>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data} />
    </>
  );
};

export default ListCategoriesSlide;
