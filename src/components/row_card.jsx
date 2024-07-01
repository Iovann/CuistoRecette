import React, { useState, useEffect } from 'react';
import Recipe_card from './recipe_card';

const Row_card = ({card}) => {
    return (
        <div className="container">
            <div className="row gx-5 justify-content-center justify-content-lg-evenly justify-content-xl-start">
                {card.map((item, index) => (
                    <div key={index} className=" col-lg-5 col-xl-4 col-md-6 col-sm-9 my-3">
                        <Recipe_card id={item.id} image={item.photo} title={item.title} name={item.createdBy.name} avatar={item.createdBy.photoURL} count={item.rating} cals={item.cals}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Row_card;






