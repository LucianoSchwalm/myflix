"use client";

import { courseService, CourseType } from "@/services/courseService";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from "../slideCard/slideCard";

export async function SlideComponent() {
  const res = await courseService.getNewestCourses();
  const course = res.data;

  return (
    <>
      <div>
        <Splide
          options={{
            type: "loop",
            perPage: 4,
            perMove: 1,
            pagination: false,
          }}
        >
          {course?.map((course: CourseType) => (
            <SplideSlide key={course.id}>
              <SlideCard course={course} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
}

export default SlideComponent;
