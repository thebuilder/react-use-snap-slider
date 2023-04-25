import React from "react";
import { Inter } from "next/font/google";
import { useSnapSlider } from "react-use-snap-slider";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import clsx from "clsx";
const inter = Inter({ subsets: ["latin"] });

function Slide({ children, ...rest }: { children: React.ReactNode }) {
  return (
    <div
      {...rest}
      className="flex-none basis-full snap-start p-4 h-48 bg-blue-600"
    >
      {children}
    </div>
  );
}

function Slider({ children }: { children: React.ReactNode }) {
  const { ref, next, previous, snapTo, activeIndex, totalSlides } =
    useSnapSlider();
  const dots = Array.from({ length: totalSlides });

  return (
    <div className="relative">
      <div
        ref={ref}
        className="w-full gap-x-4 flex snap-x snap-mandatory overflow-x-scroll scrollbar-hide"
      >
        {children}
      </div>
      <div className="flex justify-between items-center py-4">
        <button
          onClick={previous}
          aria-label="Previous slide"
          className="hover:bg-purple-800 focus:bg-purple-800 rounded-full p-2"
        >
          <ChevronLeft />
        </button>
        <div className="flex justify-center gap-x-2">
          {/*{activeIndex + 1} / {totalSlides}*/}
          {dots.map((_, index) => (
            <button
              key={index}
              className={clsx(
                " w-4 h-4 rounded-full hover:bg-purple-200 focus:bg-purple-200",
                activeIndex === index ? "bg-white" : 'bg-white/40'
              )}
              onClick={() => snapTo(index)}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next slide"
          className="hover:bg-purple-800 focus:bg-purple-800 rounded-full p-2"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className={`min-h-screen p-24 ${inter.className}`}>
      <h1 className="font-mono text-6xl font-bold text-center mb-8">
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
