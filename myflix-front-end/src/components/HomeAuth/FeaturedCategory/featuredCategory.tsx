import styles from "../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import { courseService } from "../../../services/courseService";
import SlideComponent from "@/components/common/SlideComponent/slideComponent";
import { PageSpinner } from "@/components/common/Spinner/spinner";

export const FeaturedCategory = () => {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategory}>EM DESTAQUE</p>
      <SlideComponent newestCourses={data.data} />
    </>
  );
};
