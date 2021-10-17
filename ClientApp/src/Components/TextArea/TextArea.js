import React, { useState, useEffect } from "react";
import "./css/TextArea.css";

const TextArea = ({
  text,
  charLimit,
  onSubmitClick,
  index = 0,
  shouldShowActionButtons,
}) => {
  text = text || "";
  useEffect(() => {
    setCharsRemaining(charLimit - text.length);
  }, [text]);

  const onTextChange = (e) => {
    const saveButton = document.querySelectorAll("button.greenButton")[index];
    const span = document.querySelectorAll(".textareaBottom > span")[index];
    const el = e.target;
    el.style.height = `${el.scrollHeight}px`;
    const text = el.value.trim();
    const len = text.length;
    if (len > charLimit) {
      span.innerHTML = "limit exceeded";
      span.style.color = "red";
      if (saveButton) {
        saveButton.disabled = true;
      }
      document.querySelectorAll("textarea.boxStyles")[index].style.borderColor =
        "red";
    }
    else {
      if (saveButton) {
        saveButton.disabled = false;
      }
      setCharsRemaining(charLimit - len);
      span.style.color = "black";
      document.querySelectorAll("textarea.boxStyles")[index].style.borderColor =
        "blue";
    }
  };

  const [charsRemaining, setCharsRemaining] = useState(charLimit - text.length);
  const showBottom = () => {
    document.querySelectorAll(".textareaContainer > .textareaBottom")[
      index
    ].style.visibility = "visible";
  };
  const hideBottom = () => {
    document.querySelectorAll(".textareaContainer > .textareaBottom")[
      index
    ].style.visibility = "hidden";
  };

  return (
    <div className="textareaContainer">
      <textarea
        className="boxStyles"
        onChange={(e) => onTextChange(e)}
        onClick={() => showBottom()}
        defaultValue={text}
      ></textarea>
      <div className="textareaBottom">
        <span>{`${charsRemaining}/${charLimit}`}</span>
        {shouldShowActionButtons && (
          <div>
            <button
              className="delete"
              onClick={() => {
                hideBottom();
                document.querySelectorAll(".textareaContainer > textarea")[
                  index
                ].value = text;
              }}
            >
              cancel
            </button>
            <button
              className="greenButton"
              onClick={() => {
                onSubmitClick(
                  document.querySelectorAll("textarea.boxStyles")[index].value
                );
                hideBottom();
              }}
            >
              save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
