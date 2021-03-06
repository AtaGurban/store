import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "..";
import LikeProduct from "./LikeProduct";
import { Card } from "react-bootstrap";
const ProductItemSearch = ({ product }) => {
  const { user } = useContext(Context);
  const [currentSubDevice, setCurrentSubDevice] = useState(
    product?.subDevice[0]
  );
  const [clickBasket, setClickBasket] = useState(false);

  const clickBasketPush = () => {
    if (!clickBasket) {
      user.setBasketProd(product);
    }

    setClickBasket(true);
  };

  return (
    <div className="product-item-search mb-3">
      <div className="product-card-search row position-relative bg-white">
        <div className="product-image-icon-search"></div>
        <div className=" product-image-search p-1 col-3">
          <img
            src={`${process.env.REACT_APP_API_URL}/${product.deviceImg[0].name}`}
          />
        </div>

        <div className="product-info p-3 col-9">
          <div className="product-name my-2">
            <Link to={`/product/detail/${product.id}`}>
              <h4 className="text-uppercase c-bold">{product.name}</h4>
            </Link>
          </div>
          <div className="row">
            {product?.subDevice.map((item) => (
              <Card
                key={item.id}
                onClick={(e) => setCurrentSubDevice(item)}
                border={item.id === currentSubDevice.id ? "danger" : "light"}
                className="col-3 mx-2 p-2"
              >
                {item?.info.map((i) => (
                  <div key={i.id} className="c-bold">
                    {i.title}: {i.description}
                  </div>
                ))}
              </Card>
            ))}
          </div>
          <div className="product-rate-price d-flex my-1 mt-3">
            <div className="product-rate-com mt-5 d-flex">
              <div href="#" className="product-rate-search me-3">
                <div>
                  {product.rating >= 1 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating >= 2 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating >= 3 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating >= 4 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating >= 5 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  <span className="ms-3">
                    {product?.rating?.length} sapar baha berildi
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex col-4">
              <LikeProduct product={product} />
              <div className="product-price-search">
                <p>{currentSubDevice !== undefined ? currentSubDevice.price : product?.price} TMT</p>
                {clickBasket ? (
                  <button disabled className="btn btn-danger  p-1">
                    <i className="fas fa-shopping-basket"></i>
                    Sebetde
                  </button>
                ) : (
                  <button
                    onClick={(e) => clickBasketPush()}
                    className="btn btn-danger  p-1"
                  >
                    <i className="fas fa-shopping-basket me-2"></i>
                    Sebede go??
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemSearch;
