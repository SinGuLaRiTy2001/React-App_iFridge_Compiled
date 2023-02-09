import React from "react";
import "./Dish.css"
import { dish } from "../Data/Data";
import { dish_like } from "../Data/Data";

const Dish = () => {
    return (
        <>
            <section className='Dish'>
                <h1>You may try these</h1>
                <items className='dish'>
                    {
                        dish_like.map((item, index) => (
                            <div className='background'>
                                <img className='dish_pic' src={item.img} />
                                <a href={'/Recipe?r=' + item.name} target='_blank'>
                                    <img className='sign_pic' src='./image/recipe_yellow.svg' />
                                    <div className='container_dish'>
                                        <h2>{item.name}</h2>
                                        <p className='dish_sign'>
                                            <i className='fa fa-cube'></i> {item.description}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        ))
                    }
                </items>

                <items className='dish'>
                    {
                        dish.map((item, index) => (
                            <div className='background'>
                                <img className='dish_pic' src={item.img} />
                                <a href={'/Recipe?r=' + item.name} target='_blank'>
                                    <img className='sign_pic' src='./image/recipe_green.svg' />
                                    <div className='container_dish'>
                                        <h2>{item.name}</h2>
                                        <p className='dish_sign'>
                                            <i className='fa fa-cube'></i> {item.description}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        ))
                    }
                </items>

            </section>
        </>
    )
}

export default Dish