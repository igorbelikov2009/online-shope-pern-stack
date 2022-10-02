import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "..";

const Pages = observer(() => {
  const { device } = useContext(Context);
  //   const pages = [1, 2, 3, 4, 5];
  // считаем общее количество страниц и округляем в большую сторону
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  // создаём массив pages[], состящий из нумерации страниц, типа const pages = [1, 2, 3, 4, 5];
  // этот массив нужен нам для пагинации
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-3">
      {pages.map((nomerPage) => (
        <Pagination.Item
          key={nomerPage}
          active={device.page === nomerPage}
          onClick={() => device.setPage(nomerPage)} // при нажатии на номер страницы будем делать её активной
        >
          {nomerPage}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
