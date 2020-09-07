import React, { useEffect, useState } from 'react';
import Square from './Square';


const generateRandomColor = () => {
    const hexadecimal = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += hexadecimal[Math.floor(Math.random() * 16)];
    }
    return color;
}


const generateNumber = () => {
    const number = localStorage.getItem("numOfSquares");
    if (number == null || number === "") {
        return Math.floor(Math.random() * 10);
    } else {
        return parseInt(number);
    }
}

const Squares = () => {
    const [numOfSquares, setNumOfSquares] = useState(generateNumber());
    const [squares, setSquares] = useState([]);

    const handleChangeColor = (key) => () => {
        const identifier = key;
        const newSquares = [...squares];
        for (let i = 0; i < squares.length; i++) {
            const row = newSquares[i];
            for (let j = 0; j < row.length; j++) {
                if (row[j].key === identifier) {
                    newSquares[i][j].color = generateRandomColor();
                }
            }
        }
        setSquares(newSquares);
    }


    const handleIncrement = (event) => {
        event.preventDefault();
        if (numOfSquares < 9) {
            let newSquares = [...squares];
            const obj = {}
            obj.key = numOfSquares + 1;
            obj.color = generateRandomColor();
            if (numOfSquares % 3 === 0) {
                let newRow = []
                newRow.push(obj);
                newSquares.push(newRow);
            } else {
                let row = newSquares.pop();
                row.push(obj);
                newSquares.push(row);
            }
            setSquares(newSquares);
            setNumOfSquares(numOfSquares + 1);
            localStorage.setItem("numOfSquares", numOfSquares + 1);
        }
    }

    const handleDecrement = (event) => {
        event.preventDefault();
        if (numOfSquares >= 1) {
            let newSquares = [...squares];
            let row = newSquares.pop();
            if (numOfSquares % 3 !== 1) {
                row.pop();
                newSquares.push(row);
            }
            setSquares(newSquares);
            setNumOfSquares(numOfSquares - 1);
            localStorage.setItem("numOfSquares", numOfSquares - 1);
        }
    }

    useEffect(() => {
        let newSquares = [];
        for (let i = 0; i < numOfSquares / 3; i += 1) {
            let row = [];
            for (let j = i * 3; j < Math.min(i * 3 + 3, numOfSquares); j += 1) {
                const obj = {};
                obj.key = j + 1;
                obj.color = generateRandomColor();
                row.push(obj);
            }
            newSquares.push(row);
        }
        setSquares(newSquares);
    }, [])

    return (
        <div className="container">
            <div className="squares">
                {squares.map((element) => {
                    return (
                        <div className="row">
                            {element.map((innerElement) => {
                                return (
                                    <Square 
                                        key={innerElement.key} 
                                        color={innerElement.color} 
                                        handleChangeColor={handleChangeColor(innerElement.key)}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div className="buttonContainer">
                <button className="incrementButton" onClick={handleIncrement}>
                    + 
                </button>
                <button className="decrementButton" onClick={handleDecrement}>
                    -
                </button> 
            </div>
        </div>
    );
};

export default Squares;
