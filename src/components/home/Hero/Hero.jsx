import React from "react";
import "./hero.css"
import Heading from "../../common/Heading";

const Hero = () => {
  return (
      <>
          <section className='hero'>
              <div className='container'>
                  <Heading title='Manage Your Fridge' subtitle='Add some ingredients in your fridge'/>
                  <form className="flex">
                      <div className="box">
                          <span>Name</span>
                          <input type='text' placeholder='Name' />
                      </div>
                      <div className="box">
                          <span>Category</span>
                          <input type='text' placeholder='Category' />
                      </div>
                      <div className="box">
                          <span>Amount</span>
                          <input type='text' placeholder='Amount' />
                      </div>
                      <div className='box'>
                          <span>Date</span>
                          <input type='text' placeholder='Date' />
                      </div>
                      <botton className='btn'>
                          <i className='fa fa-plus'></i>Add
                      </botton>
                  </form>
              </div>
          </section>
      </>
  )
}
export default Hero