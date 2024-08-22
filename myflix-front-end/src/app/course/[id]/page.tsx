"use client";
import { PageSpinner } from "@/components/common/Spinner/spinner";
import styles from "../../../styles/coursePage.module.scss";
import { HeaderAuth } from "@/components/common/HeaderAuth/headerAuth";
import { courseService, CourseType } from "@/services/courseService";
import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import { EpisodeList } from "@/components/EpisodeList/episodeList";
import { Footer } from "@/components/common/Footer/footer";

const CoursePage = ({ params }: { params: { id: string } }) => {
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const getCourse = async function () {
    if (typeof params.id !== "string") return;

    const res = await courseService.getEpisodes(params.id);
    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorited(res.data.favorited);
    }
  };

  useEffect(() => {
    getCourse();
  }, [params.id]);

  const handleLikeCourse = async () => {
    // console.log(params.id);
    if (liked) {
      // console.log("tira o like");
      await courseService.removeLike(params.id);
      setLiked(false);
    } else {
      // console.log("bota o like");
      // console.log(params.id);
      await courseService.like(params.id);
      setLiked(true);
    }
  };

  const handleFavCourse = async () => {
    if (favorited) {
      await courseService.removeFav(params.id);
      setFavorited(false);
    } else {
      await courseService.addToFav(params.id);
      setFavorited(true);
    }
  };

  if (course === undefined) return <PageSpinner />;

  return (
    <main>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),
	  url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "550px",
        }}
      >
        <HeaderAuth />
      </div>
      <Container className={styles.courseInfo}>
        <p className={styles.courseTitle}>{course?.name}</p>
        <p className={styles.courseDescription}>{course?.synopsis}</p>
        <Button
          outline
          className={styles.courseBtn}
          disabled={course?.episodes?.length === 0}
        >
          ASSISTIR AGORA!
          <img
            src="/buttonPlay.svg"
            alt="buttonImg"
            className={styles.buttonImg}
          />
        </Button>
        <div className={styles.interactions}>
          {liked ? (
            <img
              src="/course/iconLiked.svg"
              alt="likedImage"
              className={styles.interactionImages}
              onClick={handleLikeCourse}
            />
          ) : (
            <img
              src="/course/iconLike.svg"
              alt="likeImage"
              className={styles.interactionImages}
              onClick={handleLikeCourse}
            />
          )}
          {favorited ? (
            <img
              src="/course/iconFavorited.svg"
              alt="iconFavorited"
              className={styles.interactionImages}
              onClick={handleFavCourse}
            />
          ) : (
            <img
              src="/course/iconAddFav.svg"
              alt="iconAddFav"
              className={styles.interactionImages}
              onClick={handleFavCourse}
            />
          )}
        </div>
      </Container>
      <Container className={styles.episodeInfo}>
        <p className={styles.episodeDivision}>EPISÓDIOS</p>
        <p className={styles.episodeLength}>
          {course?.episodes?.length} episódios
        </p>
        {course?.episodes?.length === 0 ? (
          <p>
            <strong>
              Não temos episódios ainda, volte outra hora! &#x1F606;&#x1F918;
            </strong>
          </p>
        ) : (
          course?.episodes?.map((episode) => (
            <EpisodeList key={episode.id} episode={episode} />
          ))
        )}
      </Container>
      <Footer />
    </main>
  );
};

export default CoursePage;
