import React, { useState, useEffect } from 'react';
import Recipe_card from './recipe_card';

const Row_card = ({card}) => {
    return (
        <div className="container">
            <div className="row gx-5 justify-content-between">
                {card.map((item, index) => (
                    <div key={index} className="col-lg-4 col-md-6 my-3">
                        <Recipe_card image={item.image} title={item.title} name={item.name} avatar={item.avatar} count={item.count} cals={item.cals}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Row_card;






