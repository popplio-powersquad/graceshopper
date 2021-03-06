import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMeme } from '../../store/memesReducer';

function CreateMemeForm(props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
    stockQuantity: 0,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMeme(formData));
  };

  return (
    <div className="create-edit">
      <form id="create-meme" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0.01"
          step=".01"
        />

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <label htmlFor="stockQuantity">Stock Quantity:</label>
        <input
          type="number"
          name="stockQuantity"
          placeholder="Qty"
          step="1"
          value={formData.stockQuantity}
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateMemeForm;
