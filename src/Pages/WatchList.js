import React, {useContext} from 'react';
import CustomPagination from '../Components/CustomPagination';
import Entertainment from '../Components/Entertainment';
import {GlobalContext} from '../Context/GlobalState';
import { useEffect, useState } from "react";


const WatchList = () => {
    const [page, setPage] = useState(1);
    const { watchList } = useContext(GlobalContext);
    const [numOfPages, setNumOfPages ] = useState();


    useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div>
            {/* {watchList.length !== 0 &&
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${trendingData[0].backdrop_path}`}
                title={trendingData[0].original_title ? trendingData[0].original_title: trendingData[0].name}
                text={trendingData[0].overview} 
                />
            } */}
            <span className="pageTitle">My WatchList</span>
            {watchList && watchList.length > 0 ? (
                <div className="trending">
                    {watchList.map((value) => (
                        < Entertainment
                            key={value.id}
                            id={value.id}
                            poster_path={value.poster_path}
                            title={value.title || value.name}
                            date={value.first_air_date || value.release_date}
                            media_type={value.media_type}
                            vote_average={value.vote_average}
                            overview={value.overview}
                            value={value}
                            type="WatchList"
                            />
                        ))
                    }
                </div>
                    ) : 
                    <h2 className='noMovies'> No movies in your watchList, add some first!</h2>}
        <CustomPagination setPage={setPage} numOfPages={Math.round(watchList.length / 20)}/>
        </div>
        );
    };

export default WatchList;