import React from 'react';
import classes from './Burger.module.css';
import Ingredients from './Ingredients/Ingredients';
import empty from '../../assets/empty.png'
const burger = (props) => { 
    let Zerocounter=0;
    // convert object to [ ['lion', '🦁'], ['panda', '🐼'] ]
    let transformedIngredients = Object.entries(props.ingredients).map((ing)=>{
        if(ing[1] === 0){
            Zerocounter++;
            return [];
        }else{
            return ing;
        }
    });
    transformedIngredients = Zerocounter === transformedIngredients.length ? [] : transformedIngredients;
    
    return(
        <div className={classes.Burger}>

            <Ingredients type= "bread-top"/>
           {transformedIngredients.map((ingredient)=>{
                const n = ingredient[1];
                let array = [];
                for(let i=0; i<n;i++){
                    array.push(<Ingredients key={ingredient[0] + i} type= {ingredient[0]}/>)
                }
                return array;
            })}
            {transformedIngredients.length === 0 ? <img className={ [classes.empty_img, "animated bounceIn delay-0s"].join(' ')} src={empty} alt=""/> : null}
            <Ingredients type= "bread-bottom"/>
        </div>
    );
};

export default burger;