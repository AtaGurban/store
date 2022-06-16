import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Spinner, Card } from "react-bootstrap";
import ProductImgGroup from "../components/ProductImgGroup";
import { fetchOneDevice } from "../http/deviceAPI";
import { Context } from "..";
import LikeProduct from "../components/LikeProduct";
import ProductPageTab from "../components/ProductPageTab";

const ProductPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [currentSubDevice, setCurrentSubDevice] = useState({});
  const { brand } = useContext(Context);
  const [pageProduct, setPageProduct] = useState({});
  const [productBrand, setProductBrand] = useState({});
  const [productImg, setProductImg] = useState("");
  const [tabDescription, setTabDescription] = useState('')
  const [tabMoreInfo, setTabMoreInfo] = useState([])

  const littleImageFunc = (image) => {
    setProductImg(image);
  };

  useEffect(async () => {
    await fetchOneDevice(params.id)
      .then((data) => {
        setPageProduct(data);
        setTabDescription(data.device_description[0].big)
        setTabMoreInfo(data.more_info)
        setProductImg(data.deviceImg[0].name);
        setProductBrand(
          brand.Brands[0].filter((i) => {
            return i.id === data.brandId;
          })[0]
        );
        setCurrentSubDevice(data.subDevice[0]);
      })
      .finally(() => setLoading(false));
  }, []);


  if (loading) {
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
        className="d-flex"
      >
        <Spinner animation={"grow"} />
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="product-box p-3 mt-4 row">
          <div className="product-box-img col-6">
            {/* <div className="row align-items-start py-3 justify-content-between">
              <div className="text-left col-8">
                <h1 style={{ fontSize: "1.3rem", fontWeight: "600" }}>
                  {pageProduct.name}
                </h1>
              </div>
            </div> */}
            <div className="position-relative">
              <div className="position-absolute like-product-page text-center">
                <LikeProduct />
                {/* <span>Halanlaryma goş</span> */}
              </div>
              <div className="mb-1 p-2 big-img">
                <img
                  width="100%"
                  src={`${process.env.REACT_APP_API_URL}/${productImg}`}
                />
              </div>
            </div>
          </div>
          <div className="col-6 p-3 bg-white">
            <div className="d-flex justify-content-between mb-4">
              <div
                // style={{ height: "10vh" }}
                className="product-page-name col-12"
              >
                <h2 className="font-weight-normal mt-2 ms-2">
                  {pageProduct.name}
                </h2>
              </div>
            </div>
            <div className="product-page-brand ms-2 d-flex justify-content-between">
              <div className="product-page-brand mb-3">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${productBrand?.img}`}
                  alt=""
                />
              </div>
              <div className="product-page-price-basket">
                <div className="product-page-price">
                  <h2 className="c-bold fs-1 text-end me-5">
                    {currentSubDevice !== undefined
                      ? currentSubDevice.price
                      : pageProduct?.price}{" "}
                    TMT
                  </h2>
                </div>
              </div>
            </div>
            <div className="row mt-5 ms-3">
              {pageProduct?.subDevice.map((item) => (
                <Card
                  key={item.id}
                  onClick={(e) => setCurrentSubDevice(item)}
                  border={item.id === currentSubDevice.id ? "danger" : "light"}
                  className="col-4 mx-2 p-2"
                >
                  {item?.info.map((i) => (
                    <div key={i.id} className="c-bold">
                      {i.title}: {i.description}
                    </div>
                  ))}
                </Card>
              ))}
            </div>
            <div className="little-desc">
              <h3 className="text-start c-bold mb-3">Gysga beýany</h3>
              <p className="text-start fw-normal">
                {pageProduct?.device_description[0]?.little}
              </p>
            </div>
            <div className="product-page-basket mt-4 w-75 mx-auto">
              <button
                // onClick={(e) => clickBasketPush()}
                className="btn btn-danger bg-red p-1 product-page-basket"
              >
                <i className="fas fa-shopping-basket me-2"></i>
                Sebede goş
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className=" d-flex w-50 justify-content-center">
            {pageProduct.deviceImg?.map((item, index) => (
              <div
                className=" little-image"
                style={{ width: "15%", height: "50px" }}
                key={index}
              >
                <img
                  onMouseOver={(e) => littleImageFunc(item.name)}
                  src={`${process.env.REACT_APP_API_URL}/${item.name}`}
                  style={
                    productImg == item.name
                      ? { borderBottom: "2px solid red" }
                      : {}
                  }
                  className="p-1"
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{minHeight:'400px'}} className="pb-5 d-block text-center">
          <ProductPageTab className='' tabDescription={tabDescription} tabMoreInfo={tabMoreInfo}/>
        </div>
      </div>
    );
  }
};

export default ProductPage;
