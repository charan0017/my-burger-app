import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(ingredientName => <span 
            key={ingredientName}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{ingredientName} ({props.ingredients[ingredientName]})</span>);
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;
