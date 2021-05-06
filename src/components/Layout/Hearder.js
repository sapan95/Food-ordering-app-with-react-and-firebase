import React, {Fragment} from 'react';
import HearderCartButton from './HeaderCartButton';
import mealImg from '../assets/meals.jpg'
import classes from './Header.module.css';

const Hearder = props => {
    return(
        <Fragment>
            <header className = {classes.header}>
                <h1>Reactmeal</h1>
                <HearderCartButton onClick = {props.onClick}/>
            </header>
            <div className = {classes['main-image']}>
                <img src = {mealImg} alt = 'A taable full of delicious food'/>
            </div>
        </Fragment>
    );
}

export default Hearder;