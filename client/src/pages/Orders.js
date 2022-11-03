import React, { useEffect, useState } from "react";
import { fetchOrders } from "../http/ordersApi";
import ItemOneOrderInAdmin from "../components/ItemOneOrderInAdmin";
import {
  Col,
  Container,
  Dropdown,
  ListGroup,
  Pagination,
  Row,
  // Spinner,
} from "react-bootstrap";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("Все заказы");
  const [rerender, setRerender] = useState(false);

  //pagination
  const limit = 5;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages = [];

  useEffect(() => {
    fetchOrders({ limit, page: 1 }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchOrders({ limit, page: currentPage }).then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    fetchOrders({ limit, page: 1, complete: filter }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
      setCurrentPage(1);
    });
  }, [filter]);

  // re-render перерендерить после изменения статуса или удаления какого либо заказа
  useEffect(() => {
    setLoading(true);
    fetchOrders({ limit, page: currentPage, complete: filter }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
      setCurrentPage(1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  console.log(loading);
  // if (loading) {
  //   return <Spinner animation="grow" />;
  // }

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

  return (
    <Container className="d-flex flex-column">
      <Row>
        <Col
          xs={12}
          className="mt-3 d-flex justify-content-center align-items-center"
        >
          <div className="mr-3">Выбрать :</div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {filter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {filter === "Все заказы" ? (
                <Dropdown.Item disabled>Все заказы</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter("Все заказы")}>
                  Все заказы
                </Dropdown.Item>
              )}

              {filter === "Завершённые" ? (
                <Dropdown.Item disabled>Завершённые</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter("Завершённые")}>
                  Завершённые
                </Dropdown.Item>
              )}

              {filter === "Не завершённые" ? (
                <Dropdown.Item disabled>Не завершённые</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter("Не завершённые")}>
                  Не завершённые
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <ListGroup>
        {orders.rows?.map(
          ({ id, complete, mobile, createdAt, updatedAt, userId }) => (
            <ItemOneOrderInAdmin
              key={id}
              id={id}
              complete={complete}
              mobile={mobile}
              createdAt={createdAt}
              updatedAt={updatedAt}
              userId={userId}
              reRender={reRender}
            />
          )
        )}
      </ListGroup>

      <Pagination size="sm" className="mt-4 mb-4" style={{ margin: "0 auto" }}>
        {pages}
      </Pagination>
    </Container>
  );
};

export default Orders;
