"use client";

import { FeaturedSection } from "@/components/HomeAuth/FeaturedSection/featuredSection";
import { NewestCategory } from "@/components/HomeAuth/NewestCategory/newestCategory";

const Home = () => {
  return (
    <>
      <main>
        <FeaturedSection />
        <NewestCategory />
      </main>
    </>
  );
};

export default Home;
