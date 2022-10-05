import React from 'react';
import { Link } from 'react-router-dom';

const _Products = ({ products })=> {

  return (
    <ul>
      {
        products.map( product => {
          return (
            <li key={ product.id }>
              { product.name }
              (${ product.price })
              <label>{ product.rating }</label>
              <br />
              Number In Stock { product.numberInStock }
              <Link to={`/products/${product.id}`}>Edit</Link>
            </li>
          );
        })
      }
    </ul>
  );
};

export default _Products;
