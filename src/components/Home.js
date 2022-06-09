import React from "react";
import HeroSection from "./HomeComp/HeroSection";
import CoreFeatures from "./HomeComp/CoreFeatures";

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-16 sm:mx-36 md:mx-10 lg:mx-40 xl:mx-64">
      <HeroSection />
      <CoreFeatures />
    </div>
  );
}
