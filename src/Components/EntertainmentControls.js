import React, { useContext } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {GlobalContext} from "../Context/GlobalState";

const EntertainmentControls = ({value, type}) => {
    const {removeEntertainmentFromWatchList, addEntertainmentToWatched, moveToWatchList, removeEntertainmentFromWatched} = useContext(GlobalContext);

    return (
        <div className="inner-card-controls">
            {type === 'WatchList' && (
                <>
                    <button className="ctrl-btn" onClick={() => addEntertainmentToWatched(value)}>
                        <VisibilityIcon />
                    </button>

                    <button className="ctrl-btn" onClick={() => removeEntertainmentFromWatchList(value.id)}>
                        <CloseIcon/>
                    </button>
                </>
            )}

            {type === 'Watched' && (
                <>
                    <button className="ctrl-btn" onClick={() => moveToWatchList(value)}>
                        <VisibilityOffIcon />
                    </button>

                    <button className="ctrl-btn" onClick={() => removeEntertainmentFromWatched(value.id)}>
                        <CloseIcon/>
                    </button>
                </>
            )}
        </div>
    )
}

export default EntertainmentControls;