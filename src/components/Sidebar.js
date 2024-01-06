import React, { useContext, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import {IoMdArrowForward} from 'react-icons/io';

import { FiTrash2} from 'react-icons/fi';

import CartItem from '../components/CartItem';

import { useSelector, useDispatch } from 'react-redux';
import { openCart, emptyCart, getAmount, getTotal } from '../store/cartSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  
  const isOpen = useSelector((state) => state.cart.cartopen);

  const cart = useSelector((state) => state.cart.cart);

  const itemAmount = useSelector((state) => state.cart.amount);
  const total = useSelector((state) => state.cart.total);

  
  
  const handleOpenCart = () => {
    dispatch(openCart({open: false}));
  }

  const handleRemoveCart = () => {
    dispatch(emptyCart());
    dispatch(getAmount());
    dispatch(getTotal());
  }

  return (
  <div className={`${isOpen ? 'right-0': '-right-full'} w-full bg-white fixed top-0 h-full
  shadow-2xl md:w-[35vw] xl:max-w-[30vw]
  transition-all duration-300 z-20 px-2  lg:px-[20px] `}>
    <div className='flex-start flex items-center justify-between py-6 border-b'>
      <div className='uppercase text-sm font-semibold'>Shopping Bag ({itemAmount})</div>
      <div onClick={handleOpenCart} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
        <IoMdArrowForward className='text-2xl'/>
      </div>
    </div>
    <div className='overflow-y-auto overflow-x-hidden max-h-[500px]'>
      {
        
        cart.length == 0 &&
        <div className='w-full h-[200px] border border-dotted border-blue-300 py-4 px-4 flex justify-center items-center'>
          <h2>Cart is Empty</h2>

        </div>
        
      }
      {
        cart.map(item => {
          return <CartItem item={item} key={item.id} />
        })
        
      }
    </div>
    <div className='flex flex-col gap-y-3 py-4 mt-4'>
      <div className='flex w-full justify-between pl-2 items-center'>
        <div className='uppercase font-semibold'>
          <span className='mr-2'>Total: </span> $ {total.toFixed(0)}</div>
        <div onClick={handleRemoveCart} className='cursor-pointer py-4 bg-red-500 text-white w-12 h-2 flex justify-center items-center text-xl'><FiTrash2 /></div>
      </div>
      <Link to={'/'} className='bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium'>View cart</Link>
      <Link to={'/'} className='bg-primary flex p-4 justify-center items-center w-full font-medium text-white'>Checkout</Link>
    </div>
  </div>
  );
};

export default Sidebar;
