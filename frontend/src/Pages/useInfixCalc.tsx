import { useState, useEffect, useCallback } from "react";

export default function useInfixCalc() {
  const [total, setTotal] = useState<number>(0);
  const [strStack, setStrStack] = useState<string>('');
  const [firstVal, setFirstVal] = useState(true);
  const [nextOperation, setNextOperation] = useState<string>('');

  //shove this into a useEffect for strStack
  //and create a function that only 
  const pushToCalculator = (lastChar: string): void => {

    const isLastCharOp = (lastChar === '-' || lastChar === '+' || lastChar === '/' || lastChar === '*' || lastChar === '=');

    if(isLastCharOp) {
      setFirstVal(false);
      console.log('firstVal func', firstVal)
      if(firstVal) {
        setTotal(Number(strStack));
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
            break;
        }
      }

      setNextOperation(lastChar);
    } else {
      setStrStack(curStack => curStack + lastChar);
    }

  };


  useEffect(() => {
    console.log(firstVal, "first Val useEff");
  }, [firstVal])
  
  return [total, pushToCalculator] as const
}