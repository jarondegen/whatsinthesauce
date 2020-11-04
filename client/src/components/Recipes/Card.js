import React from 'react';

const Card = ({recipe}) => {

    return (
        <div className="recipe-card" key={recipe.href}>
            <a href={recipe.href}>
            <img className="recipe-card-image" src={recipe.thumbnail}/>
            <p>{recipe.title}</p>
            </a>
        </div>
    );
};

export default Card;