import { useState } from "react";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Tab, Tabs } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useEffect } from "react";
import Entertainment from "../Components/Entertainment";
import CustomPagination from "../Components/CustomPagination";

const Search = () => {

    const [tabType, setTabType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#fff",            
            },
        },
    });

    const fetchSearch = async () => {
     try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${tabType ? "tv" : "movie"}?api_key=63e444de0332e92c45cdf94d8dd83d54&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`);
        
            if (data) {
            setSearchData(data.results);
            setNumOfPages(data.total_pages);
            }
    } catch (error) {
        console.error(error);
    }
};

    useEffect(() => {
        window.scroll(0,0);
        fetchSearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabType, page]);

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
                    onClick={fetchSearch}
                    >
                    <SearchIcon />
                </Button>
    
                </div>

                <Tabs value={tabType} indicator='primary' textColor='primary' onChange={(event,newValue) => {
                    console.log(newValue);
                    setTabType(newValue);
                    setPage(1);
                }}>
                    <Tab style={{width: "100%"}} value={0} label="Search Movies"/>
                    <Tab style={{width: "100%"}} value={1} label="Search TV Series"/>
                </Tabs>
            </ThemeProvider>
            <div>
        <div className="trending">
            {searchData &&  
                   searchData.map((value) => (
                    < Entertainment
                        key={value.id}
                        id={value.id}
                        poster_path={value.poster_path}
                        title={value.title || value.name}
                        date={value.first_air_date || value.release_date}
                        media_type={tabType ? "tv": "movie"}
                        vote_average={value.vote_average}
                        overview={value.overview}
                    />
                   ))}
            {searchTerm && 
                searchData.length === 0 &&
                (tabType ? <h2>No TV Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
        )}
    </div>
        </div>
    );
};

export default Search; 
