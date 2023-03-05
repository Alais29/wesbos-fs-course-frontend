import { useMutation } from '@apollo/client';
import React from 'react';
import useForm from '../lib/useForm';
import { ALL_PRODUCTS_QUERY } from '../queries/ALL_PRODUCTS_QUERY';
import { CREATE_PRODUCT_MUTATION } from '../queries/CREATE_PRODUCT_MUTATION';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const CreateProduct = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'nice shoes',
    price: 34234,
    description: 'These are the best shoes',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    { variables: inputs, refetchQueries: [{ query: ALL_PRODUCTS_QUERY }] }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the input fields to the backend
        await createProduct();
        clearForm();
      }}
    >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <button type="submit">+ Add Product</button>
    </Form>
  );
};

export default CreateProduct;
