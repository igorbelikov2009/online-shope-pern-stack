import React, { useContext, useEffect, useState } from "react";

import { Button, Dropdown, Form, Row, Col, Modal } from "react-bootstrap";
import { Context } from "../../index";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";

// Оборачиваем модальное окно в observer, чтобы мы могли типы(или брэнды)
// выбирать и сразу видеть рендеринг.
const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  // const [type, setType] = useState(null);
  // const [brand, setBrand] = useState(null); эти состояния можно убрать, поскольку
  // в DeviceStore у нас уже есть объекты  this._selectedType = {}
  // и this._selectedBrand = {}, отвечающие за выбранные тип и брэнд

  useEffect(() => {
    // каждый раз, при загрузке модального окна, будем подгружать брэнды и типы
    // из которых в селектах будем выбирать нужные нам тип и брэнд
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, [device]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  // =======================================
  // changeInfo принимает параметрами:
  // 1. ключ - это либо title либо description
  // 2. value - значение, которое по этому ключу мы будем устанавливать
  // 3. number - номер характеристики, у которой значение мы будем изменять
  // Пробегаем по массиву информации
  // Проверяем, если номер совпадает с номером элемента итерации
  // то, тогда мы возвращаем объект, новый объект. Разворачиваем в него характеристику, и по ключу (title либо description) заменяем у неё поле value
  // Если номер не совпадает, то мы возвращаем объект неизменнённым
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  //  остаётся отправлять запрос на сервис
  const addDevice = () => {
    //  создаём объект formData
    const formData = new FormData();
    // и с помощью функции append передаём первым параметром ключ, а вторым значение
    formData.append("name", name);
    // У price тип: number. Значение для отправки запроса должно быть либо строковым,
    // либо блоковым. Грубо говоря блок - это набор битов, поэтому отправляем файл.
    // Для этого price сконвентируем в строку
    formData.append("price", `${price}`);
    // как "img" передаём file, который потом выбираем из компьютера
    formData.append("img", file);
    // "brandId" и "typeId" получаем из DeviceStore из выбранного элемента,
    // не забываем нам нужен только id, а не целиком объект
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    // Массив info невозможно передать, либо строка, либо блок.
    // Поэтому массив перегоняем в строку: JSON.stringify(info)
    // А на сервере эта JSON-строка будет парситься обратно в массив.
    formData.append("info", JSON.stringify(info));

    // Функция createDevice() отправляет запрос на сервис.
    // Передаём formData как параметр функции, и, если запрос прошёл успешно, будем закрывать модалку
    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название устройства"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введите стоимость устройства"
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant={"outline-dark"} onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={
                    (e) =>
                      //   const changeInfo = (key, value, number) => ...
                      changeInfo("title", e.target.value, i.number)
                    //  номер получаем из элемента текущей итерации
                  }
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={
                    (e) =>
                      //  const changeInfo = (key, value, number) => ...
                      changeInfo("description", e.target.value, i.number)
                    //  номер получаем из элемента текущей итерации
                  }
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeInfo(i.number)}
                  // Запомни это. Без такой конфигурации этот onClick работать не будет
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
