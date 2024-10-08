import useSWR from "swr";
import { categoryService } from "../../../services/categoryService";
import styles from "../../../styles/slideCategory.module.scss";
import SlideComponent from "@/components/common/SlideComponent/slideComponent";
import { PageSpinner } from "@/components/common/Spinner/spinner";

interface props {
  categoryId: number;
  categoryName: string;
}

export const ListCategorySlide = ({ categoryId, categoryName }: props) => {
  const { data, error } = useSWR(`/categories/${categoryId}`, () =>
    categoryService.getCourses(categoryId)
  );

  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <p key={categoryId} className={styles.titleCategory}>
        {categoryName}
      </p>
      <SlideComponent newestCourses={data.data?.courses} />
    </>
  );
};
