import React, { useState } from 'react';

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["C", "+/-", "%", "/"],
  ["7", "8", "9", "X"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const App = () => {

  //  three states:
  //  sign, the selected sign
  //  num, the entered value;
  //  res, the calculated value
  let [calc, SetCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  }
  );


  // num Click Handler
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      SetCalc({
        ...calc,
        num:
        calc.num === 0 && value === "0"
        ? "0"
        : removeSpaces(calc.num) % 1 === 0
        ? toLocaleString(Number(removeSpaces(calc.num + value)))
        : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  }

  // comma Click Handler
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    SetCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    })
  }

  //sign ClickHandler
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    SetCalc({
      ...calc,
      sign: value,
      num: !calc.res && calc.num ? calc.num : calc.res,
      res: 0,
    })
  }

  //equals Click Handler
  const equalsClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;


  }

  //invert ClickHandler
  const invertClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

  }
  
//percent ClickHandler
  const percentClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

  }

//reset ClickHandler
  const resetClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

  }
  
  
  // take a number, format it into the string format and create the space separators 
  // for the thousand mark
  const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

  // process the string of numbers, first we need to remove the spaces
  // so we can later convert it to number
  const removeSpaces = (num) => num.toString().replace(/\s/g, "");


  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button 
                key = {i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                    ? resetClickHandler
                    : btn === "+/-"
                    ? invertClickHandler
                    : btn === "%" 
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn === "X" || btn === "+" || btn ==="-"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                } 
              />
            );
          })
        }
        
      </ButtonBox>
    </Wrapper>
  );
};

export default App;