"use client";
import {stagger} from "framer-motion";
type Direction = "left" | "right" | "up" | "down" | "none"; // "none" for no movement
type TransitionType = "spring" | "tween" | "inertia";
export const bannerAnimations = {
  initial: { y: -100, opacity: 0 },
  whileInView: { y: 0, opacity: 1 }, // Triggers 'show' when in the viewport
  viewport: { once: false },
  transition: {
    type: "spring", // You can adjust this as needed
    stiffness: 30,
    damping: 8,
    duration: 1.0,
    ease: "easein",
  },
};

export const slideAnimation = (direction = "right",type="spring") => ({
  initial: { 
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0 
    },
  whileInView: { x: 0 ,y:0},
  viewport: { once: false },
  transition:{
    type:type,
    bounce:0,
    stiffness: 30,
    damping: 10,
    duration: 100,
    ease: "easeout",
  }
  // transition: {
  //   type: "tween",
  //   // stiffness: 30,
  //   // damping: 28,
  //   duration: 5,
  //   ease: "easein",
  // },
});



export const textVariant1 = () => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    type: "spring",
    duration: 6,
    bounce: 0.0,
    delay: stagger(0.01),
  },
});
export const staggerContainer = () => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      // Adjust this value to control the staggering delay
    },
  },
});

// export const staggerContainer = () => ({
//   hidden: {},
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren:0.2,
//       delayChildren,
//     },
//   },
// });
const fadeIn2 = (duration: number = 1.5) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration,
      ease: "easeInOut",
    }
  }
});

export const fadeIn = (direction: string, type: any, delay: any, duration: any) => ({
  initial: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  whileInView: { x: 0 ,y:0,opacity:1},
  viewport: { once: false },
   transition: {
      type:type,
      delay:delay,
      duration,
      ease: 'easeOut',
    },
  
});

export const slideIn = (
  direction: Direction,
  type: TransitionType,
  delay: number,
  duration: number
) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});
