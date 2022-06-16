import { makeAutoObservable } from "mobx";

export class UserStore {
  constructor() {
    this._isAuth = false;
    
    this._favoriteProd = [];
    this._basketProd = [];
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
  get favoriteProd() {
    return this._favoriteProd;
  }

  setFavoriteProd(favoriteProd) {
    return this._favoriteProd.push(favoriteProd);
  }

  removeFavoriteProd(favoriteProd) {
    return (this._favoriteProd = this._favoriteProd.filter(
      (item) => item.id !== favoriteProd.id
    ));
  }

  get basketProd() {
    return this._basketProd;
  }

  setBasketProd(basketProd) {
    let bool = true;
    this._basketProd.map((item) => {
      if (item.id === basketProd.id) {
        bool = false;
      }
    });

    return bool ? this._basketProd.push(basketProd) : this._basketProd;
  }

  removeBasketProd(basketProd) {

    return this._basketProd = this._basketProd.filter((item) => item.id !== basketProd.id);
  }
}
