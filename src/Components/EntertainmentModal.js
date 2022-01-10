import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from "axios";
import { useEffect, useState } from "react";
import { img_500, unavailable } from '../Config/config';
import "./EntertainmentModal.css";
import { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import Carousel from "./Carousel";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: "flex",
  alignItems: "center",
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  backgroundColor: "#39445a",
  border: "1px solid #282c34",
  boxShadow: 24,
  borderRadius: 3,
  padding: 4,
};

export default function EntertainmentModal( { children, media_type, id, value } ) {
  const [open, setOpen] = useState(false);
  const [entertainmentData, setEntertainmentData ] = useState();
  const [video, setVideo] = useState();

  const { addEntertainmentToWatchList, addEntertainmentToWatched, watchList, watched } = useContext(GlobalContext);
  
  
  let isEntertainmentInWatchList = watchList.find((entertainment) => entertainment.id === value.id);
  let isEntertainmentInWatched = watched.find((entertainment) => entertainment.id === value.id);

  const watchListDisabled = isEntertainmentInWatchList 
    ? true
    : isEntertainmentInWatched 
    ? true 
    : false;

  const watchedDisabled = isEntertainmentInWatched ? true: false;


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async() => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
    );

    setEntertainmentData(data);
  };

  const fetchVideo= async() => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
    );
     setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="movie" onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            { entertainmentData && 
              <div className='entertainmentModal'>
                <img className='entertainmentModalPortrait' 
                  src ={entertainmentData.poster_path ? `${img_500}/${entertainmentData.poster_path}` : unavailable} 
                  alt={entertainmentData.name || entertainmentData.title} >
                </img>
                <img className='entertainmentModalLandscape' 
                  src ={entertainmentData.backdrop_path ? `${img_500}/${entertainmentData.backdrop_path}` : unavailable} 
                  alt={entertainmentData.name || entertainmentData.title} >
                </img>
                <div className='entertatinmentModalInfo'>
                  <span className='entertainmentModalTitle'>
                    {entertainmentData.name || entertainmentData.title} (
                      {( 
                        entertainmentData.first_air_date ||
                        entertainmentData.release_date ||
                        "----"
                      ).substring(0,4)}
                    )
                  </span>

                  {entertainmentData.tagline && (
                    <i className='entertainmentModalTagline'>{entertainmentData.tagline}</i>
                  )}

                  <span className='entertainmentModalDescription'>{entertainmentData.overview}
                  </span>

                  {/* <div className='carouselContainer'>
                    <Carousel className='carousel' media_type={media_type} id={id}></Carousel>
                  </div> */}

                  <Button 
                    sx={{ marginTop: 2, display: "flex" }}
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="primary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>

                  <Button
                    sx={{ marginTop: 2, display: "flex" }}
                    variant="contained"
                    color='secondary'
                    onClick={() => addEntertainmentToWatchList(value)}
                    disabled={watchListDisabled}
                  >
                    Add to Watchlist
                  </Button>

                  <Button
                    sx={{ marginTop: 2, display: "flex" }}
                    variant="contained"
                    color='secondary'
                    onClick={() => addEntertainmentToWatched(value)}
                    disabled={watchedDisabled}
                  >
                    Add to Watched
                  </Button>
                </div>
            </div> }
          </Box>
        </Fade>
      </Modal>
    </>
  );
}