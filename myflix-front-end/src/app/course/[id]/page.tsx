import styles from "../../../styles/coursePage.module.scss";
import { HeaderAuth } from "@/components/common/HeaderAuth/headerAuth";
import { courseService, CourseType } from "@/services/courseService";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CoursePage = ({ params }: { params: { id: string } }) => {
  const [course, setCourse] = useState<CourseType>();

  const getCourse = async function () {
    if (typeof params.id !== "string") return;

    const res = await courseService.getEpisodes(params.id);

    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  useEffect(() => {
    getCourse();
  }, [params.id]);

  return (
    <main>
      <HeaderAuth />
      <p>{course?.name}</p>
    </main>
  );
};

export default CoursePage;
