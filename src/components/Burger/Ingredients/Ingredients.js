import React from 'react';
import classes from './Ingredients.module.css';
import PropTypes from 'prop-types';

const ingredients = (props) => { 
    let ingredient = null;

    switch(props.type){
        case('bread-bottom'):
            ingredient = <div className={[classes.BreadBottom, "animated bounceIn delay-0s"].join(' ')}></div>;
            break;
        case('bread-top'):
            ingredient=(
                <div className={[classes.BreadTop, "animated bounceIn delay-0s"].join(' ')}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case('meat'):
            ingredient = <div className={[classes.Meat,"animated bounceIn delay-0s fast"].join(' ')}></div>;
            break;
        case('salad'):
            ingredient = <div className={[classes.Salad,"animated bounceIn delay-0s fast"].join(' ')}></div>;
            break;
        case('cheese'):
            ingredient = <div className={[classes.Cheese,"animated bounceIn delay-0s fast"].join(' ')}></div>;
            break;
        case('bacon'):
            ingredient = <div className={[classes.Bacon,"animated bounceIn delay-0s fast"].join(' ')}></div>;
            break;
        default:
            ingredient = null;
    }
    return ingredient;
};

//add property validation to validate property type. this react is definitely filled with treasures.
ingredients.prototype ={
    type: PropTypes.string.isRequired
}

export default ingredients;