import categoriesService from "@/src/services/categoriesService";
import styles from "../../../..//styles/slideCategory/slideCategory.module.scss";
import SlideComponent from "../../common/slideComponent";
import useSWR from "swr";

interface props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = ({ categoryId, categoryName }: props) => {
  const { data, error } = useSWR(`/categories/${categoryId}`, () => {
    categoriesService.getCourses(categoryId);
  });
  if (error) return error;
  if (!data)
    return (
      <>
        <p>Loading...</p>
      </>
    );
  return (
    <>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data.data.courses} />
    </>
  );
};

export default ListCategoriesSlide;
