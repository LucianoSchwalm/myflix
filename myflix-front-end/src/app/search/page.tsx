"use client";
import styles from "../styles/search.module.scss";
import { HeaderAuth } from "../../components/common/HeaderAuth/headerAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { courseService, CourseType } from "@/services/courseService";

const Search = function () {
  const searchParams = useSearchParams();
  const searchName = searchParams.get("name");
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);

  const searchCourses = async function () {
    if (typeof searchName === "string") {
      const res = await courseService.getSearch(searchName);
      setSearchResult(res.data.courses);
    }
  };

  useEffect(() => {
    searchCourses();
  }, [searchName]);

  return (
    <main>
      <HeaderAuth />
      {searchResult?.map((course) => (
        <div key={course.id}>
          <p>{course.name}</p>
        </div>
      ))}
    </main>
  );
};

export default Search;
