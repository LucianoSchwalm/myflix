import styles from "../styles/HomeNoAuth.module.scss";
import { HeaderNoAuth } from "../components/homeNoAuth/headerNoAuth/headerNoAuth";
import { PresentationSection } from "../components/homeNoAuth/presentationSection/presentationSection";

const HomeNotAuth = () => {
  return (
    <>
      <main>
        <div className={styles.sectionBackground}>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
      </main>
    </>
  );
};

export default HomeNotAuth;
