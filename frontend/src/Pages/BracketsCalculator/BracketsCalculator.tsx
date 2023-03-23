import React from 'react'
import PageButtons from '../../components/PageButtons/PageButtons'
import styles from '../styles.module.css';
import useBracketsCalc from './useBracketsCalc';

export default function BracketsCalculator() {
  const  [dispResult, pushToCalculator, result, isAC, strStack] = useBracketsCalc();

  return (<>
    <div className={styles.textContainer}>
      <p>{dispResult ? result : strStack}</p>
    </div>
      <PageButtons calcType='brack' pushToCalculator={pushToCalculator} isAC={isAC}/>
  </>)
}
