import React from "react";

const Products = ({ data }) => {
  return (
      <div>
          <h1>Your personalization is:</h1>
          <div className='box'>
              {data && data.map((item, index) =>
                  <div key={index}>
                      <img src={item.url} alt={item.name}/>
                      <p/>
                      {item.name} - {item.price}
                  </div>
              )}
          </div>
      </div>
  )
};

export default Products;