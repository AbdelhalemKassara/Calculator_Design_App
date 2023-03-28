import React, { useRef, useEffect } from 'react'
import PageButtons from '../../components/PageButtons/PageButtons'
import useRPNCalc from './useRPNCalc';
import styles from './styles.module.css';

export default function RPNCalculator() {
  const [pushToCalculator, isAC, curVal, stack] = useRPNCalc();
  const stackValues = useRef<HTMLDivElement>(null);
  
  function buttonScroll(up: boolean) {
    if(stackValues.current !== null) {
      const firstParagraph = stackValues.current?.querySelector('p:first-of-type');
      if (firstParagraph && firstParagraph instanceof HTMLElement) {
        stackValues.current!.scrollTop += up ? -firstParagraph.offsetHeight : firstParagraph.offsetHeight;
      }
    }
  }
  
  useEffect(() => {
    //whenever the stack length changes it will re render and display the values
    //it will automatically scroll the display to the top so this forces it to start at the bottom
    if(stackValues.current !== null) {
      const firstParagraph = stackValues.current?.querySelector('p:first-of-type');
      if (firstParagraph && firstParagraph instanceof HTMLElement) {
        stackValues.current!.scrollTop += firstParagraph.offsetHeight * stack.length;
      }
    }
  }, [stack.length]);

  return (<>
    <div className={styles.displayContainer}>
      <div className={styles.textContainer} ref={stackValues}>
        {stack.map((val, i) => {
          if(i !== stack.length-1) {
            return (<>
              <br/>
              <p>{val}</p>
            </>)
          } else {
            return (<></>);
          }
        })}

        {/*when only the current value is in the stack the current digit is at the top, this pushes it to the bottom*/}
        {stack.length === 1? (<><br/><p></p></>) : <></>}

        <br/>
        <p>{curVal}</p>
      </div>

      <div className={styles.buttonsContainer}>
        <button className={styles.arrowButton} onClick={() => buttonScroll(true)}>▲</button>
        <button className={styles.arrowButton} onClick={() => buttonScroll(false)}>▼</button>
      </div>
    </div>
      <PageButtons calcType='rpn' pushToCalculator={pushToCalculator} isAC={isAC}/>
  </>)
}


