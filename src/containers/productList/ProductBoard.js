import React, { useState, useEffect } from 'react';
import querystring from 'querystring';
import axios from 'axios';

import ProductList from 'components/productList/ProductList';
import 'containers/productList/ProductBoard.css';
import SaleRegistrationButton from 'components/registerProduct/SaleRegistrationButton';
import Pagination from 'components/productList/Pagination';

const { REACT_APP_API_URI } = process.env;

const ProductBoard = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(1);

  const limit = 12; // 한 페이지에 보여줄 상품 갯수
  const offset = querystring.parse(window.location.search)['?offset'] || 0; // 페이지 번호

  useEffect(() => {
    axios
      .get(
        `${REACT_APP_API_URI}/api/v1/product/list?offset=${offset}&limit=${limit}`,
      )
      .then((response) => {
        setTotalCount(response.data.data.page.totalCount);
        setProducts(response.data.data.products);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, [offset]);
  return (
    <>
      <SaleRegistrationButton products={products} setProducts={setProducts} />
      <div className="row">
        <div className="row center">
          {products.map((product) => (
            <ProductList key={product.id} product={product}>
              {products.profileUrl}
            </ProductList>
          ))}
        </div>
      </div>
      <Pagination productsperpage={limit} totalPosts={totalCount} />
    </>
  );
};

export default ProductBoard;