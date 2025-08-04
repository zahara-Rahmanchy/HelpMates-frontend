export interface IImageBox {
    display?: string | { xs?: string; md?: string }; // xs and md are optional
    right?: string | {md?: string, xs?: string};
    bottom?: string | {md?: string, xs?: string};
    zIndex?: number | {md?: number, xs?: number};
    width?: string | {md?: string, xs?: string};
    borderColor?:string  | {md?: string, xs?: string};
    outlineColor?: string | {md?: string, xs?: string}; // Optional outline color
  }
  