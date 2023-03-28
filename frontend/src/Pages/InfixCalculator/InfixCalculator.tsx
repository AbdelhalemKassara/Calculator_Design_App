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
  //const [keyPressed] = useState(() => {return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'c', '/', '*', '+', '-', '.', '=']});
  const [getDispVal, pushToCalculator, isAC, nextOperation] = useInfixCalc(userName);
  
  /*
  useEffect(() => {
    document.addEventListener('keyup', checkKey);

    function checkKey(e: KeyboardEvent) {
      if(keyPressed.find(val => e.key === val)) {
        pushToCalculator(e.key);
      }
    }
    return () => document.removeEventListener('keyup', checkKey);
  }, [])
  */
  
  return (<>
    <div className={styles.textContainer}>
      <p>{getDispVal()}</p>
      <br/>
      <p className={styles.operation}>{nextOperation}</p>
    </div>
      <PageButtons calcType='infix' pushToCalculator={pushToCalculator} isAC={isAC}/>
  </>)
}

