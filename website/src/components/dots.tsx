import clsx from "clsx";
import React from "react";

type Props = {
  totalSlides: number;
  activeIndex: number;
  snapTo: (index: number) => void;
};

export const Dots = ({ totalSlides = 0, activeIndex = 0, snapTo }: Props) => {
  const dots = Array.from({ length: totalSlides });

  return (
    <div className="flex justify-center gap-x-2">
      {dots.map((_, index) => (
        <button
          key={index}
          className={clsx(
            " w-4 h-4 rounded-full hover:bg-purple-200 focus:bg-purple-200",
            activeIndex === index ? "bg-white" : "bg-white/40"
          )}
          onClick={snapTo ? () => snapTo(index) : undefined}
        />
      ))}
    </div>
  );
};
