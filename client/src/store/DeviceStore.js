import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [
      // { id: 1, name: "Холодильники" },
      // { id: 2, name: "Смартфоны" },
      // { id: 3, name: "Ноутбуки" },
      // { id: 4, name: "Телевизоры" },
    ];
    this._brands = [
      // { id: 1, name: "Samsung" },
      // { id: 2, name: "LG" },
      // { id: 3, name: "Lenvo" },
      // { id: 4, name: "Asus" },
    ];
    this._devices = [
      // { id: 1, name: "Iphone 12 pro", price: 25000, rating: 5, img: "image" },
      // { id: 2, name: "Iphone 12 pro", price: 25000, rating: 5, img: "image" },
      // { id: 3, name: "Iphone 12 pro", price: 25000, rating: 5, img: "image" },
      // { id: 4, name: "Iphone 12 pro", price: 25000, rating: 5, img: "image" },
    ];
    this._selectedType = {};
    this._selectedBrand = {};
    this._page = 1; // поле, отвечающее за текущую страницу, по умолчанию это будет первая страница
    this._totalCount = 0; // общее количество товара, которое доступно по данному запросу
    this._limit = 3; // количество товаров на одной странице
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }
  setLimit(limit) {
    this._limit = limit;
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
}
