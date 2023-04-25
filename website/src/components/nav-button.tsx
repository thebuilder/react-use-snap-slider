import { ChevronLeft, ChevronRight } from "@/components/icons";
import React from "react";

type Props = {
  onClick: () => void;
  direction: "previous" | "next";
};

export const NavButton = ({ onClick, direction }: Props) => {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "previous" ? "Previous slide" : "Next slide"}
      className="hover:bg-purple-800 focus:bg-purple-800 rounded-full p-2"
    >
      {direction === "previous" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
};
