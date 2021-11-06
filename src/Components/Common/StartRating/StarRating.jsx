import React, { useState,useEffect } from 'react';
import StarRatings from 'react-star-ratings';

const StarRating = (props) =>{
    let [rating, setRating] = useState(props.currentRating);
    let changeRating = ( newRating, name ) => {
        setRating(newRating);
        props.addScore(newRating);
    }
    useEffect(()=>{
        setRating(props.currentRating);
    },[props.currentRating]);
    return(
        <StarRatings
        rating={rating}
        starRatedColor="#FFCC00"
        starHoverColor="#FFCC00"
        changeRating={changeRating}
        numberOfStars={5}
        name='rating'
        starDimension="25px"
      />
       
    );
}
export default StarRating;
