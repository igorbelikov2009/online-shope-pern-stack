import React, { useContext } from "react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Context } from "../index";

const OneItemInBasket = ({ device }) => {
  const { basket, user } = useContext(Context);
  // console.log(basket, user);
  console.log("OneItemInBasket ");

  return (
    <Card key={device.id} style={{ width: "100%" }} className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={4}>
            <Image
              src={process.env.REACT_APP_API_URL + device.img}
              style={{ width: "100%", maxWidth: 250 }}
            />
          </Col>

          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <b>Название:</b>
                <NavLink className="ml-2" to={`/device/${device.id}`}>
                  {device.name}
                </NavLink>
              </Col>
            </Row>

            <br />
            <br />
            <Row>
              <Col xs={12}>
                <b>Характеристики:</b>
                <br />
                <br />
                {device.info && device.info.length !== 0
                  ? device.info.map((info, i) => {
                      if (i % 2 === 0) {
                        return (
                          <Row key={info.id} className="ml-2">
                            <Col xs={6}>{info.title}</Col>
                            <Col xs={6}>{info.description}</Col>
                          </Row>
                        );
                      } else {
                        return (
                          <Row
                            key={info.id}
                            style={{ backgroundColor: "lightgray" }}
                            className="ml-2"
                          >
                            <Col xs={6}>{info.title}</Col>
                            <Col xs={6}>{info.description}</Col>
                          </Row>
                        );
                      }
                    })
                  : "Описание отсутствует"}
              </Col>
            </Row>
          </Col>

          <Col xs={4}>
            <Row>
              <Col xs={12} className="d-flex justify-content-center">
                {user.isAuth ? (
                  <Button
                    variant="outline-dark"
                    onClick={() => basket.setDeleteItemBasket(device, true)}
                  >
                    Удалить из корзины
                  </Button>
                ) : (
                  <Button
                    variant="outline-dark"
                    onClick={() => basket.setDeleteItemBasket(device)}
                  >
                    Удалить из корзины
                  </Button>
                )}
              </Col>
            </Row>

            <Row className="mt-5">
              <Col xs={12} className="d-flex justify-content-center">
                <b> Количество: </b>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col xs={12} className="d-flex justify-content-center">
                <Button
                  variant="outline-dark"
                  onClick={() => basket.setCountDevice(device.id, "+")}
                >
                  +
                </Button>

                <input
                  className="ml-2 mr-2 pl-2 pr-2"
                  style={{ width: "20%" }}
                  type="number"
                  onChange={(e) =>
                    basket.setCountDevice(Number(e.target.value))
                  }
                  value={device.count}
                />

                <Button
                  variant="outline-dark"
                  onClick={() => basket.setCountDevice(device.id, "-")}
                >
                  -
                </Button>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col xs={12} className="d-flex justify-content-center">
                <b className="mr-2"> Стоимость: </b>{" "}
                {device.price * device.count} РУБ
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OneItemInBasket;
