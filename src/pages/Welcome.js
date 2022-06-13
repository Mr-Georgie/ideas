import React from "react";
import HeroSection from "../components/HomeComp/HeroSection";
import About from "../components/HomeComp/About";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center mx-16 sm:mx-36 md:mx-10 lg:mx-40 xl:mx-64">
      <HeroSection />
      <About />
    </div>
  );
}
