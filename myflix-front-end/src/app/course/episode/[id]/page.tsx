import { useSearchParams, useRouter } from "next/navigation";
import styles from "../../../styles/episodePlayer.module.scss";
import { HeaderGeneric } from "@/components/common/HeaderGeneric/headerGeneric";
import { useEffect, useState } from "react";
import { courseService, CourseType } from "@/services/courseService";
import { PageSpinner } from "@/components/common/Spinner/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";
import Image from "next/image";

const EpisodePlayer = ({ params }: { params: { id: string } }) => {
  const [course, setCourse] = useState<CourseType>();
  const searchParams = useSearchParams();
  const episodeOrder = params.id;
  const courseId = searchParams.get("courseId");
  const router = useRouter();

  const getCourse = async function () {
    if (typeof courseId !== "string") return;

    const res = await courseService.getEpisodes(courseId);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handleLastEpisode = () => {
    router.push(
      `/course/episode${parseInt(episodeOrder) - 1}?courseId=${course?.id}`
    );
  };

  const handleNextEpisode = () => {
    router.push(
      `/course/episode${parseInt(episodeOrder) + 1}?courseId=${course?.id}`
    );
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (course?.episodes === undefined) return <PageSpinner />;

  return (
    <>
      <main>
        <HeaderGeneric
          logoUrl="/home"
          btnContent={`Voltar para o curso`}
          btnUrl={`/course/${courseId}`}
        />
        <Container className="d-flex flex-column align-items-center gap-3 pt-3">
          <p className={styles.episodeTitle}>
            {course.episodes[parseInt(episodeOrder)].name}
          </p>
          {typeof window == "undefined" ? null : (
            <ReactPlayer
              className={styles.player}
              url={`${
                process.env.NEXT_PUBLIC_BASEURL
              }/episodes/stream?videoUrl=${
                course.episodes[parseInt(episodeOrder)].videoUrl
              }&token=${sessionStorage.getItem("myflix-token")}`}
              controls
            />
          )}
          <div className={styles.episodeButtonDiv}>
            <Button
              className={styles.episodeButton}
              disabled={parseInt(episodeOrder) === 0}
            >
              <Image
                src="/episode/iconArrowLeft.svg"
                alt="setaEsquerda"
                className={styles.arrowImg}
                onClick={handleLastEpisode}
              />
            </Button>
            <Button
              className={styles.episodeButton}
              disabled={parseInt(episodeOrder) + 1 === course?.episodes?.length}
            >
              <Image
                src="/episode/iconArrowRight.svg"
                alt="setaDireita"
                className={styles.arrowImg}
                onClick={handleNextEpisode}
              />
            </Button>
          </div>
          <p className="text-center pb-4">
            {course.episodes[parseInt(episodeOrder)].synopsis}
          </p>
        </Container>
      </main>
    </>
  );
};

export default EpisodePlayer;
