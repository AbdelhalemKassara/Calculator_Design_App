import React from 'react'
import PageButtons from '../components/PageButtons/PageButtons'
import styles from './styles.module.css';

export default function BracketsCalculator() {
  function pushToCalculator() {}
  function isAC() {}
  return (<>
    <div className={styles.textContainer}>
      
    </div>
      <PageButtons calcType='brack' pushToCalculator={pushToCalculator} isAC={isAC}/>
  </>)
}
