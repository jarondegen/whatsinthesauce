import React from 'react';

const Card = ({recipe}) => {

    const randomSticky = () => {
        const colors = ["blue", "purple"]
        return colors[Math.floor(Math.random() * 2)]
    }

    return (
        <div className={`recipe-card sticky-${randomSticky()}`} key={recipe.href}>
            <a href={recipe.href}>
            <img className="recipe-card-image" src={"https://img." + recipe.thumbnail.split(".").slice(1).join(".")}/>
            <p className="recipe-card-title">{recipe.title}</p>
            </a>
        </div>
    );
};

export default Card;