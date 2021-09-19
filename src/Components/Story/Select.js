import React, { useContext } from "react";
import "./css/Select.css";
import { handlerContext } from "./StoryInfo";

export default function Select({
  title,
  itemList = [],
  selectedItem = 0,
  className,
}) {
  const changeHandler = useContext(handlerContext);
  const selectElement = document.querySelector(`.${className}`);
  if (selectElement) {
    selectElement.value = selectedItem;
  }
  return (
    <div className="select" onClick={() => changeHandler(className)}>
      <span className="selectTitle">{title}</span>
      <select className={className} defaultValue={selectedItem}>
        {itemList.map(({ key, value }) => (
          <option value={value}>{key}</option>
        ))}
      </select>
    </div>
  );
}
