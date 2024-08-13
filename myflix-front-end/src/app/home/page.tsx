"use client";

import { FeaturedSection } from "@/components/HomeAuth/FeaturedSection/featuredSection";
import { NewestCategory } from "@/components/HomeAuth/NewestCategory/newestCategory";
import { FavoriteCategory } from "@/components/HomeAuth/FavoriteCategory/favoriteCategory";
import { FeaturedCategory } from "@/components/HomeAuth/FeaturedCategory/featuredCategory";
import { ListCategory } from "@/components/HomeAuth/ListCategory/listCategory";
import { Footer } from "@/components/common/Footer/footer";

const Home = () => {
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
