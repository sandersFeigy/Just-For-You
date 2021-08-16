import react, { useState } from 'react';
import './Upload.css';

export default function Upload(props) {
  const handleChange = props.setSrc;
  const [state, setState] = useState({ file: null });
  const [imgStyle, setImgStyle] = useState(['0px', '0px']);
  const change = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      handleChange(reader.result);
      setState({
        file: reader.result
      })
    };
    setImgStyle(['560px', '280px'])
    let label = e.target.nextElementSibling;
    let labelVal = label.innerText;
    let fileName = '';
    fileName = e.target.files[0].name;
    if (fileName)
      label.innerText = fileName;
    else
      label.innerText = labelVal;
  }
  return (
    <div className='continerStyle'>
      <div className="box">
        <input type="file" name="file-3[]" id="file-3" className="inputfile inputfile-3" accept="image/*" onChange={change} />
        <label htmlFor="file-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg> <span>…העלאת תמונה</span></label>
      </div>
      <img src={state.file} style={{ width: imgStyle[0], height: imgStyle[1], marginTop: '2px' }} />
    </div>
  );
}

