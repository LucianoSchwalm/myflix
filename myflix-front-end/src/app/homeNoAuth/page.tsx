import styles from "../../styles/HomeNoAuth.module.scss";
import { HeaderNoAuth } from "../../components/HomeNoAuth/headerNoAuth/headerNoAuth";
import { PresentationSection } from "../../components/HomeNoAuth/presentationSection/presentationSection";
import { CardSection } from "@/components/HomeNoAuth/cardSection/cardSection";
import { SlideSection } from "@/components/HomeNoAuth/slideSection/slideSection";
import { courseService } from "@/services/courseService";
import { Footer } from "@/components/common/Footer/footer";

const HomeNoAuth = async () => {
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
        <Footer />
      </main>
    </>
  );
};

export default HomeNoAuth;
