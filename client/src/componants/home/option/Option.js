import './Option.css'
import React from 'react'


export default function Option({ data }) {
    return (
        <a href={data.url} id='linkStyle'>
            <div className={data.class}>
                <h1 id='padding'>{data.title}</h1>
                <div className='continer'>
                    <p>{data.brief}</p>
                    <div>{data.end}</div>
                    <img src={data.img} id='iconImg' />
                </div>
            </div>
        </a>
    )
}



