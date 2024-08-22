"use client";

import { FeaturedSection } from "@/components/HomeAuth/FeaturedSection/featuredSection";
import { NewestCategory } from "@/components/HomeAuth/NewestCategory/newestCategory";
import { FavoriteCategory } from "@/components/HomeAuth/FavoriteCategory/favoriteCategory";
import { FeaturedCategory } from "@/components/HomeAuth/FeaturedCategory/featuredCategory";
import { ListCategory } from "@/components/HomeAuth/ListCategory/listCategory";
import { Footer } from "@/components/common/Footer/footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageSpinner } from "@/components/common/Spinner/spinner";

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("myflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <PageSpinner />;

  return (
    <>
      <main>
        <FeaturedSection />
        <NewestCategory />
        <FavoriteCategory />
        <FeaturedCategory />
        <ListCategory />
        <Footer />
      </main>
    </>
  );
};

export default Home;
