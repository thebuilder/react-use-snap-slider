# react-snap-slider

## Usage

### `useSnapSlider` hook

The `useSnapSlider` hook handles the logic for a CSS Scroll Snap slider.

```tsx
import { useSnapSlider } from "react-snap-slider";

function App() {
  const { ref, next, previous, activeIndex, totalSlides } = useSnapSlider({
    threshold: 0,
  });

  return (
    <div>
      <div
        ref={ref}
        className="snap-x snap-mandatory overflow-x-scroll scrollbar-hide"
      >
        <div className="flex-none basis-full snap-start">Slide 1</div>
        <div className="flex-none basis-full snap-start">Slide 2</div>
        <div className="flex-none basis-full snap-start">Slide 3</div>
      </div>
      <p>
        Slide {activeIndex + 1} / {totalSlides}
      </p>
      <button>Previous</button>
      <button>Next</button>
    </div>
  );
}
```

## API

### Options

Provide these values as the options argument in the `useSnapSlider` hook:

| Name          | Type      | Default | Description                                                                                                             |
| ------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| **selector**  | `string`  | `'0px'` | A CSS selector to use to find the slides inside the root element. If not defined, all children will be used             |
| **threshold** | `number`  | `0`     | Number between `0` and `1` indicating the percentage of a slide that should be visible, before it's considered visible. |
| **disabled**  | `boolean` | `false` | Disable the snap slider logic                                                                                           |

### Return values

The `useSnapSlider` hook returns an object with the following values:

| Name            | Type                      | Description                                                                                                 |
| --------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **ref**         | `Ref`                     | The `ref` function to pass to the slider container. This is the element that can scroll to show the slides. |
| **activeIndex** | `number`                  | The `index` of the first visible slide.                                                                     |
| **totalSlides** | `number`                  | The total number of slides that's been registered. This will be `0` until the `ref` is set.                 |
| **next**        | `() => void`              | A function to scroll to the next slide.                                                                     |
| **previous**    | `() => void`              | A function to scroll to the previous slide.                                                                 |
| **scrollTo**    | `(index: number) => void` | A function to scroll to a specific slide.                                                                   |

## Styling

The `useSnapSlider` hook handles the logic for a snap slider, giving you full control over the styling.

### Tailwind CSS

Example of a snap slider with three slides, styled with [Tailwind CSS](https://tailwindcss.com/).

The important parts are:

- `snap-x snap-mandatory overflow-x-scroll` on the container. This enables the native scrolling and snapping.
- `snap-start` on each slide. This makes the slides snap to the start of the container.
- `flex-none basis-full` on each slide. This makes the slides take up the full width of the container.

```html
<div class="snap-x snap-mandatory overflow-x-scroll">
  <div class="flex-none basis-full snap-start">Slide 1</div>
  <div class="flex-none basis-full snap-start">Slide 2</div>
  <div class="flex-none basis-full snap-start">Slide 3</div>
</div>
```

#### Hiding the scrollbar

You can use the following CSS to hide the scrollbar on the snap slider.

```css
@layer components {
  .scrollbar-hide {
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

Apply it to the snap slider container.

```html
<div class="snap-x snap-mandatory overflow-x-scroll scrollbar-hide">...</div>
```
