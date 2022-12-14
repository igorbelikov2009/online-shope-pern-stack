import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import { getAllDevicesInAdminPage } from "../http/deviceApi";
import { NavLink } from "react-router-dom";
import { DEVICE_EDIT_ROUTE } from "../utils/consts";
import DeleteBrandOrType from "../components/modals/DeleteBrandOrType";

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deleteBrandOrType, setDeleteBrandOrType] = useState(false);

  const [searchDevice, setSearchDevice] = useState("");
  const [searchedDevice, setSearchedDevice] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);

  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  // pagination
  const limit = 5;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages = [];

  for (let number = 1; number < pageCount + 1; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    getAllDevicesInAdminPage(searchDevice, currentPage, filter).then(
      ({ count, rows }) => {
        setSearchedDevice(rows);
        setCount(count);
      }
    );
  }, [currentPage]);

  useEffect(() => {
    getAllDevicesInAdminPage(searchDevice, 1, filter).then(
      ({ count, rows }) => {
        setSearchedDevice(rows);
        setCount(count);
        setCurrentPage(1);
      }
    );
  }, [filter, successMsg]);

  const fetchDevice = () => {
    getAllDevicesInAdminPage(searchDevice, currentPage, filter).then(
      ({ count, rows }) => {
        setSearchedDevice(rows);
        setCount(count);
      }
    );
  };

  const showSuccessMsgFunc = (msg) => {
    setSuccessMsg(msg);
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 5000);
  };

  return (
    <Container className="d-flex flex-column">
      {showSuccessMsg && <p>{successMsg}</p>}
      <Button
        onClick={() => setTypeVisible(true)}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        ???????????????? ??????
      </Button>

      <Button
        onClick={() => setBrandVisible(true)}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        ???????????????? ??????????
      </Button>

      <Button
        onClick={() => setDeviceVisible(true)}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        ???????????????? ????????????????????
      </Button>

      <Button
        onClick={() => setDeleteBrandOrType(true)}
        variant="outline-dark"
        className="mt-4 p-2"
      >
        ?????????????? ?????? ?????? ??????????
      </Button>

      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />

      <DeleteBrandOrType
        show={deleteBrandOrType}
        onHide={() => setDeleteBrandOrType(false)}
        showSuccessMsgFunc={showSuccessMsgFunc}
      />

      <Dropdown className="mt-5 mb-3" style={{ margin: "0 auto" }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {filter === "All" ? "?????? ????????????" : "???????????? ?????? ???????????? ?????? ????????"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {filter === "All" ? (
            <Dropdown.Item disabled>?????? ????????????</Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={() => setFilter("All")}>
              ?????? ????????????
            </Dropdown.Item>
          )}

          {filter === "Without Brand or Type" ? (
            <Dropdown.Item disabled>???????????? ?????? ???????????? ?????? ????????</Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={() => setFilter("Without Brand or Type")}>
              ???????????? ?????? ???????????? ?????? ????????
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={searchDevice}
          onChange={(e) => setSearchDevice(e.target.value)}
          placeholder="?????????????? ?????? ????????????????????..."
        />
        <Button onClick={fetchDevice} variant="outline-dark" className="ml-2">
          ?????????????? ?????? ????????????
        </Button>
      </InputGroup>

      {/* ???????????? ???????????? ???? ???????????????? ???????????? */}
      <ListGroup>
        {searchedDevice &&
          searchedDevice.map(({ id, img, brand, type, price, name }) => {
            return (
              <ListGroup.Item className="mt-3" key={id}>
                <Row>
                  <Col xs={5}>
                    <Image
                      width={150}
                      src={process.env.REACT_APP_API_URL + img}
                    />
                  </Col>

                  <Col xs={5}>
                    <Row>
                      <Col xs={12}>
                        <NavLink
                          to={DEVICE_EDIT_ROUTE + `/${id}`}
                          // onClick={() => console.log(id)}
                        >
                          ??????????????: {id}
                        </NavLink>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>????????????????: {name}</Col>
                    </Row>
                    <Row>
                      <Col xs={12}>??????????????????: {price}</Col>
                    </Row>
                    <Row>
                      <Col xs={12}>??????????: {brand.name}</Col>
                    </Row>
                    <Row>
                      <Col xs={12}>??????: {type.name}</Col>
                    </Row>
                  </Col>

                  <Col xs={2}>
                    <NavLink to={DEVICE_EDIT_ROUTE + `/${id}`}>??????????</NavLink>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
      </ListGroup>

      <Pagination size="sm" className="mt-4 mb-4" style={{ margin: "0 auto" }}>
        {searchedDevice && searchedDevice.length > 0 ? pages : false}
      </Pagination>
    </Container>
  );
};

// DEVICE_EDIT_ROUTE
export default Admin;
