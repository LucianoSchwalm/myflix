"use client";

import { CourseType } from "@/services/courseService";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from "../SlideCard/slideCard";

interface props {
  newestCourses: CourseType[];
}

export function SlideComponent({ newestCourses }: props) {
  let slideCount = 0;

  if (newestCourses.length > 4) {
    slideCount = 4;
  }
  if (newestCourses.length <= 4) {
    slideCount = newestCourses.length;
  }

  return (
    <>
      <div className="py-4 d-flex flex-column align-items-center">
        <Splide
          options={{
            type: "loop",
            perPage: slideCount,
            perMove: 1,
            width: slideCount * 300,
            breakpoints: {
              1200: {
                perPage: slideCount >= 2 ? 2 : 1,
                width: slideCount >= 2 ? 600 : 300,
                arrows: newestCourses.length > 2 ? true : false,
                drag: newestCourses.length > 2 ? true : false,
              },
              600: {
                perPage: 1,
                width: 300,
                arrows: newestCourses.length > 1 ? true : false,
                drag: newestCourses.length > 1 ? true : false,
              },
              300: {
                width: 250,
              },
            },
            pagination: false,
            arrows: newestCourses.length > 4 ? true : false,
            drag: newestCourses.length > 4 ? true : false,
          }}
        >
          {newestCourses?.map((course: CourseType) => (
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
