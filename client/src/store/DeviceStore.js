// Работа с Mobx
import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  // Конструктор будет вызываться при создании объекта данного класса.
  // Например, в index.js, в Context.Provider, в  его props-value
  // мы создаём объект device: new DeviceStore() .
  constructor() {
    // Создаём состояния
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

  // Создаём экшены. Это функции, которые изменяют каким-то образом состояние.
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
    // меняется в Shop стр.35
  }
  setLimit(limit) {
    this._limit = limit;
  }

  // Создаём геттеры. Они нужны нам для получения переменных из нашего состояния.
  // К ним будем обращаться, как к объектам
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
  // Это компьютед-функции, они вызываются только в том случае,
  // если переменная, которая используется внутри, была измененна
}
