import Entertainment from "../Components/Entertainment";
import CustomPagination from "../Components/CustomPagination";
import axios from "axios";
import { useState, useEffect } from "react";
import Genres from "../Components/Genres";
import useGenre from "../hooks/useGenre";
import HeroImage from "../Components/HeroImage";
import { BACKDROP_SIZE, IMAGE_BASE_URL } from "../Config/config";

const Series = () => {
    const [page, setPage] = useState(1);
    const [seriesData, setSeriesData ] = useState([]);
    const [numOfPages, setNumOfPages ] = useState();
    const [selectedGenres, setSelectedGenres ] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreForURL = useGenre(selectedGenres);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchSeries = async() => {
        
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
        );
        console.log(data)
        setSeriesData(data.results);
        setNumOfPages(data.total_pages);
    };

    useEffect(() => {
        fetchSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, genreForURL]);

    return (
    <div>
        {seriesData.length !== 0 &&
        <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${seriesData[0].backdrop_path}`}
            title={seriesData[0].original_title ? seriesData[0].original_title: seriesData[0].name}
            text={seriesData[0].overview} 
            />
        }
        <span className='pageTitle'>Series</span>
        <Genres style={{alignItems: 'center', justifyContent: 'center'}} type="tv" selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setPage={setPage} />
        <div className="trending">
            {seriesData &&  
                   seriesData.map((value) => (
                    < Entertainment
                        key={value.id}
                        id={value.id}
                        poster_path={value.poster_path}
                        title={value.title || value.name}
                        date={value.first_air_date || value.release_date}
                        media_type="tv"
                        vote_average={value.vote_average}
                        overview={value.overview}
                        value={value}
                        type="Series"
                    />
                   ))
                    }

        </div>
        {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
        )}
    </div>
    )
}

export default Series;