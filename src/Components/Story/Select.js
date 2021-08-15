import React from "react";
import "./css/Select.css";

export default function Select({
  title,
  itemList = [],
  selectedItem = 0,
  className,
}) {
  return (
    <div className="select">
      <span className="selectTitle">{title}</span>
      <select className={className} defaultValue={selectedItem}>
        {itemList.map(({ key, value }) => (
          <option value={value}>{key}</option>
        ))}
      </select>
    </div>
  );
}
