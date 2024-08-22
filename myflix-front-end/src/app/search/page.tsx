"use client";
import styles from "../../styles/search.module.scss";
import { HeaderAuth } from "../../components/common/HeaderAuth/headerAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { courseService, CourseType } from "@/services/courseService";
import { Container } from "reactstrap";
import { SearchCard } from "@/components/SearchCard/searchCard";
import { Footer } from "@/components/common/Footer/footer";
import { PageSpinner } from "@/components/common/Spinner/spinner";

const Search = function () {
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);
  const searchParams = useSearchParams();
  const searchName = searchParams.get("name");
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("myflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <PageSpinner />;

  const searchCourses = async () => {
    if (typeof searchName === "string") {
      const res = await courseService.getSearch(searchName);
      setSearchResult(res.data.courses);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    searchCourses();
  }, [searchName]);

  return (
    <main className={styles.main}>
      <div className={styles.headerFooterBg}>
        <HeaderAuth />
      </div>
      {searchResult.length >= 1 ? (
        <div className={styles.searchContainer}>
          <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
            {searchResult?.map((course) => (
              <SearchCard key={course.id} course={course} />
            ))}
          </Container>
        </div>
      ) : (
        <div className={styles.searchContainer}>
          <p className={styles.noSearchText}>Nenhum resultado encontrado</p>
        </div>
      )}
      <div className={styles.headerFooterBg}>
        <Footer />
      </div>
    </main>
  );
};

export default Search;
