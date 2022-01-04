import React, { useEffect, useState } from 'react';
import axios from "axios";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../Config/config';
import './Carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({
    media_type,
    id
}) => {
    
    const [cast, setCast] = useState([]);

    const items = cast?.map((castMember) => (
        <div className="carouselContent">
            <img
                src={castMember.profile_path ? `${img_300}/${castMember.profile_path}` : noPicture}
                alt={castMember?.name}
                onDragStart={handleDragStart}
                className="carouselContentImg"
                />
            <b className="carouselContentTxt">{castMember?.name}</b>
        </div>
    ));

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 6,
        },
    };

    const fetchCast = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
        );
        setCast(data.cast);
    }

    useEffect(() => {
        fetchCast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <AliceCarousel autoPlay responsive={responsive} infinite mouseTracking disableDotsControls disableButtonsControls items={items} />
  );
}

export default Carousel;