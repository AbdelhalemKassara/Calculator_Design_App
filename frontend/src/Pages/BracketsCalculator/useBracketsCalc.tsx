import React, { useState, useEffect } from 'react'

export default function useBracketsCalc() {
  const [strStack, setStrStack] = useState<string>('');
  const [result, setResult] = useState<number>(0);
  const [dispResult, setDispResult] = useState<boolean>(false);
  const [bracketsCount, setBrackCount] = useState<number>(0);
  const [operations] = useState(() => {return ['/', '*', '+', '-']});

  function pushToCalculator(nextChar: string) {
    if(nextChar === '=') {
      calculateResult();
      setDispResult(true);
      return;
    } 
    else if(nextChar === 'c') {
      setStrStack('');
    } 
    else if(nextChar === '(') {
      setBrackCount(curCount => curCount + 1);
      setStrStack(curStr => curStr + nextChar);
    } 
    else if (nextChar === ')') {
      if(bracketsCount-1 >= 0) {
        setBrackCount(curCount => curCount - 1);

        setStrStack(curStr => {
          //removes an operation if it is before a closing bracket
          if(operations.find(op => op === curStr.charAt(curStr.length-1))) {
            return curStr.slice(0, curStr.length-1) + nextChar;
          }
          return curStr + nextChar
        });
      }
    } 
    //checks if the current character is an operation 
    else if(operations.find(op => op === nextChar)) {
      //checks if the previous is not an operation
      if(!operations.find(op => op === strStack.charAt(strStack.length-1))) {
        setStrStack(curStr => curStr + nextChar);
      }
    } else {
      setStrStack(curStr => curStr + nextChar);
    }

    setDispResult(false);
  }


  function calculateResult() {
    let outStr = strStack;

    //removes the last character if it is an operation
    if(operations.find(op => op === outStr.charAt(outStr.length-1))) {
      outStr = strStack.slice(0, outStr.length - 1);
    }

    //adds any missing closing brackets
    for(let i = 0; i < bracketsCount; i++) {
      outStr += ')';
    }

    setResult(processString(outStr));
    setStrStack(outStr);
  }

  function isAC() {
    return strStack.length === 0;
  }

  //takes in brackets (BEDMAS) LEFT TO RIGHT
//assuming correct brackets
//make sure that there aren't an operators at the 'ends' so (+v+) is not allowed
//assuming that subtraction does exist but adding a negative numbers does
function processString(inString: any) {
  if(inString === "") {
    return undefined;
  }

  inString = "(" + inString + ")";
  let splitStr = inString.split(/(?=[\(\)])|(?<=[\(\)])/g); //regex for splitting on ( or ) and leaving the character

  let i = 0;
  while(splitStr.length !== 1) {
    if(splitStr[i] === ')') {
      let [leftOp, val, rightOp] = computeBEDMAS(splitStr[i-1]);
      let str = (leftOp? leftOp : "") + String(val) + (rightOp? rightOp : "");

        ///asdf j;fsjdklkafjkdsfljakldfsalkjfdslkfdskdslsdflksdfljksdls;fdalsjdf (check if the right side can also be merged)
      //check if str can be merged with i-3
      let leftOff = 2
      if(splitStr[i-3] !== undefined && splitStr[i-3] !== ')' && splitStr[i-3] !== '(') {
        str = splitStr[i-3] + str;
        leftOff = 3;
      }

      //remove the brackets and insert the value
      splitStr = [...splitStr.slice(0, i-leftOff), str, ...splitStr.slice(i+1, splitStr.length)]; //since the format is ( ,stuff, ) and we are at )
      i = 0;
      console.log(splitStr);
    }
    i++;
  }

  return splitStr[0];
}

function computeBEDMAS(string: any) {
  let splitStr = string.split(/(?=[+*//])|(?<=[+*//])/g);//splits based on the operator and leaves it in as it's own character
  let leftOp;
  let rightOp;

  //remove the left and right operators if they exist
  if(isNaN(splitStr[0])) {
    leftOp = splitStr.shift(); //returns the first element and removes it from the array
  } 
  if(isNaN(splitStr[splitStr.length - 1])) {
    rightOp = splitStr.pop();
  }

  //covert everything that is a number to a number
  for(let i = 0; i < splitStr.length; i++) {
    if(!isNaN(splitStr[i])) {
      splitStr[i] = Number(splitStr[i]);
    }
  }

  //division/multiplication
  for(let i = 0; i < splitStr.length; i++) {
    if(splitStr[i] === '/') {
      let val = splitStr[i-1] / splitStr[i+1];
      splitStr = [...splitStr.slice(0, i-1), val, ...splitStr.slice(i+2, splitStr.length)];
      i--;
    } else if(splitStr[i] === '*') {
      let val = splitStr[i-1] * splitStr[i+1];
      splitStr = [...splitStr.slice(0, i-1), val, ...splitStr.slice(i+2, splitStr.length)];
      i--;
    }
  }

  //addtion/subtraction
  for(let i = 0; i < splitStr.length; i++) {
    if(splitStr[i] === '+') {
      let val = splitStr[i-1] + splitStr[i+1];
      splitStr = [...splitStr.slice(0, i-1), val, ...splitStr.slice(i+2, splitStr.length)];
      i--;
    }
  }

    return [leftOp, splitStr[0], rightOp];
  }

  useEffect(() => {
    console.log(strStack);
  }, [strStack]);


  return [dispResult, pushToCalculator, result, isAC, strStack] as const;
}
