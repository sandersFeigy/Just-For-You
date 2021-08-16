import "./InputIcon.css";

import React, { useState } from "react";

export default function InputCompDetailed({ data }) {
  const [hidden, setHidden] = useState(false);
  function showPassward(e) {
    if (hidden) setHidden(false);
    else setHidden(true);
  }
  return (
    <div id="space" className="inColumn">
      <label htmlFor={data.htmlFor}>{data.label}</label>
      <br />
      <div className='together'>
        <i
          className={hidden ? "fa fa-eye-slash " : "fa fa-eye"}
          onClick={showPassward}
        />
        <input
          className={data.className + " icon-input"}
          type={hidden ? "text" : data.type}
          id={data.id}
          aria-describedby={data.ariaDescribedby}
          name={data.id}
          placeholder={data.placeholder}
          value={data.value}
          onChange={data.onChange}
        />
      </div>
      <div id="error">{data.error}</div>
    </div>
  );
}
