import React, { useContext, useDebugValue, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts} from '../store/productsSlice';
import { addToCart, getAmount, getTotal } from '../store/cartSlice';
const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCart = (product, id) => {
    dispatch(addToCart({'product': product, 'id': id}))

    dispatch(getAmount());
    dispatch(getTotal());
  }


  const products = useSelector((state) => state.products.products);
  const product = products.find((item) => {
    return item.id === parseInt(id)
  });

  if (!product) {
    return (
      <section className='h-screen flex justify-center items-center'>
        Loading...
      </section>
    )
  }
  
  const { title, price, description, image} = product;

  return (
    <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-w-[200px] lg:max-w-sm' src={image} alt='' />
          </div>
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{title}</h1>
            <div className='text-xl text-red-500 font-medium mb-6'>
              $ {price}
            </div>
            <p className='mb-8'>{description}</p>
            <button onClick={() => handleAddToCart(product, product.id)}  className="bg-primary py-4 px-8 text-white">Add to Cart</button>
          </div>
        </div>
        
      </div>
    </section>

  )
};

export default ProductDetails;
