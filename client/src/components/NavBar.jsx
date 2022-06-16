import React, { useState, useContext, useEffect } from "react";
import {
  BASKET_ROUTE,
  CATEGORY_ROUTE,
  FAVOURITE_ROUTE,
  SHOP_ROUTE,
} from "../utils/pathConsts";
import { Link } from "react-router-dom";
import ModalNav from "./ModalNav";
import ModalAuth from "./ModalAuth";
import { Context } from "..";
import { observer } from "mobx-react-lite";


const NavBar = observer(() => {
  // const [isLogin, setIsLogin] = useState(false)
  const [link, setLink] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(true);
  const [modalAuth, setModalAuth] = useState(false);
  const { user, type } = useContext(Context);

  let boolMouse = false;
  let boolMouse1 = false;

  const showLink = (item) => {
    let {id} = item
    setTimeout(() => {
      setLink(id);
      if (!boolMouse) {
        setModalVisible(true);
      }
      boolMouse = false;
    }, 400);
  };

  let categoryItems = [...type?.Types[0]]
  let categoryNumbers = type.Category[0]


  const clickCategory = (id)=>{
    let result = categoryNumbers.filter((item)=>{
      return item.typeId === id
    })
    return result[0].id
  }

  const showModalAuth = () => {
    setModalAuth(!modalAuth)
    
  };



  return (
    <nav className="header bg-white">
      <div className="row container nav d-flex pb-1 pt-4 ">
        <div className="logo col-2">
          <Link  to={SHOP_ROUTE}>ZAMANA</Link>{" "}
        </div>
        <div className="col-6 search ">
          <input type="text" placeholder="Islän harydyňyzy gözläň" />
          <i className="fas fa-search search-icon nav-icon"></i>
        </div>
        <div className="nav-links d-flex col-4">
          <div >
            <div
              onClick={showModalAuth}
              onMouseOut={(e) => ((boolMouse1 = true))}
              className="nav-linkk auth"
            >
              <i className="fas fa-user d-block nav-icon"></i>
              {user.isAuth ? <span className="c-bold">{user.user.name}</span> :<span>Girish</span>}
              
              <ModalAuth modalAuth={modalAuth} setModalAuth={setModalAuth} />
            </div>
          </div>

          <Link to={FAVOURITE_ROUTE} className="nav-linkk d-block nav-link-basket">
            <i className="fas fa-heart d-block nav-icon"></i>
            <span>Halanlarym</span>
            <span className="count-product count-product-right">{user.favoriteProd.length}</span>
            {/* <ModalProd/> */}
          </Link>
          <Link to={BASKET_ROUTE} className="nav-linkk nav-link-basket d-block">
            <i className="fas fa-shopping-basket d-block nav-icon"></i>
            <span>Sebedim</span>
            <span className="count-product">{user.basketProd.length}</span>
          </Link>
        </div>
        <div
          style={{ height: 20, position: "absolute" }}
          className="line-block"
          onMouseMove={(e) => setModalVisible(false)}
        ></div>
        <div
          className="bottom-links d-flex"
          style={{ marginTop: 15, justifyContent: "center" }}
        >
          {categoryItems.map((item) => (
            <Link
              key={item.id}
              onMouseOver={(e) => {
                // setModalVisible(true)
                setModalContent(true);
                showLink(item);
              }}
              onMouseOut={(e) => (boolMouse = true)}
              onClick={()=>setModalVisible(false)}
              className={
                link === item.id && modalVisible
                  ? "bottom-link active-link"
                  : "bottom-link"
              }
              to={`product/${clickCategory(item.id)}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <ModalNav
          children={link}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalContent={modalContent}
          setModalContent={setModalContent}
        />
      </div>
    </nav>
  );
});

export default NavBar;
