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

  // Utility functions -------------------------------------------------------------
  //
  // take a number, format it into the string format and create the space separators 
  // for the thousand mark
  const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

  // process the string of numbers, first we  remove the spaces
  // so we can later convert it to number
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const math = (a, b, sign) =>
        sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b  : a / b;


const App = () => {
  //  three states:
  //  sign = the selected sign
  //  num = the entered value;
  //  res = the calculated value
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });


  // num Click Handler
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
              removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
              ? toLocaleString(Number(removeSpaces(calc.num + value)))
              : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
    console.log(calc.num, calc.res, calc.sign);
  };


  // comma Click Handler
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    })
  };

  //sign ClickHandler
  const signClickHandler = (e) => {
    // e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      num: 0,
      res: !calc.num ?
        calc.res :
        !calc.res ?
          calc.num :
          toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign))
    })
  };

  //equals Click Handler
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide by 0"
            : toLocaleString(
              math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
            ),
        sign: "",
        num: 0,
      })
    }
    console.log(calc.num, calc.res, calc.sign);
  };

  //invert ClickHandler
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  }
  

//percent ClickHandler
  const percentClickHandler = () => {

    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });

  }

//reset ClickHandler
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  }
  
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