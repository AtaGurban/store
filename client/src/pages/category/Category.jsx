import React, { useEffect, useState, useContext } from "react";
import { fetchDevices } from "../../http/deviceAPI";
import ProductItemSearch from "../../components/ProductItemSearch";
import "./category.css";
import { useParams } from "react-router-dom";
import { Accordion, Card, Image, Spinner } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const Category = observer(() => {
  const params = useParams();
  const [queryProduct, setQueryProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [reqTitle, setReqTitle] = useState("");
  const [reqValue, setReqValue] = useState("");
  const [priceFilteer, setPriceFilteer] = useState([0, 100000]);
  const [filteerBrand, setFilteerBrand] = useState([]);
  const [deviceInfoState, setDeviceInfoState] = useState({});
  const [productSort, setProductSort] = useState(null);
  const { brand, type } = useContext(Context);
  let deviceInfo = {};
  let categoryNumbers = type.Category[0];

  useEffect(async () => {
    let currentCategory = categoryNumbers.filter((i) => {
      return i.id == params.id;
    })[0];
    for (let key in currentCategory) {
      if (currentCategory[key]) {
        setReqTitle(key);
        setReqValue(currentCategory[key]);
      }
    }
    if (reqTitle && reqValue) {
      await fetchDevices(`?${reqTitle}=${reqValue}`)
        .then((data) => setQueryProduct(data))
        .finally(() => setLoading(false));
    }
  }, [reqTitle, reqValue, params]);

  useEffect(async () => {
    if (filteerBrand.length !== 0) {
      await fetchDevices(
        `?${reqTitle}=${reqValue}&brandId=${filteerBrand.join("%")}`
      )
        .then((data) => setQueryProduct(data))
        .finally(() => setLoading(false));
    } else {
      await fetchDevices(`?${reqTitle}=${reqValue}`)
        .then((data) => setQueryProduct(data))
        .finally(() => setLoading(false));
    }
  }, [filteerBrand]);

  useEffect(() => {}, [queryProduct]);

  console.log(queryProduct);

  queryProduct.rows?.map((i) => {
    i.subDevice?.map((j) => {
      j.info?.map((k) => {
        let obj = {}
        // setDeviceInfoState(()=>deviceInfoState[k.title] = [])
        deviceInfo[k.title] = new Set();
      });
    });
  });

  queryProduct.rows?.map((i) => {
    i.subDevice?.map((j) => {
      j.info?.map((k) => {
        deviceInfo[k.title].add(k.description);
      });
    });
  });

  const setToArr = (set) => {
    let arr = [];
    for (let value of set) arr.push(value);
    return arr;
  };

  console.log(deviceInfoState);
  // useEffect(() => {
  //   setBodyFilteerState(obj);
  // }, []);

  // useEffect(() => {
  //   let priceFilteerArr = products.filter(
  //     (item) => item.price[0] > priceFilteer[0] && item.price[0] < priceFilteer[1]
  //   );
  //   let filteerBrandArr = filteerBrandFunc();
  //   var priceAndBrandFilteerArr = intersectionTwoArray(
  //     priceFilteerArr,
  //     filteerBrandArr,
  //     queryProduct
  //   );
  //   setQueryProduct(
  //     intersectionTwoArray(
  //       priceAndBrandFilteerArr,
  //       bodyFilteerProduct,
  //       queryProduct
  //     )
  //   );
  // }, [priceFilteer, filteerBrand, bodyFilteerProduct]);

  const priceFilteerFunc = (value) => {
    setPriceFilteer((priceFilteer) => (priceFilteer = value));
  };


  // const productSortFunc = (value) => {
  //   if (value != "null") {
  //     setProductSort(value);
  //     productSort
  //       ? setQueryProduct([...queryProduct].sort((a, b) => b.price - a.price))
  //       : setQueryProduct([...queryProduct].sort((a, b) => a.price - b.price));
  //   }
  // };

  const pushArrayBrand = (value, id) => {
    value.classList.toggle("active-check");
    let boolIndex = value.classList.contains("active-check");
    if (!boolIndex) {
      setFilteerBrand(() => {
        return filteerBrand.filter((item) => {
          return item !== id;
        });
      });
    } else setFilteerBrand([...filteerBrand, id]);
  };

  // const filteerBrandFunc = () => {
  //   let arr = [];
  //   if (filteerBrand.length === 0) {
  //     return products;
  //   }
  //   filteerBrand.map((brandItem) => {
  //     products.map((product) => {
  //       if (brandItem === brand.Brands[product.brandId].name) {
  //         arr.push(product);
  //       }
  //     });
  //   });
  //   return arr;
  // };

  // const intersectionTwoArray = (a, b, c) => {
  //   if (a.length == 0 && b.length == 0) {
  //     return b;
  //   }
  //   // console.log(a, b);
  //   if (a.length === 0) {
  //     return a;
  //   }

  //   if (b.length === 0) {
  //     return a;
  //   }
  //   let result = [];
  //   a.map((itemOne) => {
  //     b.map((itemTwo) => {
  //       if (itemOne === itemTwo) {
  //         result.push(itemOne);
  //       }
  //     });
  //   });

  //   return result;
  // };

  // const bodyFilteerFunc = () => {
  //   let bodyTypeSet = new Set();
  //   products.map((product) => {
  //     for (let key in product.body) {
  //       bodyTypeSet.add(key);
  //     }
  //   });

  //   let bodyInfo = [];
  //   bodyTypeSet.forEach((value) => {
  //     let set = new Set();
  //     let arr = [];
  //     products.map((product) => {
  //       if (product.body[value]) {
  //         Array.isArray(product.body[value]) ? product.body[value].map(item => set.add(item)) : set.add(product.body[value]);
  //       }
  //     });
  //     // console.log(set);
  //     set.forEach((value) => {
  //       arr.push(value);
  //     });
  //     bodyInfo.push(arr);
  //   });
  //   let bodyType = [];
  //   bodyTypeSet.forEach((value) => {
  //     bodyType.push(value);
  //   });

  //   return { bodyType, bodyInfo };
  // };

  // let bodyFilteer = bodyFilteerFunc();

  // bodyFilteer.bodyType.map((item) => {
  //   obj[item] = null;
  // });

  // const bodyFilteerFuncTwo = (element, typeFilteer, value) => {
  //   element.classList.toggle("active-check");
  //   let boolIndex = element.classList.contains("active-check");
  //   let obj = bodyFilteerState;

  //   if (!boolIndex) {
  //     if (!Array.isArray(obj[typeFilteer])) {
  //       obj[typeFilteer] = null;
  //     } else {
  //       obj[typeFilteer] = obj[typeFilteer].filter((item) => {
  //         return item !== value;
  //       });
  //     }
  //   } else {
  //     if (!Array.isArray(obj[typeFilteer])) {
  //       obj[typeFilteer] = [value];
  //     } else {
  //       obj[typeFilteer].push(value);
  //     }
  //   }

  //   setBodyFilteerState(obj);
  //   let arr = [];
  //   for (let key in bodyFilteerState) {
  //     if (bodyFilteerState[key]) {
  //       products.map((product) => {
  //         bodyFilteerState[key].map((item) => {
  //           if (product.body[key] == item && !arr.includes(product)) {
  //             arr.push(product);
  //           }
  //         });
  //       });
  //     }
  //   }

  //   setBodyFilteerProduct(arr);
  //   // console.log(arr);
  // };

  // useEffect(()=>{
  //   productSort ? setQueryProduct([...queryProduct].sort((a, b) => b.price - a.price )) :  setQueryProduct([...queryProduct].sort((a, b) => a.price - b.price ))
  //   console.log(queryProduct);
  // }, [priceFilteer, filteerBrand, bodyFilteerProduct])

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
  }

  return (
    <div className="container row mx-auto mt-5">
      <div className="col-3  px-3 py-3 mt-5 product-feelteer">
        {/* <h4>Filtirle</h4> */}
        <div>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Baha</Accordion.Header>
              <Accordion.Body>
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    type="radio"
                    name="product-price"
                    value={[0, 100000]}
                    onChange={(e) => priceFilteerFunc([0, 100000])}
                  />
                  Hemmesi
                </p>
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    type="radio"
                    name="product-price"
                    value={[0, 1000]}
                    onChange={(e) => priceFilteerFunc([0, 1000])}
                  />
                  0 tmt - 1000 tmt
                </p>
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    type="radio"
                    name="product-price"
                    value={[1000, 5000]}
                    onChange={(e) => priceFilteerFunc([1000, 5000])}
                  />
                  1000 tmt - 5000 tmt
                </p>
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    type="radio"
                    name="product-price"
                    value={[5000, 10000]}
                    onChange={(e) => priceFilteerFunc([5000, 10000])}
                  />
                  5000 tmt - 10000 tmt
                </p>
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    type="radio"
                    name="product-price"
                    value={[10000, 20000]}
                    onChange={(e) => priceFilteerFunc([10000, 20000])}
                  />
                  10000 tmt - 20000 tmt
                </p>
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    type="radio"
                    name="product-price"
                    value={[20000, 100000]}
                    onChange={(e) => priceFilteerFunc([20000, 100000])}
                  />
                  20000 tmt - 100000 tmt
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* <Accordion className="mt-1" defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Brendler</Accordion.Header>
              <Accordion.Body>
                {brand.Brands.map((brand) => (
                  <p key={brand.id} className="mb-2">
                    <input
                      className="me-3 form-check-input"
                      type="checkbox"
                      name="product-price"
                      value={brand.name}
                      onChange={(e) => pushArrayBrand(e.target)}
                    />
                    {brand.name}
                  </p>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
          {Object.keys(deviceInfo).map((i) => (
            <Accordion
              key={i}
              className="mt-1"
              defaultActiveKey={["0"]}
              alwaysOpen
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>{i}</Accordion.Header>
                <Accordion.Body>
                  {setToArr(deviceInfo[i]).sort((a, b)=> parseInt(a) - parseInt(b)).map((item) => (
                    <p key={item} className="mb-2">
                      <input
                        className="me-3 form-check-input"
                        type="checkbox"
                        name={item}
                        value={item}
                        // onChange={(e) =>
                        //   setDeviceInfoState((deviceInfoState) =>
                        //      {...deviceInfoState}
                        //   )
                        // }
                      />
                      {item}
                    </p>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
          <div className="filter-btn mt-3 d-block text-end">
            <button className="btn btn-warning ">Gözle</button>
          </div>
        </div>
      </div>
      <div className="col-9">
        {/* <div className="d-block" style={{textAlign: 'center'}}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          maxLength="25"
          className="category-search "
          type="text"
          placeholder="Gozleg..."
        /></div>   */}
        <div className="row">
          {brand.Brands[0].map((brand) => (
            <Card
              style={{ height: 50 }}
              key={brand.id}
              className="m-2 col-2"
              border={filteerBrand.includes(brand.id) ? "danger" : "light"}
            >
              <Image
                onClick={(e) => pushArrayBrand(e.target, brand.id)}
                alt={brand.name}
                className="p-1"
                width={"100%"}
                height="100%"
                src={`${process.env.REACT_APP_API_URL}/${brand.img}`}
              />
            </Card>
          ))}
        </div>

        {/* <div className="product-sort mb-3">
          <select
            onChange={(e) => productSortFunc(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option value={"null"}>Tertipleme</option>
            <option value={"false"}>Arzandan gymmada</option>
            <option value={"true"}>Gymmatdan arzana</option>
          </select>
        </div> */}
        <hr />
        <div className="d-flex category-products">
          {queryProduct?.rows?.map((item) => (
            <ProductItemSearch product={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Category;
