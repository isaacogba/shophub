import React from 'react'
import { getProducts } from '../data/Product'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const products = getProducts()
  return (
    <div className='page'>
      <div className='home-hero'>
        <h1 className='home-title'>Welcome to Shophub</h1>
        <p className='home-subtitle'>where u discover amazing product</p>
      </div>
      <div className='container'>
         <p className='page-title'>Our product</p>
      <div className='product-grid'>
       { products.map((product) => (
        <ProductCard product={product} key={product.id}/> 
       )) }
      </div>
      </div>
      
    </div>
  )
}

export default Home