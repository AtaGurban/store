import { React, useContext } from "react";
import { Carousel } from "react-bootstrap";
import { Context } from "..";
const CarouselShop = () => {
  const { banner } = useContext(Context);

  const sliders = banner.Banners[0].filter((item) => {
    return item.name === "Slider";
  });

  return (
    <Carousel fade className="">
      {sliders.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            style={{ height: 400, }}
            className="d-block w-100"
            src={`${process.env.REACT_APP_API_URL}/${item.img}`} 
            alt={item.name}
          />
        </Carousel.Item>
      ))}
      {/* <Carousel.Item>
        <img
          style={{ height: 400 }}
          className="d-block w-100"
          src="https://cms.mvideo.ru/magnoliaPublic/dam/jcr:425e1f1d-326f-4338-bb6b-3e4381ecb3ed"
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: 400 }}
          className="d-block w-100"
          src="https://cms.mvideo.ru/magnoliaPublic/dam/jcr:e4c2fa05-7319-4b2e-82e2-4bea3a8110c0"
          alt="Second slide"
        />


      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: 400 }}
          className="d-block w-100"
          src="https://cms.mvideo.ru/magnoliaPublic/dam/jcr:4f75f103-1d7d-4117-9338-0354953261ef"
          alt="Third slide"
        />


      </Carousel.Item> */}
    </Carousel>
  );
};

export default CarouselShop;
