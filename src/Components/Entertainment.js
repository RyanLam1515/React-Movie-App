import React from 'react';
import { unavailable } from '../Config/config';
import EntertainmentModal from './EntertainmentModal';
import  EntertainmentControls  from './EntertainmentControls';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

const getVoteClassByRate = (vote) => {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

const Entertainment = ({ key, id, title, poster_path, date, media_type, overview , vote_average, value, type }) => {

    return (
    <EntertainmentModal className="movie" media_type={media_type} id={id} value={value} >
        
        <img 
            src={
                poster_path 
                    ? IMGPATH + poster_path 
                    : unavailable
            } 
            alt ={title} 
        />
            <h3 className="title">{title}</h3>
            <span className="subTitle">{media_type === "tv" ? "TV Series" : "Movie"}
            <span className="subTitle">{date}</span>
            <span className={
                    `tag ${getVoteClassByRate(vote_average)}`
                    }>
                    {vote_average}
            </span>
            </span>
        <div className="movie-overview">
            <h2>Overview:</h2>
            <p>{overview}</p>
        </div>
        { (type === "WatchList" || type === "Watched") &&
            <EntertainmentControls type={type} value={value}></EntertainmentControls>
        }
    </EntertainmentModal>
    )
}

export default Entertainment; 