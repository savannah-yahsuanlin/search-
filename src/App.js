import React, { useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {fetchProducts} from './store';
import Products from './Products';
import ProductUpdate from './ProductUpdate';
import Search from './Search';


const App = ()=> {
  const {orders, products} = useSelector(state=> state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/products'>Products ({ products.length })</Link>
        <Link to='/products/search'>Search</Link>
        <Link to='/orders'>Orders ({ orders.length })</Link>
      </nav>
      <Routes>
        <Route path='/' element={ <div>Home</div> } />
        <Route path='/products' element={ <Products /> } />
        <Route path='/products/:id' element={ <ProductUpdate /> } />
         <Route path='/products/search' element={ <Search /> } />
        <Route path='/products/search/:filter' element={ <Search /> } />
      </Routes>
    </div>
  );
};

export default App;
