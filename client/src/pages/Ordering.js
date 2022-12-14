import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { sendOrder } from "../http/ordersApi";
import { SHOP_ROUTE } from "../utils/consts";

const Ordering = () => {
  const { basket, user } = useContext(Context);
  const [phone, setPhone] = useState(null);
  const history = useHistory();

  const buy = () => {
    let order = {
      mobile: phone,
      basket: basket.Basket,
    };

    if (user.isAuth) {
      order.auth = true;
    }

    sendOrder(order).then((data) => {
      console.log(data);
      basket.setDeleteAllDeviceFromBasket();
      history.push(SHOP_ROUTE);
    });
  };

  return (
    <>
      <Form>
        <Form.Control
          placeholder="Введите свой телефон..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form>
      <Row className="mt-3">
        <Col xs={12}>
          <Button variant="secondary" onClick={buy}>
            Купить
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Ordering;
