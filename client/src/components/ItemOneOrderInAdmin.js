import React, { useState } from "react";
import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { fetchChangeStatusOrder, fetchDeleteOrder } from "../http/ordersApi";
import { ORDERS_ROUTE } from "../utils/consts";

const ItemOneOrderInAdmin = ({
  id,
  complete,
  mobile,
  createdAt,
  updatedAt,
  userId,
  reRender,
}) => {
  const [modalDelete, setShowDelete] = useState(false);
  const [modalStatus, setShowStatus] = useState(false);

  //modal delete
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const deleteOrder = () => {
    fetchDeleteOrder({ id }).then(() => {
      setShowStatus(false);
      setTimeout(() => reRender(), 250);
    });
  };

  //modal status
  const handleCloseStatus = () => setShowStatus(false);
  const handleShowStatus = () => setShowStatus(true);
  const changeStatusOrder = () => {
    fetchChangeStatusOrder({ complete: !complete, id }).then(() => {
      setShowStatus(false);
      setTimeout(() => reRender(), 250);
    });
  };

  //Format date (createdAt)
  const formatDate = (propsDate) => {
    const date = new Date(Date.parse(propsDate));
    // const options = {
    //   weekday: "short",
    //   hour: "numeric",
    //   minute: "numeric",
    //   year: "numeric",
    //   month: "numeric",
    //   day: "numeric",
    //   timezone: "UTC",
    // };
    // return date.toLocaleString("en-US", options);
    console.log(date);
    return date.toLocaleString("en-US");
  };

  return (
    <>
      {formatDate}
      <ListGroup.Item className="mt-3" key={id}>
        <Row>
          <Col md={8}>
            <Row>
              <Col xs={12}>
                <NavLink to={ORDERS_ROUTE + `/${id}`}>id: {id}</NavLink>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                Телефон: <a href={`tel:${mobile}`}>{mobile}</a>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>Заказ создан: {formatDate(createdAt)}</Col>
            </Row>
            {complete ? (
              <Row>
                <Col xs={12}>Заказ завершён: {formatDate(updatedAt)}</Col>
              </Row>
            ) : (
              false
            )}

            <Row>
              <Col xs={12}>
                {userId
                  ? "Покупатель: зарегистрирован"
                  : "Покупатель: не зарегистрирован"}
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                Status: {complete ? "Завершён" : "В ходе выполнения"}
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <Row
              style={{ height: "100%" }}
              className="d-flex align-items-center"
            >
              <Col xs={6} className="d-flex justify-content-center">
                {complete ? (
                  <Button variant="success" onClick={handleShowStatus}>
                    Сделать не завершённым
                  </Button>
                ) : (
                  <Button variant="warning" onClick={handleShowStatus}>
                    Сделать завершённым
                  </Button>
                )}
              </Col>

              <Col xs={6} className="d-flex justify-content-center">
                <Button variant="danger" onClick={handleShowDelete}>
                  Удалить
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </ListGroup.Item>

      {/* Модальное окно подтверждения изменеия статуса */}
      <Modal show={modalStatus} onHide={handleCloseStatus}>
        <Modal.Header closeButton>
          <Modal.Title>Please confirm</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Do you want changes status for this order(id: {id}), from{" "}
          {complete ? "'Завершён'" : "'В ходе выполнения'"} to{" "}
          {complete ? "'В ходе выполнения'" : "'Completed'"}?
          <br />
          <br />
          Data:
          <ul>
            <li>mobile: {mobile}</li>
            <li>Order CreatedAt: {formatDate(createdAt)}</li>
            {complete ? `Заказ завершён: ${formatDate(updatedAt)}` : false}
            <li>Status: {complete ? "Заказ завершён" : `В ходе выполнения`}</li>
            <li>
              {userId
                ? "Покупатель зарегистрирован"
                : `Покупатель не зарегистрирован`}
            </li>
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStatus}>
            Отмена
          </Button>
          <Button variant="primary" onClick={changeStatusOrder}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно подтверждения удаления заказа */}
      <Modal show={modalDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Пожалуйста, подтвердите</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы хотите удалить этот заказ? (id: {id})?
          <br />
          <br />
          Данные:
          <ul>
            <li>Мобильный: {mobile}</li>
            <li>Заказ создан в: {formatDate(createdAt)}</li>
            {complete ? `Order completed: ${formatDate(updatedAt)}` : false}
            <li>Статус: {complete ? "Completed" : `In progress`}</li>
            <li>{userId ? "Buyer registered" : `Buyer not registered`}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Отмена
          </Button>
          <Button variant="primary" onClick={deleteOrder}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ItemOneOrderInAdmin;
