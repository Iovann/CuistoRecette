import React from 'react'
import { Carousel, initMDB } from "mdb-ui-kit";
import "../index.css"
const HeroAcceuil = ({infos}) => {
    initMDB({ Carousel });

    return (
        <div id="carouselBasicExample" className="carousel slide carousel-fade carousel-container" data-mdb-ride="carousel" data-mdb-carousel-init>
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-mdb-target="#carouselBasicExample"
                    data-mdb-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-mdb-target="#carouselBasicExample"
                    data-mdb-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-mdb-target="#carouselBasicExample"
                    data-mdb-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active image-container">
                    <img src="./assets/images/banner_9.jpeg" className="d-block w-100 carousel-container" alt="Sunset Over the City" />
                    <div className="carousel-caption d-none d-md-block carousel-center">
                        <h5 className='display-3'>Bienvenue {infos}</h5>
                        <p className='h1 fw-bold'>Prêt pour explorer de nouvelles recettes ?</p>
                    </div>
                </div>

                <div className="carousel-item image-container">
                    <img src="./assets/images/banner_4.jpeg" className="d-block w-100 carousel-container" alt="Canyon at Nigh" />
                    <div className="carousel-caption d-none d-md-block carousel-center">
                        <h5 className='display-3'>Bienvenue {infos}</h5>
                        <p className='h1 fw-bold'>Prêt pour explorer de nouvelles recettes ?</p>
                    </div>
                </div>

                <div className="carousel-item image-container">
                    <img src="./assets/images/banner_9.jpg" className="d-block w-100 carousel-container" alt="Cliff Above a Stormy Sea" />
                    <div className="carousel-caption d-none d-md-block carousel-center">
                        <h5 className='display-3'>Bienvenue {infos}</h5>
                        <p className='h1 fw-bold'>Prêt pour explorer de nouvelles recettes ?</p>
                    </div>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    )
}

export default HeroAcceuil
