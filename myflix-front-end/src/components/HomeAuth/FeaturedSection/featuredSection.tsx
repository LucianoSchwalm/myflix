import styles from "./styles.module.scss";
import useSWR from "swr";
import { courseService, CourseType } from "@/services/courseService";
import { HeaderAuth } from "@/components/common/HeaderAuth/headerAuth";
import { Button, Container } from "reactstrap";
import Link from "next/link";
import { PageSpinner } from "@/components/common/Spinner/spinner";

export const FeaturedSection = () => {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <HeaderAuth />
      {
        data.data?.map((course: CourseType) => (
          // eslint-disable-next-line react/jsx-key
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "480px",
            }}
          >
            <Container className="pt-4">
              <p className={styles.title}>{course.name}</p>
              <p className={styles.description}>{course.synopsis}</p>
              <Link href={`/courses/${course.id}`} className={styles.link}>
                <Button outline color="light" className={styles.button}>
                  ACESSE AGORA!
                  <img
                    src="/buttonPlay.svg"
                    alt="buttonImg"
                    className={styles.buttonImg}
                  />
                </Button>
              </Link>
            </Container>
          </div>
        ))[0]
      }
    </>
  );
};
