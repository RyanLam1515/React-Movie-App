import axios from "axios";
import { useEffect } from "react";
import Chip from '@mui/material/Chip';

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage

}) => {

const handleAdd=(addedGenre)=> {
    setSelectedGenres([...selectedGenres, addedGenre]);
    setGenres(genres.filter((genre)=>genre.id !== addedGenre.id));
    setPage(1);
}

const handleRemove=(removedGenre)=> {
    setSelectedGenres(selectedGenres.filter((genre)=>genre.id !== removedGenre.id));
    setGenres([...genres, removedGenre]);
    setPage(1);
}

const fetchGenres = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
    );

    setGenres(data.genres);
    };

    useEffect(() => {

        fetchGenres(); 

        return () => {
            setGenres({});
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<div style={{ padding: "6px 0", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {selectedGenres && selectedGenres.map((genre) => (
            <Chip color="info" label={genre.name} style={{margin: 2, backgroundColor: '#76b5c5', fontFamily: 'Trebuchet MS', fontSize: 17}} size='medium' key={genre.id} clickable onDelete={()=>handleRemove(genre)}/>
        ))}
        {genres && genres.map((genre) => (
            <Chip label={genre.name} style={{margin: 2, backgroundColor: '#ded8cc', fontFamily: 'Trebuchet MS', fontSize: 17}} size='medium' key={genre.id} clickable onClick={()=>handleAdd(genre)} />
        ))}
    </div>
    );
}; 

export default Genres;