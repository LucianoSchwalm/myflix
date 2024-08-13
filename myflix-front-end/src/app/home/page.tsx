"use client";

import { FeaturedSection } from "@/components/HomeAuth/FeaturedSection/featuredSection";
import { NewestCategory } from "@/components/HomeAuth/NewestCategory/newestCategory";
import { FavoriteCategory } from "@/components/HomeAuth/FavoriteCategory/favoriteCategory";
import { FeaturedCategory } from "@/components/HomeAuth/FeaturedCategory/featuredCategory";

const Home = () => {
  return (
    <>
      <main>
        <FeaturedSection />
        <NewestCategory />
        <FavoriteCategory />
        <FeaturedCategory />
      </main>
    </>
  );
};

export default Home;
