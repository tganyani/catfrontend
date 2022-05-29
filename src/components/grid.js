import {useState,useEffect,useContext} from 'react'

import axios from 'axios' // to fetch the cat-api
								
// imports from material ui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress'
// import grid-css
import '../styles/grid.css'
//import context
import FavouriteContext from '../context/likedContext'

function Grid(){
	const [catData, setCatData] = useState([])
	const [next, setNext] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const {setFavouriteCatData,} = useContext(FavouriteContext)

	useEffect(()=>{
		setIsLoading(true)
		const  fetchData = async ()=>{
		await	axios.get('https://api.thecatapi.com/v1/images/search?format=json&limit=100',{ //fetching data with axios
				headers:{
					"Content-Type":"application/json",
					"x-api-key":"a1adb6ea-9f64-425f-bec1-ea7a4f067a22"
				}
			}).then(res=>{
				const mapedData = res.data.map(d=>({id:d.id,url:d.url,isFavourite:false}))
				localStorage.setItem("savedCatData", JSON.stringify(mapedData))
				setCatData(mapedData)
				setIsLoading(false)
			}).catch(err=>{
				console.log(err)
			})
		}
		fetchData()
		}, [ ])
		const handleClickFavourite = (e)=>{
			const id = e.currentTarget.id
			const savedCatData = JSON.parse(localStorage.getItem("savedCatData"));
			const updatedCatData = savedCatData.map(cat =>
					  cat.id === id? { ...cat, isFavourite: !cat.isFavourite }: cat
					)
			localStorage.setItem("savedCatData", JSON.stringify(updatedCatData))
			setCatData(updatedCatData)
			setFavouriteCatData(catData.filter(cat=>cat.isFavourite === true))
		}

	const handleNext = ()=>{
		if(next < 9){
			setNext(next+1)
		}
		else{
			setNext(0)
		}
	}
	return(
			isLoading?(<CircularProgress/>):(<div>
				<div className="grid">
					{
						catData.slice(next*10,(next+1)*10).map((cat,i)=>(
							<Card sx={{ maxWidth: 200 }} key={i} id={cat.id} className="card">
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
				<Button id="next-button" onClick={()=>handleNext()}>загружаем еще <ArrowForwardIosIcon style ={{color:'white'}}/></Button>
			</div>)
		
		)
}


export default Grid

