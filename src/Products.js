import React from 'react';
import { useSelector } from 'react-redux';
import _Products from './_Products';

const Products = () => {
	const { products } = useSelector(state => state)
	return (
		<_Products products={products}/>
	)
}

export default Products;