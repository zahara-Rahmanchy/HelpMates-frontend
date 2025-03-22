export interface IImageBox {
    display?: string | { xs?: string; md?: string }; // xs and md are optional
    right?: string | {md?: string, xs?: string},;
    bottom?: string;
    zIndex?: number | {md?: number, xs?: number};
    width?: string;
    borderColor?: string;
    outlineColor?: string; // Optional outline color
  }
  