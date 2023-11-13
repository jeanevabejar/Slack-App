import gsap from "gsap";

export const loader = () => {
  return new Promise((resolve) => {
    const timeline = gsap.timeline();

    timeline.to(".app", {
      opacity: 0,
      onComplete: () => {
        document.querySelector(".app").style.display = "none";
        resolve();
      },
    }, "+=2");
    return timeline;
  });
};
