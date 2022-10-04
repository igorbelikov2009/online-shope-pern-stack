import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { createType } from "../../http/deviceApi";

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const addType = () => {
    // при нажатии на кнопку, нам необходимо отправить запрос createType().
    // В параметр запроса передаём объект создаваемого типа (брэнда и .....)
    // у него указываем только имя, которое мы получаем из состояния
    createType({ name: value }).then((data) => {
      setValue("");
      // в случае успешного запроса, setValue присваиваем пустую строку(""), то есть инпут будем обнулять
      onHide();
      // после чего вызываем функцию закрытия модального окна
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название типа"}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addType}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
