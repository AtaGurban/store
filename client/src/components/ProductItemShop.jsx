import { React, useState, useContext, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "..";


const ProductItemShop = ({ product }) => {
  // const rate = (rating) => {
  //   let count = rating.length;
  //   let summ = rating.reduce((acc, num) => acc + num, 0);
  //   let ratingProduct = Math.round(summ / count);

  //   return ratingProduct;
  // };
  // const ratingProd = rate(product.rating);
  const [favouriteProd, setFavouriteProd] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
    favouriteProd
      ? user.setFavoriteProd(product)
      : user.removeFavoriteProd(product);
  }, [favouriteProd]);

  const clickBasketPush = () => {
    if (!clickBasket) {
      user.setBasketProd(product);
    }

    setClickBasket(true);
  };

  const [clickBasket, setClickBasket] = useState(false);

  return (
    <div>
      <div className="product-item mx-2 py-2">
        <Card className="product-card">
          <div className="position-relative product-image mx-auto">
            <Link to={`/product/detail/${product.id}`}>
              <Image className="" src={`${process.env.REACT_APP_API_URL}/${product.deviceImg[0].name}`} />
            </Link>
            <div className="product-image-icon">
              <button
                className="product-image-icon-btn px-1"
                href=""
                onClick={(e) => setFavouriteProd(!favouriteProd)}
              >
                {favouriteProd ? (
                  <i className="fas fa-heart"></i>
                ) : (
                  <i className="far fa-heart"></i>
                )}
              </button>
            </div>
            {/* <LikeProduct/> */}
          </div>

          <div className="product-info px-2 pb-2">
            <div className="product-desc my-2">
              <Link to={`/product/detail/${product.id}`} className="product-rate">
                <div>
                  {product.rating >= 1 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating  >= 2 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating  >= 3 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating  >= 4 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating  >= 5 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                </div>
              </Link>
            </div>
            <div className="product-title mb-2 ">
              <Link to={`/product/detail/${product.id}`}><h5>{product.name}</h5></Link>
              
            </div>

            <div className="product-price row mb-1 mx-auto">
              {clickBasket ? (
                <button
                  disabled
                  className="btn btn-danger p-1"
                >
                  {/* <i className="fas fa-shopping-basket"></i> */}
                  Sebetde
                </button>
              ) : (
                <button
                  onClick={(e) => clickBasketPush()}
                  className="btn btn-danger p-1"
                >
                  {/* <i className="fas fa-shopping-basket"></i> */}
                  Sebede goş
                </button>
              )}

              <p className="">{product.price} TMT</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductItemShop;
