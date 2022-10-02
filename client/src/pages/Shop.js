import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import TypeBar from "../components/TypeBar";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceApi";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    // после получения товара, нам надо посчитать, сколько товара мы получили, чтобы посчитать количество страниц
    fetchDevices(null, null, 1, 4).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count); // общее количество товара находится в поле (count) в ответе от сервера
    });
    // setBrands(), setTypes() и fetchDevices() из контекста смотри index.js device: new DeviceStore()
  }, [device]);

  // Чтобы менять страницы, при нажатии на страницу в пагинации, в массив зависимостей передаём номер страницы [device.page].
  // Теперь функция (первый параметр useEffect()), будет вызываться каждый раз, когда номер страницы были изменён
  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      5
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>

        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
