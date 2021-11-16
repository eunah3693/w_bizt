import { createMuiTheme } from "@material-ui/core/styles";

/**
 * 테마변경 매니저
 * 기본설정: https://material-ui.com/customization/default-theme/
 */
const defaultTheme = createMuiTheme({
  typography: {
    color: "#1e1e1e",
    sub: "#c4c4c4",
    main: "#1e1e1e",
    dark: "#c5c5c5",
    light: "#fff",
    orange: "#ff650c",
  },
  palette: {
    primary: {
      main: "#071e55",
      gradient: "#ff3b73",
      sub: "#3968da",
      lightdark: "#e7e7e7",
      gray: "#f4f4f4",
      navy: "#143074",
      blue: "#2046a1",
      sky: "#6ec8e2",
      blueGradient:
        "linear-gradient(160deg, rgba(7,30,85,1) 0%, rgba(32,70,161,1) 53%, rgba(110,200,226,1) 97%)",
      carouselBackground: " rgb(0 0 0 / 60%)",
      floatingGradient:
        "linear-gradient(141deg, rgba(7,30,85,1) 0%, rgba(32,70,161,1) 43%, rgba(110,200,226,1) 97%)",
      red: "#ff0000",
      d3border: "#d3d3d3",
      darkGray: "rgb(107 107 107)",
      helper: "#a9a9a9",
      shadow: "2f2f2f1f",
      redOrange: "#f44336"
    },
  },
});
// theme.palette.primary.main
export default defaultTheme;
