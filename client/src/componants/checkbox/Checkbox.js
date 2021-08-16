import React from "react";
import CheckboxElment from "./checkboxElment/CheckboxElment";

export default function Checkbox(props) {
  let colors = props.colors;
  let setCheckb = props.setCheckb;
  let checkbox = props.checkbox;
  return (
    <div >
      <ul id='continerS'>
        {colors.map((element, i) => {
          return <CheckboxElment key={i} title={element} i={i} checkboxi={checkbox} setCheckb={setCheckb} />;
        })}
      </ul>

    </div>
  );
}
