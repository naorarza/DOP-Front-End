import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(AuthContext);
  const themeMui = createTheme({
    direction: "rtl",
    palette: {
      mode: theme === "#262b2f" ? "dark" : "light",
    },
    // shadows: Array(25).fill('none'),
    typography: {
      fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
    },
    components: {
      MuiInputAdornment: {
        styleOverrides: {
          positionEnd: {
            fontSize: "20px",
          },
        },
      },
    },
  });

  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <MUIThemeProvider theme={themeMui}>
      <CacheProvider value={cacheRtl}>{children}</CacheProvider>
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
