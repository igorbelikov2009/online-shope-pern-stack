import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import star from "../assets/star.png";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
  const history = useHistory();
  // console.log(device.id);
  // console.log(history);
  /* 
   useHistory поменялсь на useNavigate в react-router-dom v6
Из за этого всё надо менять так:
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
В новой версий не надо вызывать push a можнo сразу передать ссылку
  */

  return (
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => {
        history.push(DEVICE_ROUTE + "/" + device.id);
        // console.log(device.id);
      }}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>{device.price} руб</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image width={18} height={18} src={star} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
