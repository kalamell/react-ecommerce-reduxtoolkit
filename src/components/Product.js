import React from 'react';
import { useDispatch  } from 'react-redux';

import { Link } from 'react-router-dom';
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import { addToCart, getTotal, getAmount } from '../store/cartSlice'

const Product = ( { product }) => {
  const dispatch = useDispatch();
  const { id, image, category, title, price}  = product;

  const handleAddToCart = (product, id) => {
    dispatch(addToCart({'product': product, 'id': id}))

    dispatch(getAmount());
    dispatch(getTotal());
  }
  
  return (
    <div>
      <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition'>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <img className='max-h-[160px] group-hover:scale-110 transition duration-300' src={image} alt={title}/>
          </div>
        </div>
        <div className='absolute top-6 -right-11  p-2 flex flex-col 
          itesm-center justify-center gap-y-2 opacity-0 
          group-hover:right-5
          group-hover:opacity-100 transition-all duration-300'>
          <button onClick={() => handleAddToCart(product, id)}>
            <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
              <BsPlus className='text-3xl' />
            </div>
          </button>
          <Link to={`/product/${id}`} className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow -xl'>
            <BsEyeFill />
          </Link>
        </div>
      </div>

      <div>
        <div className='text-sm capitalize text-gray-500'>{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className='font-semibold mb-1'>{title}</h2>
        </Link>
        <div className='font-semibold'>{price}</div>
      </div>
    </div>
  )
};

export default Product;
