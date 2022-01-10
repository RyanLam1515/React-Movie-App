import React from "react"; 
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme=createTheme({
    palette: {
        mode: "dark",
    },
});

const CustomPagination = ({setPage, numOfPages = 10 }) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    };

    return <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center", 
            marginTop: 10,
            paddingBottom: 100,
    }}
    >
        <ThemeProvider theme={darkTheme}>
        <Pagination count={numOfPages} onChange={(event) => handlePageChange(event.target.textContent)} />
        </ThemeProvider>
    </div>
};

export default CustomPagination; 