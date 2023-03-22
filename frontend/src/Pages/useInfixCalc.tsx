import { useState, useEffect, useCallback } from "react";

export default function useInfixCalc() {
  const [total, setTotal] = useState<number>(0);
  const [strStack, setStrStack] = useState<string>('');
  const [firstVal, setFirstVal] = useState(true);
  const [nextOperation, setNextOperation] = useState<string>('');
  const [dispVal, setDispVal] = useState<string>('');

  //shove this into a useEffect for strStack
  //and create a function that only 
  const pushToCalculator = (lastChar: string): void => {

    if(lastChar === 'c') {
      if(strStack === '') {
        setTotal(0);
        setFirstVal(true);
      } 
      setStrStack('');
    }

    const isLastCharOp = (lastChar === '-' || lastChar === '+' || lastChar === '/' || lastChar === '*' || lastChar === '=');
     
    if(isLastCharOp) {
      console.log('firstVal func', firstVal)
      if(firstVal) {
        setTotal(Number(strStack));
        setFirstVal(false);
        setStrStack('');
      } else {
        switch(nextOperation) {
          case '-':
            setTotal(curTotal => curTotal - Number(strStack.slice(0, strStack.length-2)));
            setStrStack('');
            break;
          case '+':
            setTotal(curTotal => curTotal + Number(strStack.slice(0, strStack.length-2)));
            setStrStack('');
            break;
          case '*':
            setTotal(curTotal => curTotal * Number(strStack.slice(0, strStack.length-2)));
            setStrStack('');
            break;
          case '/':
            setTotal(curTotal => curTotal / Number(strStack.slice(0, strStack.length-2)));
            setStrStack('');
            break;
          case '=':
            setStrStack('');
            setDispVal(total.toString());
            break;
        }
      }

      setNextOperation(lastChar);
    } else {
      setStrStack(curStack => {
        const updatedStack = curStack + lastChar;
        setDispVal(updatedStack);
        return updatedStack;
      });
    }
  };

  
  return [dispVal, pushToCalculator] as const
}