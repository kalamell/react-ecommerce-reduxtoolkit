import React, { useContext, useEffect, useState } from 'react';

import {BsBag} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.svg';

import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../store/cartSlice';

const Header = () => {

  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);

  const itemAmount = useSelector((state) => state.cart.amount);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
    })

  });

  const handleOpenCart = () => {
    dispatch(openCart({open: true}));

  }

  return (
    <header className={`${isActive ? 'bg-white py-2 shadow-md' : 'bg-none'} fixed w-full z-10 transition-all`}>
      <div className='container mx-auto py-2 px-2 flex items-center justify-between h-full'>
        <Link to={'/'}>
          <div className=''>
            <h1 className='font-semibold '>BUNDIT'S SHOP (RDK Version)</h1>
          </div>
        </Link>
        <div onClick={() => handleOpenCart()}
        className='cursor-pointer flex relative'
        >
          <BsBag className='text-2xl' />
          <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white 
          rounded-full flex justify-center items-center
          '>{itemAmount}</div>
        </div>
      </div>
    </header>
  )
};

export default Header;
