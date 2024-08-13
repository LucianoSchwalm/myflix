import useSWR from "swr";
import styles from "../../../styles/slideCategory.module.scss";
import { courseService } from "@/services/courseService";
import SlideComponent from "@/components/common/SlideComponent/slideComponent";

export const FavoriteCategory = () => {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses);

  if (error) return error;
  if (!data)
    return (
      <>
        <p>Loading...</p>
      </>
    );
  return (
    <>
      <p className={styles.titleCategory}>MINHA LISTA</p>
      {data.data?.courses?.length >= 1 ? (
        <SlideComponent newestCourses={data.data?.courses} />
      ) : (
        <p className="h5 text-center pt-3">
          <strong>Você não tem nenhum curso na lista</strong>
        </p>
      )}
    </>
  );
};
