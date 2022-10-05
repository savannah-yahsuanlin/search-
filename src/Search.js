import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import _Products from './_Products';



const Search = () => {
	const {products} = useSelector(state=> state)
	const navigate = useNavigate()
	const {filter} = useParams()
	const filtered = products.filter(product => !filter || product.name.includes(filter))

	return (
		<div>
			<input value={filter || ''} placeholder='filter' onChange={ev => navigate(`/products/search/${ev.target.value}`)}/>
			<_Products products={ filtered } />
		</div>
	)
}

export default Search