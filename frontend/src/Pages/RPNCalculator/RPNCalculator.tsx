import React, { useRef } from 'react'
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
  
  return (<>
    <div className={styles.displayContainer}>
      <div className={styles.textContainer} ref={stackValues}>
        <p>{curVal}</p>
        <br/>
        <p>{curVal}</p> <br/>
        <p>{curVal}</p> <br/>
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


