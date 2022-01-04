import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({
    setSearchTerm,
    fetchSearch

}) => {
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#fff",            
            },
        },
    });

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display: "flex", margin: '15px 10px'}}>
                <TextField
                style={{ flex: 1}}
                className="searchBox"
                label="Search"
                variant="filled"
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button 
                    variant="contained" 
                    style = {{ marginLeft: 10}}
                    onClick={fetchSearch}>
                    <SearchIcon />
                </Button>

                </div>

            </ThemeProvider>
        </div>

    );

};

export default SearchBar;