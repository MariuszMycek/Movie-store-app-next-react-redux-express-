import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const productCardCls = css`
  width: 500px;
  display: flex;

  padding: 10px;

  .imgWrapper {
    ${'' /* margin-right: 15px; */}
  }
  h2,
  h3 {
    color: #ffffff;
  }
  h3 {
    font-size: 16px;
    margin-bottom: 15px;
  }
  .descWrapper {
    padding: 20px 10px;
    background: #050304;
  }
  .overview {
    font-size: 13px;
    color: rgb(159, 158, 158);
    margin-bottom: 15px;
  }
`;
const ProductCard = ({
  id,
  originalTitle,
  genresData,
  releaseYear,
  posterPath,
  overview,
  price
}) => (
  <div key={id} css={productCardCls}>
    <div className='imgWrapper'>
      <img
        style={{
          width: 240,
          height: 360
        }}
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={originalTitle}
      />
    </div>
    <div className='descWrapper'>
      <div>
        <h2>{originalTitle}</h2>
        <h3>{`${releaseYear}  |  ${genresData
          .toString()
          .replace(/,/g, ',  ')}`}</h3>
        <div className='overview'>{overview}</div>
      </div>
      <div>
        <h2>{`$${price}`}</h2>
      </div>
    </div>
  </div>
);
ProductCard.propTypes = {
  id: PropTypes.number,
  originalTitle: PropTypes.string,
  genresData: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  releaseYear: PropTypes.number,
  posterPath: PropTypes.string,
  overview: PropTypes.string,
  price: PropTypes.number
};
export default ProductCard;
