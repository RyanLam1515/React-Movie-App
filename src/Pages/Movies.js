import axios from "axios";
import { useState, useEffect } from "react";
import Entertainment from "../Components/Entertainment";
import './Trending.css'
import CustomPagination from "../Components/CustomPagination";
import Genres from "../Components/Genres";
import useGenre from "../hooks/useGenre";
import HeroImage from "../Components/HeroImage";
import { BACKDROP_SIZE, IMAGE_BASE_URL } from "../Config/config";

const Movies = () => {
    
    const [page, setPage] = useState(1);
    const [movieData, setMovieData ] = useState([]);
    const [numOfPages, setNumOfPages ] = useState();
    const [selectedGenres, setSelectedGenres ] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreForURL = useGenre(selectedGenres);



    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchMovies = async() => {
        
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
        );
        console.log(data)
        setMovieData(data.results);
        setNumOfPages(data.total_pages);
    };

    useEffect(() => {
        fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, genreForURL]);

    return (
    <div>
        {movieData.length !== 0 &&
        <HeroImage 
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movieData[0].backdrop_path}`}
            title={movieData[0].original_title ? movieData[0].original_title: movieData[0].name}
            text={movieData[0].overview} 
            />
        }
        <span className='pageTitle'>Movies</span>
        <Genres style={{alignItems: 'center', justifyContent: 'center'}} type="movie" selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setPage={setPage} />
        <div className="trending">
            {movieData &&  
                   movieData.map((value) => (
                    < Entertainment
                        key={value.id}
                        id={value.id}
                        poster_path={value.poster_path}
                        title={value.title || value.name}
                        date={value.first_air_date || value.release_date}
                        media_type="movie"
                        vote_average={value.vote_average}
                        overview={value.overview}
                        value={value}
                        type="Movies"
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

export default Movies;