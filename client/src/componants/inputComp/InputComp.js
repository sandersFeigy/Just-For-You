import './InputComp.css'

import React from 'react'

export default function InputComp({ data }) {
    return (
        <div >
            <div className="inColumn" >
                <label htmlFor={data.id}>{data.label}</label><br />
                <input className={data.className}
                    type={data.type}
                    id={data.id}
                    name={data.id}
                    placeholder={data.placeholder}
                    value={data.value}
                    onChange={data.onChange} />
            </div>
            <div id="error">{data.error}</div>
        </div>
    )
}
