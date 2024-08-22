import { useSearchParams, useRouter } from "next/navigation";
import styles from "../../../styles/episodePlayer.module.scss";
import { HeaderGeneric } from "@/components/common/HeaderGeneric/headerGeneric";
import React, { useEffect, useRef, useState } from "react";
import { courseService, CourseType } from "@/services/courseService";
import { PageSpinner } from "@/components/common/Spinner/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";
import watchEpisodeService from "@/services/episodeService";

const EpisodePlayer = ({ params }: { params: { id: string } }) => {
  const [course, setCourse] = useState<CourseType>();
  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [episodeTime, setEpisodeTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const searchParams = useSearchParams();
  const episodeOrder = params.id;
  const episodeId = searchParams.get("episodeId");
  const courseId = searchParams.get("courseId");
  const router = useRouter();

  const playerRef = useRef<ReactPlayer>(null);

  const handleGetEpisodeTime = async () => {
    if (typeof episodeId !== "string") return;

    const res = await watchEpisodeService.getWatchTime(parseInt(episodeId)!);

    if (res.data !== null) {
      setGetEpisodeTime(res.data.seconds);
    }
  };

  const handleSetEpisodeTime = async () => {
    if (typeof episodeId !== "string") return;

    await watchEpisodeService.setWatchTime({
      episodeId: parseInt(episodeId),
      seconds: Math.round(episodeTime),
    });
  };

  useEffect(() => {
    handleGetEpisodeTime();
  }, [router]);

  const handlePlayerTime = () => {
    playerRef.current?.seekTo(getEpisodeTime);
    setIsReady(true);
  };

  if (isReady === true) {
    setTimeout(() => {
      handleSetEpisodeTime();
    }, 1000 * 3);
  }

  const getCourse = async function () {
    if (typeof courseId !== "string") return;

    const res = await courseService.getEpisodes(courseId);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handleLastEpisode = () => {
    if (typeof episodeId !== "string") return;
    router.push(
      `/course/episode${parseInt(episodeOrder) - 1}?courseId=${
        course?.id
      }&episodeId=${parseInt(episodeId) - 1}`
    );
  };

  const handleNextEpisode = () => {
    if (typeof episodeId !== "string") return;
    router.push(
      `/course/episode${parseInt(episodeOrder) + 1}?courseId=${
        course?.id
      }&episodeId=${parseInt(episodeId) + 1}`
    );
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (course?.episodes === undefined) return <PageSpinner />;

  if (parseInt(episodeOrder + 1) < course?.episodes?.length) {
    if (
      Math.round(episodeTime) ===
      course?.episodes[parseInt(episodeOrder)].secondsLong
    ) {
      handleNextEpisode();
    }
  }

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
              ref={playerRef}
              onStart={handlePlayerTime}
              onProgress={(progress) => {
                setEpisodeTime(progress.playedSeconds);
              }}
            />
          )}
          <div className={styles.episodeButtonDiv}>
            <Button
              className={styles.episodeButton}
              disabled={parseInt(episodeOrder) === 0}
            >
              <img
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
              <img
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
