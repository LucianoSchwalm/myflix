import styles from "../styles/HomeNoAuth.module.scss";
import { HeaderNoAuth } from "../components/homeNoAuth/headerNoAuth/headerNoAuth";
import { PresentationSection } from "../components/homeNoAuth/presentationSection/presentationSection";
import { CardSection } from "@/components/homeNoAuth/cardSection/cardSection";

const HomeNotAuth = () => {
  return (
    <>
      <main>
        <div className={styles.sectionBackground}>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <CardSection />
      </main>
    </>
  );
};

export default HomeNotAuth;
