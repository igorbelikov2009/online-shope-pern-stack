// Работа с Mobx
import { makeAutoObservable } from "mobx";
import jwt_decode from "jwt-decode";

export default class UserStore {
  // Конструктор будет вызываться при создании объекта данного класса.
  // Например, в index.js, в Context.Provider, в  его props-value
  // мы создаём объект user: new UserStore().
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this); // теперь mobx будет следить за изменениями этих переменных в конструкторе.
    //  При изменении этих переменных, компоненты будут перерендерываться
  }

  // Проверка срока действия токена
  checkValidToken() {
    // Пусть токен с истекшим сроком действия = false;
    let isExpiredToken = false;
    // достаём токен из локального хранилища по ключу ('token')
    const token = localStorage.getItem("token");
    // декодируем полученный токен
    const decodedToken = jwt_decode(token);
    // создём переменную со значением текущего времени
    const dateNow = new Date();

    // сравниваем предельный установленный срок действия токена с текущим
    if (decodedToken.exp < dateNow.getTime()) {
      isExpiredToken = true;
    }

    return isExpiredToken;
  }

  // Создаём экшены. Это функции, которые изменяют каким-то образом состояние.
  // Данная функция принимает булевое значение и присваивает его переменной _isAuth
  setIsAuth(bool) {
    this._isAuth = bool;
  }

  // Данная функция для изменения пользователя
  setUser(user) {
    this._user = user;
  }

  // Создаём геттеры. Они нужны нам для получения переменных из нашего состояния.
  // К ним будем обращаться, как к объектам
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  // Это компьютед-функции, они вызываются только в том случае,
  // если переменная, которая используется внутри, была измененна
}
