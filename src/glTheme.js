import { createMuiTheme } from "@material-ui/core/styles";

// https://material-ui.com/customization/themes/
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333",
      light: "#555"
    },
    secondary: {
      main: "#f60",
      dark: "#db5800",
      contrastText: "#fff"
    }
  },
  selected: {
    background: '#db5800'
  },
  typography: {
    fontFamily: ["Helvetica Neue", "Open Sans", "Arial", "sans-serif"].join(
      ","
    ),
    useNextVariants: true // https://material-ui.com/style/typography/#migration-to-typography-v2
  },

  overrides: {
    MuiButton: {
      // Name of the component ⚛️ / style sheet
      text: {
        // Name of the rule
        color: "#fff" // Some CSS
      }
    }
  },

  //   props: {
  //     // Name of the component ⚛️
  //     MuiButtonBase: {
  //       // The properties to apply
  //       disableRipple: true, // No more ripple, on the whole application 💣!
  //     },
  //   },

  spacing: 8
});
