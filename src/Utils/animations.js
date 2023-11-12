import gsap from "gsap";

export const loader = () => {
  const setDisplayNone = () => {
    document.querySelector(".app").style.display = "none";
  };
  const timeline = gsap.timeline();
  timeline.to(".app", { opacity: 0, duration: 1, onComplete: setDisplayNone, zIndex:1, }, "+=3");

};
