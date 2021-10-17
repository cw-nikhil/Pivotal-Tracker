import "./css/ArrowSvg.css";

export const ArrowSvg = ({dirClass}) => {
  return (
    <svg
      class={`arrowSvg ${dirClass}`}
      viewBox="0 0 16 16"
      fill="currentcolor"
      tabindex="-1"
      focusable="false"
      aria-hidden="true"
      role="img"
    >
      <path d="M4.59 15.8a1 1 0 01-.69-.29 1 1 0 010-1.37L10 8 3.9 1.86a1 1 0 010-1.37 1 1 0 011.38 0l6.82 6.82a1 1 0 010 1.38l-6.82 6.82a1 1 0 01-.69.29z"></path>
    </svg>
  );
};