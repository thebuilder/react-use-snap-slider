import React from "react";
import { Inter } from "next/font/google";
import { useSnapSlider } from "react-use-snap-slider";

const inter = Inter({ subsets: ["latin"] });

function Slide({ children }: { children: React.ReactNode }) {
  return <div className="flex-none basis-full snap-start p-4">{children}</div>;
}

function Slider({ children }: { children: React.ReactNode }) {
  const { ref, next, previous, activeIndex, totalSlides } = useSnapSlider();
  return (
    <div className="relative">
      <div
        ref={ref}
        className="w-full flex snap-x snap-mandatory overflow-x-scroll scrollbar-hide"
      >
        {children}
      </div>
      <div className="flex justify-between p-4">
        <button onClick={previous}>Previous</button>
        <div className="flex justify-center">
          {activeIndex + 1} / {totalSlides}
        </div>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className={`min-h-screen p-24 ${inter.className}`}>
      <h1 className="font-mono text-6xl font-bold text-center">
        react-use-snap-slider
      </h1>
      <div className="">
        <Slider>
          <Slide>Slide 1</Slide>
          <Slide>Slide 2</Slide>
          <Slide>Slide 3</Slide>
          <Slide>Slide 4</Slide>
          <Slide>Slide 5</Slide>
        </Slider>
      </div>
    </main>
  );
}
