import { createTheme } from "@mui/material";


const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#151516',
        },
        secondary: {
          main: '#0E80BF',
        },
        error: {
          main: '#EF5050',
        },
      },
}) 

export default appTheme