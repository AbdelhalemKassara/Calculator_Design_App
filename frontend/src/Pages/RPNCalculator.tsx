import React from 'react'
import PageButtons from '../components/PageButtons/PageButtons'
import styles from './styles.module.css';

export default function RPNCalculator() {
  function pushToCalculator() {}
  return (<>
    <div className={styles.textContainer}>

    </div>
      <PageButtons calcType='rpn' pushToCalculator={pushToCalculator}/>
  </>)
}
