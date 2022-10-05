import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "./store";

const ProductUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [numberInStock, setNumberInStock] = useState(0);
  const [error, setError] = useState({});
  const [rating, setRating] = useState("");

  const ratings = ["GREAT", "OK", "MEH"];

  const update = async (ev) => {
    ev.preventDefault();
    const updated = { id, name, price, numberInStock, rating };
    try {
      await dispatch(updateProduct(updated, navigate));
    } catch (ex) {
      setError(ex.response.data);
    }
  };
  let messages = [];
  if (error.errors) {
    messages = error.errors.map((e) => e.message);
  }

  useEffect(() => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setNumberInStock(product.numberInStock);
      setRating(product.rating);
    }
  }, [products, id]);

  return (
    <form onSubmit={update}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(ev) => setName(ev.target.name)} />
      </div>
      <div>
        <label>Price</label>
        <input value={price} onChange={(ev) => setPrice(ev.target.value)} />
      </div>
      <div>
        <label>Number</label>
        <input value={numberInStock} onChange={(ev) => setNumberInStock(ev.target.value)} />
      </div>
      <div>
        <label>Rating</label>
        <select value={rating} onChange={(ev) => setRating(ev.target.value)}>
					<option value=''>---select a rating ----</option>
				{
					ratings.map(rating => {
						return (
							<option key={rating}>{rating}</option>
						)
					})
				}
				</select>
      </div>
			<button>Update</button>
    </form>
  );
};


export default ProductUpdate