import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "..";

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  // device: new DeviceStore() через Context в indexe из DeviceStore
  //   console.log(device);

  const getAllDevices = () => {
    device.setSelectedType("all");
    device.setSelectedBrand("all");
  };

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        active={"all" === device.selectedType}
        onClick={getAllDevices}
      >
        All
      </ListGroup.Item>

      {device.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === device.selectedType.id}
          // active даёт нам изменение цвета при клике через bootstrap
          key={type.id}
          onClick={() => device.setSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
