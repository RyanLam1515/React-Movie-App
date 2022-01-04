import axios from "axios";
import { useEffect, useState } from "react";
import Entertainment from "../Components/Entertainment";
import './Trending.css'
import CustomPagination from "../Components/CustomPagination";
import HeroImage from "../Components/HeroImage";
import { BACKDROP_SIZE, IMAGE_BASE_URL } from "../Config/config";

const Trending = () => {
    const [page, setPage] = useState(1);
    const [trendingData, setTrendingData] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchTrending = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=${page}`);
        
        setTrendingData(data.results);
        console.log(trendingData);
    };

    useEffect(() => {
        fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
    <div>
        {trendingData.length !== 0 &&
        <HeroImage 
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${trendingData[0].backdrop_path}`}
            title={trendingData[0].original_title ? trendingData[0].original_title: trendingData[0].name}
            text={trendingData[0].overview} 
            />
        }
        <span className="pageTitle">Trending</span>
        <div className="trending">
            {trendingData &&  
                   trendingData.map((value) => (
                    < Entertainment
                        key={value.id}
                        id={value.id}
                        poster_path={value.poster_path}
                        title={value.title || value.name}
                        date={value.first_air_date || value.release_date}
                        media_type={value.media_type}
                        vote_average={value.vote_average}
                        overview={value.overview}
                    />
                   ))
                    }
        </div>
        <CustomPagination setPage={setPage}/>
    </div>
    );
};

export default Trending;