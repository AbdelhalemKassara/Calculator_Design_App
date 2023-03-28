import { useEffect, useState } from "react";
import useKeyLogger from "../../components/KeyLogger/useKeyLogger";

export default function useInfixCalc(userName: string) {
  const [total, setTotal] = useState<number>(0);
  const [strStack, setStrStack] = useState<string>('');
  const [firstVal, setFirstVal] = useState(true);
  const [nextOperation, setNextOperation] = useState<string>('');
  const [dispVal, setDispVal] = useState<('total' | 'strStack')>('total');
  const [usedDot, setUsedDot] = useState<boolean>(false);
  const [logKey] = useKeyLogger(userName, 'infix');
  const [memory, setMemory] = useState<string>('');

  //shove this into a useEffect for strStack
  //and create a function that only 
  const pushToCalculator = (lastChar: string): void => {
    logKey(lastChar);

    if(lastChar === 'c') {
      setUsedDot(false);
      if(strStack === '') {
        setTotal(0);
        setNextOperation('');
        setFirstVal(true);
      } 
      setStrStack('');
      setDispVal('strStack');
      return;
    } else if(lastChar === 's') {
      setMemory(strStack);
      return;
    } else if(lastChar === 'r') {
      setStrStack(memory);
      return;
    }
     
    if(lastChar === '-' || lastChar === '+' || lastChar === '/' || lastChar === '*' || lastChar === '=') {
      
      if(firstVal) {
        setTotal(Number(strStack));
        setFirstVal(false);
      } else {
        switch(nextOperation) {
          case '-':
            setTotal(curTotal => curTotal - Number(strStack));
            break;
          case '+':

            setTotal(curTotal => {
              return curTotal + Number(strStack)});
            break;
          case '*':
            setTotal(curTotal => curTotal * Number(strStack));
            break;
          case '/':
            setTotal(curTotal => curTotal / Number(strStack));
            break;
          case '=':
            break;
        }
        setDispVal('total');
      }

      setUsedDot(false);
      setStrStack(() => '');
      setNextOperation(lastChar);
    } else {
      if(lastChar === '.' && !usedDot) {
        setStrStack(curStack => curStack + lastChar);
        setDispVal('strStack');
        setUsedDot(true);
      } else if(lastChar !== '.') {
        setStrStack(curStack => curStack + lastChar);
        setDispVal('strStack');
      }

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
  
  return [getDispVal, pushToCalculator, isAC, nextOperation] as const
}