import { React, useContext, useState, useEffect } from "react";
import CarouselShop from "../components/CarouselShop";
import SlideProduct from "../components/SlideProduct";
import { Context } from "..";
import { fetchDevices } from "../http/deviceAPI";


const Shop = () => {
  const { banner, device } = useContext(Context);
  const [devices, setDevices] = useState(device.Devices[0])
  // const [loading, setLoading] = useState(true)
  const banners = banner.Banners[0].filter((item) => {
    return item.name === "Banner";
  });

  // useEffect(async () => {
  //   await fetchDevices('?').then(data => setDevices(() => data)).finally(() => setLoading(false))

  // }, [])


  return (
    <div className="">
      <CarouselShop className="container-fluid" />
      <SlideProduct title={"Saýlanan harytlar"} products={devices} />
      <div className="banner container-fluid row my-3 mx-auto">
        {banners.map((item) => (
          <div key={item.id} className="slide-bottom-banner col-4">
            <a href="#" className="banner-link">
              <img src={`${process.env.REACT_APP_API_URL}/${item.img}`} alt={item.name} />
            </a>
          </div>
        ))}
      </div>

      <div className="home-help container">
        <a href="#">
          <i className="fas fa-question-circle"></i>
          Sargyt nädip etmeli?
        </a>
      </div>
    </div>
  );
};

export default Shop;
