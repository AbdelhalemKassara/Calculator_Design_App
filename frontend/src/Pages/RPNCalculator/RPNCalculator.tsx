import React from 'react'
import PageButtons from '../../components/PageButtons/PageButtons'
import styles from '../styles.module.css';
import useRPNCalc from './useRPNCalc';

export default function RPNCalculator() {
  const [pushToCalculator, isAC, curVal] = useRPNCalc();
  return (<>
    <div className={styles.textContainer}>
      <p>{curVal}</p>
    </div>
      <PageButtons calcType='rpn' pushToCalculator={pushToCalculator} isAC={isAC}/>
  </>)
}
