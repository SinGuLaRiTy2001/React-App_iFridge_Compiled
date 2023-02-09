import React, { Component } from 'react'
import "./Ingredient.css"
import {meat} from "../Data/Data";
import {vege} from "../Data/Data";
import {frui} from "../Data/Data";

import ReactDOM from 'react-dom';

class Counter extends React.Component {
    state = {
        count: 1
    };
    onAdd() {
        this.setState({
            count: this.state.count + 1
        });
    };
    onSub() {
        this.setState(prevState => {
            return {
                count: prevState.count - 1
            };
        });
    };
    render() {
        return (
            <div>
                <img className='num_edit' src='./image/add.svg' onClick={this.onAdd.bind(this)} />
                <span>{this.state.count}</span>
                <img className='num_edit' src='./image/del.svg' onClick={this.onSub.bind(this)} />
            </div>
        )
    }
}

const Ingredient = () => {
    return (
        <>
            <div className='ingredient_meat'>
                <h1>Meat</h1>
                <items className='meat'>
                    {
                        meat.map((item, index) => (
                            <div className='item_holder'>
                                <div className='content_holder'>
                                    <div className='item_number'>
                                        <Counter />
                                    </div>
                                    <h2>{item.name}</h2>
                                    <p className='date'>{item.date}</p>
                                </div>
                                <img className='ingredient_meat_pic' src={item.img} />
                            </div>
                        ))
                    }
                </items>
            </div>
            <div className='ingredient_meat'>
                <h1>Vegetables</h1>
                <items className='vege'>
                    {
                        vege.map((item, index) => (
                            <div className='item_holder'>
                                <div className='content_holder'>
                                    <div className='item_number'>
                                        <Counter />
                                    </div>
                                    <h2>{item.name}</h2>
                                    <p className='date'>{item.date}</p>
                                </div>
                                <img className='ingredient_meat_pic' src={item.img} />
                            </div>
                        ))
                    }
                </items>
            </div>
            <div className='ingredient_meat'>
                <h1>Fruits</h1>
                <items className='frui'>
                    {
                        frui.map((item, index) => (
                            <div className='item_holder'>
                                <div className='content_holder'>
                                    <div className='item_number'>
                                        <Counter />
                                    </div>
                                    <h2>{item.name}</h2>
                                    <p className='date'>{item.date}</p>
                                </div>
                                <img className='ingredient_meat_pic' src={item.img} />
                            </div>
                        ))
                    }
                </items>
            </div>
        </>
    )
}

export default Ingredient