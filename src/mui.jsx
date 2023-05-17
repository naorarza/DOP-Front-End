import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'

const theme = createTheme({
    direction: 'rtl',
    palette: {
        mode: 'dark',
      },
    // shadows: Array(25).fill('none'),
    typography: {
        fontFamily: '-apple-system',
    },
    components: {
        MuiInputAdornment: {
            styleOverrides: {
                positionEnd: {
                    fontSize: '20px',
                },
            },
        },
    },
})

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
})

const ThemeProvider = ({ children }) => {
    return (
        <MUIThemeProvider theme={theme}>
            <CacheProvider value={cacheRtl}>{children}</CacheProvider>
        </MUIThemeProvider>
    )
}

export default ThemeProvider