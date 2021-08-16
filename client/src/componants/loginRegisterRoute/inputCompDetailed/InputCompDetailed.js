import "./InputCompDetailed.css";

import React from "react";

export default function InputCompDetailed({ data }) {
  return (
    <div id="space" className="inColumn">
      <label htmlFor={data.htmlFor}>{data.label}</label>
      <br />
      <input
        className={data.className}
        type={data.type}
        id={data.id}
        aria-describedby={data.ariaDescribedby}
        name={data.id}
        placeholder={data.placeholder}
        value={data.value}
        onChange={data.onChange}
      />
      <div id="error">{data.error}</div>
    </div>
  );
}
