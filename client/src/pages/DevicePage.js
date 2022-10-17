import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import {
  addDeviceToBasket,
  addRating,
  checkRating,
  fetchOneDevice,
} from "../http/deviceApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import RatingStars from "../components/RatingStars";

const DevicePage = observer(() => {
  const { user, basket } = useContext(Context);
  const [device, setDevice] = useState({ info: [] });
  const [resRate, setResRate] = useState("");
  const [isAccessRating, setSsAccessRating] = useState(false);
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
    if (user.isAuth) {
      checkRating({ deviceId: id }).then((res) => setSsAccessRating(res.allow));
    }
  }, [id, resRate, user.isAuth]);

  const isDeviceInBasket = () => {
    const findDevice = basket.Basket.findIndex(
      (item) => Number(item.id) === Number(device.id)
    );
    return findDevice < 0;
  };

  const addDeviceInBasket = (device) => {
    if (user.isAuth) {
      addDeviceToBasket(device).then(() => basket.setBasket(device, true));
    } else {
      basket.setBasket(device);
    }
  };

  const ratingChanged = (rate) => {
    addRating({
      rate,
      deviceId: id,
    }).then((res) => {
      setResRate(res);
    });
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} src={process.env.REACT_APP_API_URL + device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat`,
                backgroundSize: "cover",
                width: 80,
                height: 80,
                fontSize: 28,
              }}
            >
              {device?.rating || 0}
            </div>
            <RatingStars
              ratingChanged={ratingChanged}
              ratingVal={device?.rating || 0}
              isAuth={user.isAuth}
              isAccessRating={isAccessRating}
            />
            {resRate}
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>{device?.price || 0} RUB</h3>
            {isDeviceInBasket() ? (
              <Button
                variant="outline-dark"
                onClick={() => addDeviceInBasket(device)}
              >
                Добавить в корзину
              </Button>
            ) : (
              <Button variant="outline-dark" disabled>
                Устройство уже в корзине
              </Button>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default DevicePage;

/**
 * @param {{rating}} rating of device
 * @param {{price}} price of device
 */

// //============================================================================

// // //==============
// // const description = [
// //   { id: 1, title: "Оперативная память", description: "5 гб" },
// //   { id: 2, title: "Камера", description: "12 мп" },
// //   { id: 3, title: "Процессор", description: "Пентиум 3" },
// //   { id: 4, title: "Количество ядер", description: "2" },
// //   { id: 5, title: "Аккумулятор", description: "4000" },
// // ];
// // //==============
