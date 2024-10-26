import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";

import "@fontsource/homenaje";
import "@fontsource/roboto-flex";
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: PaletteColor;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
}
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1f2937",

      light: "#F7A582", //light peach
    },
    secondary: {
      main: "#F06D64", // dark peach

      light: "#fcbab8", //light pink
      dark: "#872346", //main magenta color
    },
    tertiary: {
      main: "#F3E9DD", //light pink
      light: "#f3f3f3",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          height: "40px",
          width: "95px",
          borderRadius: "40px",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          justifyContent: "center",
        },
        // button: {
        //   fontSize: "13px",
        // },
      },
    },
  },
  typography: {
    fontFamily: "Homeja,Roboto,Arial,sans-serif",
    h1: {
      fontFamily: "Homeja,sans-serif",
      fontWeight: "700",
      fontSize: "80px",
      // lineHeight: "96px",
      color: "#F26B63",
    },
    body1: {
      fontFamily: "Roboto Flex",
      fontWeight: "500",
      size: "17px",
      color: "#7a7a7a",
    },
    body2: {
      fontFamily: "Homeja,sans-serif",
      color: "#252525",
    },
  },
});
