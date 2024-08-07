import styles from "../styles/HomeNoAuth.module.scss";
import { HeaderNoAuth } from "../components/homeNoAuth/headerNoAuth/headerNoAuth";
import { PresentationSection } from "../components/homeNoAuth/presentationSection/presentationSection";
import { CardSection } from "@/components/homeNoAuth/cardSection/cardSection";
import { SlideSection } from "@/components/homeNoAuth/slideSection/slideSection";
import { courseService } from "@/services/courseService";

const HomeNotAuth = async () => {
  const res = await courseService.getNewestCourses();
  const course = res.data;
  return (
    <>
      <main>
        <div className={styles.sectionBackground}>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <CardSection />
        <SlideSection course={course} />
      </main>
    </>
  );
};

export default HomeNotAuth;
