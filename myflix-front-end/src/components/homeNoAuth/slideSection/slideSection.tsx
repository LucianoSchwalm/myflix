import { CourseType } from "@/services/courseService";
import styles from "./styles.module.scss";
import { Button, Container } from "reactstrap";
import SlideComponent from "@/components/common/slideComponent/slideComponent";
import Link from "next/link";

export const SlideSection = () => {
  return (
    <>
      <Container>
        <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
        <SlideComponent />
        <Link href="/register">
          <Button className={styles.slideSectionBtn} outline color="light">
            Se cadastre para acessar!
          </Button>
        </Link>
      </Container>
    </>
  );
};
