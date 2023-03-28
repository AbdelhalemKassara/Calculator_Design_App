import React, { useState, useEffect } from 'react'
import useKeyLogger from '../../components/KeyLogger/useKeyLogger';

export default function useBracketsCalc(userName: string) {
  const [strStack, setStrStack] = useState<string>('');
  const [result, setResult] = useState<number>(0);
  const [dispResult, setDispResult] = useState<boolean>(false);
  const [bracketsCount, setBrackCount] = useState<number>(0);
  const [operations] = useState(() => {return ['/', '*', '+', '-']});
  const [logKey] = useKeyLogger(userName, 'brackets');
  const [memory, setMemory] = useState('');

  function pushToCalculator(nextChar: string) {
    logKey(nextChar);
    
    if(nextChar === '=') {
      let prevChar = strStack.charAt(strStack.length-1);
      if(prevChar !== '(') {
        calculateResult();
        setDispResult(true);
        return;  
      }
    } else if(nextChar === 's') {
      setMemory(strStack);
    } else if(nextChar === 'r') {
      setStrStack(memory);
    }
    else if(nextChar === 'c') {
      setStrStack('');
    } 
    else if(nextChar === '(') {
      //check if there is an operation before adding a '('
      const prevChar = strStack.charAt(strStack.length-1);
      if(prevChar === '(' || operations.find(op => op === prevChar)) {
        setBrackCount(curCount => curCount + 1);
        setStrStack(curStr => curStr + nextChar);  
      }
    } 
    else if (nextChar === ')') {
      let prevChar = strStack.charAt(strStack.length-1);
      if(bracketsCount-1 >= 0 && prevChar !== '(') {
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
      //checks if the previous is not an operation or an opening bracket
      const prevChar = strStack.charAt(strStack.length-1);
      if(!operations.find(op => op === prevChar) && prevChar !== '(') {
        setStrStack(curStr => curStr + nextChar);
      }
    } else if(!Number.isNaN(nextChar)) {

      setStrStack(curStr => {
        if(curStr.charAt(curStr.length-1) === ')') {
        return curStr
        } else {
          return curStr + nextChar;
        }
      });
    }

    setDispResult(false);
  }


  function calculateResult() {
    //do some checking here to see if there is any bad formatting

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

 

  return [dispResult, pushToCalculator, result, isAC, strStack] as const;
}



//takes in brackets (BEDMAS) LEFT TO RIGHT
//assuming correct brackets
//make sure that there aren't an operators at the 'ends' so (+v+) is not allowed
//bedmas function (also this) doesn't accept negative numbers
function processString(inString: any) {
  if(inString === "") {
    return undefined;
  }

  inString = "(" + inString + ")";
  let splitStr = inString.split(/(?=[\(\)])|(?<=[\(\)])/g); //regex for splitting on ( or ) and leaving the character

  let i = 0;
  while(splitStr.length !== 1) {

    if(splitStr[i] === ')') {
      let str = computeBEDMAS(splitStr[i-1]);

      //check if str can be merged with i-3 (the left side)
      let leftOff = 2
      if(splitStr[i-3] !== undefined && splitStr[i-3] !== ')' && splitStr[i-3] !== '(') {
        str = splitStr[i-3] + str;
        leftOff = 3;
      }

      //check if str can be merged with i+1 (the right side)
      let rightOff = i+1;
      if(splitStr[rightOff] !== undefined && splitStr[rightOff] !== '(' && splitStr[rightOff] !== ')') {
        str += splitStr[rightOff];
        rightOff++;
      }
      //remove the brackets and insert the value
      splitStr = [...splitStr.slice(0, i-leftOff), str, ...splitStr.slice(rightOff, splitStr.length)]; //since the format is ( ,stuff, ) and we are at )
      i = 0;
    }
    i++;
  }

  return splitStr[0];
}

function computeBEDMAS(string: any) {
  let splitStr = string.split(/(?=[+*-//])|(?<=[+*-//])/g);//splits based on the operator and leaves it in as it's own character
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
    } else if(splitStr[i] === '-') {
      let val = splitStr[i-1] - splitStr[i+1];
      splitStr = [...splitStr.slice(0, i-1), val, ...splitStr.slice(i+2, splitStr.length)];
      i--;
    }
  }
  return splitStr[0];
}