"use client";
import styles from "./styles.module.scss";
import { Button, Container } from "reactstrap";
import SlideComponent from "@/components/common/slideComponent/slideComponent";
import Link from "next/link";
import { CourseType } from "@/services/courseService";

interface props {
  course: CourseType[];
}

export const SlideSection = ({ course }: props) => {
  return (
    <>
      <Container className="py-5">
        <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
        <SlideComponent newestCourses={course} />
        <Link href="/register">
          <Button className={styles.slideSectionBtn} outline color="light">
            Se cadastre para acessar!
          </Button>
        </Link>
      </Container>
    </>
  );
};
