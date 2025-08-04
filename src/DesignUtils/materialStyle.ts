import { IImageBox } from "./materialStyleTypes";

// styles.ts
export const getBoxStyles = ({
    display = "block", // Default display
    right = "0%", // Default right
    bottom = "0", // Default bottom
    zIndex = 1, // Default z-index
    width = "120rem", // Default width
    borderColor ="secondary.light" ,// Default border color
    outlineColor= "white"
  }:IImageBox) => ({
    // Fixed Styles
    background: "#872346", 
    border: "8px solid", 
    outline: "1px dotted", 
    outlineOffset: "3px", 
    display,
    position: "relative",
    right,
    bottom,
    zIndex,
    width,
    outlineColor,
    borderColor, // Dynamic border color
  });
  