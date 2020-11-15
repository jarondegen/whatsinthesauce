import React from 'react';

const Card = ({recipe}) => {

    const randomSticky = () => {
        const colors = ["blue", "purple"]
        return colors[Math.floor(Math.random() * 2)]
    }

    const handleClick = async (e) => {
        const idMeal = e.target.id
        const data = await fetch(`/api/fridges/youtube/${parseInt(idMeal)}`)
        if (data.ok) {
            const { url } = await data.json();
            window.open(url)
        }
    }

    return (
        <div className={`recipe-card sticky-${randomSticky()}`} key={recipe.href}>
            <div id={recipe.idMeal} onClick={handleClick}>
                <img onClick={handleClick} id={recipe.idMeal} onClick={handleClick} className="recipe-card-image" src={recipe.thumbnail}/>
                <p onClick={handleClick} id={recipe.idMeal} className="recipe-card-title">{recipe.title}</p>
            </div>
        </div>
    );
};

export default Card;