import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import { formatMoney } from '../lib/formatMoney';

const Product = ({ product }) => (
  <ItemStyles>
    <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
    <Title>
      <Link href={`/product/${product.id}`}>{product.name}</Link>
    </Title>
    <PriceTag>{formatMoney(product.price)}</PriceTag>
    <p>{product.description}</p>
    {/* TODO: Add buttons to edit and delete */}
  </ItemStyles>
);

Product.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.shape({
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string,
      }),
    }),
    price: PropTypes.number,
  }),
};

export default Product;
