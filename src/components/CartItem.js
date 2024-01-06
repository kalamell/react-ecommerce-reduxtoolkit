import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';

import { useDispatch } from 'react-redux';
import { removeFromCart, increseAmount, decreaseAmount, getAmount, getTotal } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const { id, title, image, price, amount} = item;
  const dispatch = useDispatch();


  const handleremoveFromCart = (id) => {
    dispatch(removeFromCart({id}));
    dispatch(getAmount());
    dispatch(getTotal());
  }

  const handleincreseAmount = (id) => {
    dispatch(increseAmount({id}));
    dispatch(getAmount());
    dispatch(getTotal());
    
  }

  const handledecreaseAmount = (id) => {
    dispatch(decreaseAmount({id}));
    dispatch(getAmount());
    dispatch(getTotal());
    
  }

  return (
    <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
      <div className='w-full min-h-[150px] flex items-center gap-x-4'>
        <Link to={`/product/${id}`}>
          <img className='max-w-[80px]' src={image} alt='' />
        </Link>
        <div className='w-full flex flex-col'>
          <div className='flex justify-between mb-2'>
            <Link to={`/product/${id}`} className='text-sm uppercase font-medium 
            max-w-[240px] text-primary hover:underline'>{title}</Link>
          
            <div className='text-xl cursor-pointer' onClick={() => handleremoveFromCart(id)}><IoMdClose className='text-gray-500 hover:text-red-500 transition'/></div>
          </div>

          <div className='flex gap-x-2 h-[36px] text-sm'>
            <div className='flex flex-1 max-w-[100px]  items-center
            h-full border text-primary font-medium'>
              <div className='flex-1 h-full flex justify-center 
              items-center cursor-pointer'
              onClick={() => handledecreaseAmount(id)}
              >
                <IoMdRemove />
              </div>
              <div className='h-full flex justify-center items-center px-2'>{amount}</div>
              <div className='flex-1 h-full flex justify-center 
              items-center cursor-pointer'
              onClick={() => handleincreseAmount(id)}
              >
                <IoMdAdd />
              </div>
            </div>

            <div className='flex-1 flex
            justify-around items-center
            text-gray-400 font-medium'>{price}</div>
            <div className='flex-1 flex
            justify-end items-center
            text-primary font-medium'>{`$ ${parseFloat(price * amount).toFixed(2) }`}</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CartItem;
