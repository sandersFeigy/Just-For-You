import React, { useState, useEffect } from "react";

export default function CheckboxElment(props) {
  let setCheckb = props.setCheckb;
  let i = props.i;
  useEffect(() => {
    setariaChecked(props.checkboxi[i]);
  }, [props.checkboxi[i]]);
  const [ariaChecked, setariaChecked] = useState(props.checkboxi[i]);
  function checked(e) {
    if (i === 0) {
      setCheckb(true, i, !ariaChecked);
    } else {
      setCheckb(false, i, !ariaChecked);
    }
  }
  function onchange(e) {
    setariaChecked((bool) => !bool);
    checked(e);
  }
  return (
    <li title={props.title[0]}>
      <label className="checkbox">
        <span className=" checkboxWarp">
          {!ariaChecked && (
            <span
              className="checkboxElement"
              style={{
                backgroundColor: props.title[1],
                color: props.title[1],
                borderColor: props.title[1],
              }}
            ></span>
          )}
          {ariaChecked && (
            <i
              style={{ lineHeight: "16px", left: "0", color: props.title[1] }}
              className="fa fa-check"
            ></i>
          )}
          <input
            type="checkbox"
            onChange={onchange}
            aria-checked={ariaChecked}
          />
        </span>
        <span className="checkboxLabel" style={{ color: props.title[1] }}>
          {props.title[0]}
        </span>
      </label>
    </li>
  );
}
