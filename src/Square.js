import React, { useEffect } from 'react';
import './Square.css';

const Square = (props) => {
    return (
        <div className="Square">
            <button className="tile" style={{backgroundColor: props.color}} onClick={props.handleChangeColor}/>
        </div>
    );
}

export default Square;
