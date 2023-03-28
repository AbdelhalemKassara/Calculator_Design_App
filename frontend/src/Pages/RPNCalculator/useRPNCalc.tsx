import React, { useState } from 'react'

export default function useRPNCalc() {
  const [stack, setStack] = useState<Array<number>>([0]);
  const [curVal, setCurVal] = useState<string>('0');//we are using a string for the current value as we can't store the value accuratly as a number because of floating point number error, ex 0.005 = 0.004999999999

  function pushToCalculator(nextChar: string) {
    if(nextChar === '+' || nextChar === '-' || nextChar === '*' || nextChar === '/') {
      computeVals(nextChar);//need check if user presses multiple times
    } 
    else if(nextChar === '=') {
      setCurVal('0');
      setStack(cur => {
        let updated = [...cur];
        updated.push(0);
        return updated;
      });
    } 
    else if(nextChar === 'c') {
      setCurVal('0');

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
      setCurVal(cur => cur + '.');
    }
    else {
      setStack(cur => {
        let tempStack = [...cur];
        let i = tempStack.length-1;

        let newVal = (curVal === '0' ? '' : curVal) + nextChar;
        setCurVal(newVal);
        tempStack[i] = Number(newVal);
      
        return tempStack;
      });

    } 
  }

  function computeVals(operation:('+' | '-' | '/' | '*')) {
   
    setStack(cur => {
      let updated = [...cur];
      updated[updated.length-1] = Number(curVal);
      let lastVal = updated.pop();
      let valBefore = updated.pop();

      if(lastVal !== undefined && valBefore !== undefined) {
        updated.push(performOperation(valBefore, operation, lastVal));
        setCurVal(String(updated[updated.length-1]));
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

  return [pushToCalculator, isAC, curVal] as const;
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