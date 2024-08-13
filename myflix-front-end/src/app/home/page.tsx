"use client";

import { FeaturedSection } from "@/components/HomeAuth/FeaturedSection/featuredSection";
import { NewestCategory } from "@/components/HomeAuth/NewestCategory/newestCategory";
import { FavoriteCategory } from "@/components/HomeAuth/FavoriteCategory/favoriteCategory";

const Home = () => {
  return (
    <>
      <main>
        <FeaturedSection />
        <NewestCategory />
        <FavoriteCategory />
      </main>
    </>
  );
};

export default Home;
