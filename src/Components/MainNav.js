import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Search from '@mui/icons-material/Search';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import Badge from '@mui/material/Badge';
import {GlobalContext} from '../Context/GlobalState';



export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const { watchList, watched } = React.useContext(GlobalContext);

  useEffect(() => {
    if(value === 0) history.push('/');
    else if (value === 1)
      history.push('/movies');
    else if (value === 2)
      history.push('/series');
    else if (value === 3)
      history.push('/search');
    else if (value === 4)
      history.push('/watchlist');
    else if (value === 5)
      history.push('/watched');
  }, [value, history]);

  return (
    <Box sx={{ width: '100%', position: "fixed", bottom: 0, zIndex: 100}}>
      <BottomNavigation
        showLabels
        value={value}
        style = {{
          backgroundColor: "#2d313a",
          paddingTop: 10
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
          style={{ color: "white"}}
          label="Trending" 
          icon={<WhatshotIcon/>} 
        />
        <BottomNavigationAction 
          style={{ color: "white"}}
          label="Movies" 
          icon={<MovieIcon/>} 
        />
        <BottomNavigationAction 
          style={{ color: "white"}}
          label="TV Series" 
          icon={<TvIcon/>} 
        />
        <BottomNavigationAction 
          style={{ color: "white"}}
          label="Search" 
          icon={<Search/>} 
        />
        <BottomNavigationAction 
          style={{ color: "white"}}
          label="WatchList"
          icon={<Badge badgeContent={watchList.length} color="primary">
            <FormatListBulletedOutlinedIcon/>
            </Badge>}
        />
        <BottomNavigationAction 
          style={{ color: "white"}}
          label="Watched"
          icon={<Badge badgeContent={watched.length} color="success">
            <CheckBoxOutlinedIcon/>
            </Badge>}
        />
      </BottomNavigation>
    </Box>
  );
}