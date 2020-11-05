import React from 'react';

const Card = ({recipe}) => {

    const randomSticky = () => {
        const colors = ["yellow", "blue", "pink", "purple"]
        return colors[Math.floor(Math.random() * 4)]
    }

    return (
        <div className={`recipe-card sticky-${randomSticky()}`} key={recipe.href}>
            <a href={recipe.href}>
            <img className="recipe-card-image" src={recipe.thumbnail}/>
            <p className="recipe-card-title">{recipe.title}</p>
            </a>
        </div>
    );
};

export default Card;