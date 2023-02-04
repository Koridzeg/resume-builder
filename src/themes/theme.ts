import { createTheme } from "@mui/material";


const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#151516',
        },
        secondary: {
          main: '#f50057',
        },
        error: {
          main: '#EF5050',
        },
      },
}) 

export default appTheme