import React from "react";
import { Inter } from "next/font/google";
import { useSnapSlider } from "react-use-snap-slider";
import { Dots } from "@/components/dots";
import { NavButton } from "@/components/nav-button";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });
const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-gray-500",
];

function Slide({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={twMerge(
        "flex-none basis-full snap-start p-4 h-48 bg-blue-600",
        className
      )}
      {...rest}
    >
      <div className="text-xl select-none grid place-content-center place-items-center h-full">
        {children}
      </div>
    </div>
  );
}

function Slider({ children }: { children: React.ReactNode }) {
  const { ref, next, previous, snapTo, activeIndex, totalSlides } =
    useSnapSlider();

  return (
    <div className="relative">
      <div
        ref={ref}
        className="w-full gap-x-4 flex snap-x snap-mandatory overflow-x-scroll scrollbar-hide"
      >
        {children}
      </div>
      <div className="flex justify-between items-center py-4">
        <NavButton direction="previous" onClick={previous} />
        <Dots
          activeIndex={activeIndex}
          totalSlides={totalSlides}
          snapTo={snapTo}
        />
        <NavButton direction="next" onClick={next} />
      </div>
    </div>
  );
}

export default function Home() {
  const [slides, setSlides] = React.useState(4);

  return (
    <main className={`min-h-screen p-24 ${inter.className}`}>
      <h1 className="font-mono text-6xl font-bold text-center mb-8">
        react-use-snap-slider
      </h1>
      {!slides ? <p className="text-lg">No slides to show 😱</p> : null}
      <Slider>
        {Array.from({ length: slides }).map((_, index) => (
          <Slide key={index} className={colors[index % colors.length]}>
            Slide {index + 1}
          </Slide>
        ))}
      </Slider>
      <div className="flex gap-x-4">
        <button
          onClick={() =>
            setSlides((current) => (current > 0 ? current - 1 : 0))
          }
        >
          Remove slide
        </button>
        <button onClick={() => setSlides((current) => current + 1)}>
          Add slide
        </button>
      </div>
    </main>
  );
}
