import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getOneOrderDevices } from "../http/ordersApi";

const OneOrder = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getOneOrderDevices(id).then((data) => {
      setOrder(data);
      setLoading(false);
      console.log(order);
    });
  }, []);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  // Format date (createdAt)
  const formatDate = (propsDate) => {
    const date = new Date(Date.parse(propsDate));
    const options = {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timezone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <Container className="d-flex flex-column">
      Заказ id: {id} <br />
      Complete: {order?.descr.complete ? "Завершено" : "Не завершено"} <br />
      Пользователь:{" "}
      {order?.descr.userId
        ? order.descr.userId
        : "Пользователь не зарегистрировался"}
      <br />
      Создан: {formatDate(order?.descr.createdAt)} <br />
      {order?.descr.complete
        ? formatDate(order.descr.complete.updatedAt)
        : false}
      <a href={`tel:${order?.descr.mobile}`}>
        Мобильный: {order?.descr.mobile}
      </a>
      <br />
      {order?.devices.map(({ count, descr }, i) => {
        return (
          <Row key={i} className="mb-5">
            <Col xs={2}>
              <Image
                width={150}
                src={process.env.REACT_APP_API_URL + descr.img}
              />
            </Col>

            <Col xs={10}>
              Брэнд: {descr.brand.name}
              <br />
              Тип: {descr.type.name}
              <br />
              Название: {descr.name}
              <br />
              Стоимость: {descr.price} РУБ
              <br />
              Количество: {count}
              <br />
              Общая стоимость: {count * descr.price} РУБ
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default OneOrder;
