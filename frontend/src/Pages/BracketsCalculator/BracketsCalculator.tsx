import React from 'react'
import PageButtons from '../../components/PageButtons/PageButtons'
import styles from '../styles.module.css';
import useBracketsCalc from './useBracketsCalc';

interface Props {
  userName: string
}

export default function BracketsCalculator({userName}: Props) {
  const  [dispResult, pushToCalculator, result, isAC, strStack] = useBracketsCalc(userName);

  return (<>
    <div className={styles.textContainer}>
      <p>{dispResult ? result : strStack}</p>
    </div>
      <PageButtons calcType='brack' pushToCalculator={pushToCalculator} isAC={isAC}/>
  </>)
}
