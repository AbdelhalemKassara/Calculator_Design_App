import React, {useState, useEffect} from 'react'
import PageButtons from '../../components/PageButtons/PageButtons'
import useInfixCalc from './useInfixCalc';
import styles from '../styles.module.css';
import useKeyLogger from '../../components/KeyLogger/useKeyLogger';
const { ipcRenderer } = window.require('electron');

interface Props {
  userName : string
}
export default function InfixCalculator({userName} : Props): JSX.Element {
  const [getDispVal, pushToCalculator, isAC, nextOperation] = useInfixCalc(userName);
  
  return (<>
    <div className={styles.textContainer}>
      <p>{getDispVal()}</p>
      <br/>
      <p className={styles.operation}>{nextOperation}</p>
    </div>
      <PageButtons calcType='infix' pushToCalculator={pushToCalculator} isAC={isAC}/>
  </>)
}

