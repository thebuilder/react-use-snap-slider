import { useCallback, useEffect, useRef, useState } from "react";
import { observe } from "react-intersection-observer";

type SnapOptions = {
  /** Disable the snap slider */
  disabled?: boolean;
  /** The IntersectionObserver threshold to use for determining if a slide is visible.
   * Number between 0 and 1 */
  threshold?: number;
  /** A CSS selector to use to find the slides inside the root element. If not defined, all children will be used. */
  selector?: string;
  /** Whether to loop the slider when clicking next, previous at the edges.
   * If `false`, the `next()` and `previous()` functions will do nothing in those cases. */
  loop?: boolean;
};

type SnapResult = {
  /** The index of the active slide */
  activeIndex: number;
  /** The total number of slides */
  totalSlides: number;
  /** A function that allows you to snap to a specific slide */
  snapTo: (index: number) => void;
  /** A function that allows you to snap to the next slide */
  next: () => void;
  /** A function that allows you to snap to the previous slide */
  previous: () => void;
  /** A ref that you should attach to the root element */
  ref: (element: HTMLElement | null) => void;
};

/***
 * A hook that allows you to control a CSS `scroll-snap` slider.
 *
 * It doesn't monitor when slides change, so if you add or remove slides, you need to re-render the component - You could do this by changing the `key`.
 *
 * ```tsx
 * const { ref, activeIndex, totalSlides, snapTo, next, previous } = useSnapSlider();
 * <div ref={ref} className="flex snap-x snap-mandatory overflow-x-scroll scrollbar-hide">
 *   <div className="flex-none basis-full snap-start">Slide 1</div>
 *   <div className="flex-none basis-full snap-start">Slide 2</div>
 *   <div className="flex-none basis-full snap-start">Slide 3</div>
 * </div>
 * ```
 */
export function useSnapSlider({
  disabled,
  threshold = 0.5,
  selector,
  loop = true,
}: SnapOptions = {}): SnapResult {
  const slidesRef = useRef<Element[]>();
  const [rootRef, setRootRef] = useState<HTMLElement | null>(null);
  const [visibleSlides, setVisibleSlides] = useState<Array<boolean>>([]);
  const activeIndex = useRef(0);

  // Find the first visible slide inside the viewport.
  const firstVisibleIndex = visibleSlides.findIndex((active) => active);

  if (firstVisibleIndex > -1) {
    // Update the active slide index, when we get back a valid index. Otherwise, we keep the last known index.
    activeIndex.current = firstVisibleIndex;
  }

  useEffect(() => {
    if (rootRef && !disabled) {
      let mutation: MutationObserver | undefined;
      let observers: Array<() => void>;

      if (typeof MutationObserver !== "undefined") {
        mutation = new MutationObserver(() => updateSlides());

        mutation.observe(rootRef, {
          childList: true,
          // We need to observe the subtree, because we don't know if the slides are direct children
          // of the root element once the user sets a `selector`
          subtree: !!selector,
        });
      }

      const updateSlides = () => {
        const sliders = Array.from<Element>(
          selector ? rootRef.querySelectorAll(selector) : rootRef.children
        );

        setVisibleSlides((current) => {
          // If the number of slides has changed, we need to reset the visible state
          // If there is an active slide, we want to keep that active
          let activeIndex = current.findIndex((active) => active);
          if (activeIndex === -1) activeIndex = 0;

          return sliders.map((_, index) => index === activeIndex);
        });

        slidesRef.current = sliders;

        // Set the initial state

        // Destroy any existing observers
        if (observers) observers.forEach((destroy) => destroy());
        observers = sliders.map((slider, index) => {
          // Use an IntersectionObserver to determine if a slide is visible
          return observe(
            slider,
            (inView) => {
              // Update the visible state of the slide, once the observer fires
              setVisibleSlides((prev) => {
                if (prev[index] === inView) return prev;
                const newState = [...prev];
                newState[index] = inView;
                return newState;
              });
            },
            { threshold }
          );
        });
      };

      // Register the current slides
      updateSlides();

      return () => {
        if (observers) observers.forEach((destroy) => destroy());
        if (mutation) mutation.disconnect();
      };
    }
  }, [rootRef, disabled, threshold, selector]);

  const snapTo = useCallback((index: number) => {
    const slide = slidesRef.current?.at(index % slidesRef.current.length);
    const parent = slide?.parentElement;
    if (parent) {
      const rect = slide.getBoundingClientRect();

      parent.scrollTo({
        left: rect.left + parent.scrollLeft,
        behavior: "smooth",
      });
    }
  }, []);

  const next = useCallback(() => {
    if (!loop && activeIndex.current === slidesRef.current?.length - 1) return;
    snapTo(activeIndex.current + 1);
  }, [snapTo, loop]);

  const previous = useCallback(() => {
    if (!loop && activeIndex.current === 0) return;
    snapTo(activeIndex.current - 1);
  }, [snapTo, loop]);

  return {
    activeIndex: activeIndex.current,
    totalSlides: slidesRef.current?.length || 0,
    snapTo,
    next,
    previous,
    ref: setRootRef,
  };
}
