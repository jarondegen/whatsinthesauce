import React from 'react';

const Card = ({recipe}) => {

    const randomSticky = () => {
        const colors = ["blue", "purple"]
        return colors[Math.floor(Math.random() * 2)]
    }

    return (
        <div className={`recipe-card sticky-${randomSticky()}`} key={recipe.href}>
            <a target="_blank" href={recipe.href}>
            <img className="recipe-card-image" src={recipe.thumbnail}/>
            <p className="recipe-card-title">{recipe.title}</p>
            </a>
        </div>
    );
};

export default Card;