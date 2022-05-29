import {useContext} from 'react'

import FavouriteContext from '../context/likedContext' 
//import css
import  '../styles/favourite.css'

// imports from material ui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


function Favourite(){
	const {favouriteCatData,setFavouriteCatData} = useContext(FavouriteContext)

	const handleClickFavourite = (e)=>{
			const id = e.currentTarget.id
			const updatedFavouriteCatData = favouriteCatData.map(cat =>
					  cat.id === id
					    ? { ...cat, isFavourite: !cat.isFavourite }
					    : cat
					)

			setFavouriteCatData(updatedFavouriteCatData.filter(cat=>cat.isFavourite === true))
		}

	return(
			<div className="grid-f">
			{
				favouriteCatData.map((cat,i)=>(
					<Card sx={{ maxWidth: 300 }} key={i} id={cat.id} className="card">
				      <CardMedia
				        component="img"
				        height="140"
				        image={cat.url}
				        alt="cat-image"
				      />
				      <CardActions>
				        <Button size="small">Share</Button>
				        {cat.isFavourite?(<FavoriteIcon style={{color:'red'}} id={cat.id} onClick={(e)=>handleClickFavourite(e)}/>):(<FavoriteBorderIcon id={cat.id} onClick={(e)=>handleClickFavourite(e)}/>) }
				      </CardActions>
				    </Card>
					))
			}
		</div>

		)
}

export default Favourite

