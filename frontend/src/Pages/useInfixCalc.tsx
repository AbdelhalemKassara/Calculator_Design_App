import { useState, useEffect, useCallback } from "react";

type state = 'total' | 'strStack';

export default function useInfixCalc() {
  const [total, setTotal] = useState<number>(0);
  const [strStack, setStrStack] = useState<string>('');
  const [firstVal, setFirstVal] = useState(true);
  const [nextOperation, setNextOperation] = useState<string>('');
  const [dispVal, setDispVal] = useState<state>('total');

  //shove this into a useEffect for strStack
  //and create a function that only 
  const pushToCalculator = (lastChar: string): void => {

    if(lastChar === 'c') {
      if(strStack === '') {
        setTotal(0);
        setFirstVal(true);
      } 
      setStrStack('');
      setDispVal('strStack');
      return;
    }
     
    if(lastChar === '-' || lastChar === '+' || lastChar === '/' || lastChar === '*' || lastChar === '=') {
      if(firstVal) {
        setTotal(Number(strStack));
        setFirstVal(false);
        setStrStack('');
      } else {
        switch(nextOperation) {
          case '-':
            setTotal(curTotal => curTotal - Number(strStack));
            setStrStack('');
            break;
          case '+':
            setTotal(curTotal => curTotal + Number(strStack));
            setStrStack('');
            break;
          case '*':
            setTotal(curTotal => curTotal * Number(strStack));
            setStrStack('');
            break;
          case '/':
            setTotal(curTotal => curTotal / Number(strStack));
            setStrStack('');
            break;
          case '=':
            setStrStack('');
            break;
        }
        setDispVal('total');
      }

      setNextOperation(lastChar);
    } else {
      setStrStack(curStack => curStack + lastChar);
      setDispVal('strStack');
    }
    
  };


  function getDispVal() {
    if(dispVal === 'strStack') {
      return strStack;
    } else {
      return total;
    }
  }

  function isAC() {
    return strStack.length === 0;
  }
  
  return [getDispVal, pushToCalculator, isAC] as const
}