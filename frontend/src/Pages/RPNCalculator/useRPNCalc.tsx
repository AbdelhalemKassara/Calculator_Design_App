import React, { useState } from 'react'

export default function useRPNCalc() {
  const [stack, setStack] = useState<Array<number>>([0]);
  const [hasDot, setHasDot] = useState<boolean>(false);
  const [dpCounter, setDpCounter] = useState<number>(1);//this is needed because of 'rounding error' for floating point numbers repating digit ex 0.005 = 0.004999999999

  function pushToCalculator(nextChar: string) {
    if(nextChar === '+' || nextChar === '-' || nextChar === '*' || nextChar === '/') {
      computeVals(nextChar);//need check if user presses multiple times
    } 
    else if(nextChar === '=') {
      setHasDot(false);
      setDpCounter(0);

      setStack(cur => {
        let updated = [...cur];
        updated.push(0);
        return updated;
      });
    } 
    else if(nextChar === 'c') {
      setDpCounter(0);
      setHasDot(false);
      if(stack[stack.length-1] === 0) {//clear the stack 
        setStack([0]);
      } else {//set the last element to zero
        setStack(cur => {
          let tempArr = [...cur];
          tempArr[tempArr.length-1] = 0;
          return tempArr;
        });
      }
    } else if(nextChar === '.') {
      setHasDot(true);
    }
    else {
      setStack(cur => {
        let tempStack = [...cur];
        let i = tempStack.length-1;

        if(!hasDot) {
          tempStack[i] = tempStack[i] * 10 + Number(nextChar);
        } else {
          tempStack[i] = Number(tempStack[i].toFixed(dpCounter)) + Number(nextChar) / (Math.pow(10, dpCounter));//this fixes most issues with storing the current value as a number but it will probably better to change the current value back to a string and convert when needed
          setDpCounter(dpCounter+1);
        }

        return tempStack;
      });

    } 
  }

  function computeVals(operation:('+' | '-' | '/' | '*')) {
    setHasDot(false);
    setDpCounter(0);

    setStack(cur => {
      let updated = [...cur];
      let lastVal = updated.pop();
      let valBefore = updated.pop();

      if(lastVal !== undefined && valBefore !== undefined) {
        updated.push(performOperation(valBefore, operation, lastVal));
        return updated;
      } 
      else {
        return cur;
      }
    });
  }

  function isAC() {
    return stack[stack.length-1] === 0;
  }

  return [pushToCalculator, isAC, stack[stack.length-1]] as const;
}




function performOperation(val1:number, operation:('+' | '-' | '/' | '*'), val2:number) {
	switch (operation) {
		case '-':
			return val1 - val2;
		case '+':
			return val1 + val2;
		case '/':
			return val1 / val2;
		case '*':
			return val1 * val2;
	}
}