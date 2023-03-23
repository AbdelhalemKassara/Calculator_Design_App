import React from 'react'
import styles from './styles.module.css';

interface Props {
  calcType : 'infix' | 'rpn' | 'brack';
  pushToCalculator: Function,
  isAC: Function
}

export default function PageButtons({calcType, pushToCalculator, isAC} : Props) {
  const buttonStyle = (calcType === 'brack'? styles.buttonR6 : styles.buttonR5);

  return (<>
    <div className={styles.buttonContainer}>
      {(() => {
        if(calcType === 'brack') {
          return (<>
            <button className={`${buttonStyle} ${styles.optionBut}`} onClick={() => pushToCalculator('(')}>(</button>
            <button className={`${buttonStyle} ${styles.optionBut}`} onClick={() => pushToCalculator(')')}>)</button>
            <div className={styles.divPlaceholder}></div>
            <div className={styles.divPlaceholder}></div>
          </>);
        } else {
          return (<></>);
        }
      })()}

      <button className={`${buttonStyle} ${styles.optionBut}`} onClick={() => pushToCalculator('c')}>{isAC()? 'AC' : 'C'}</button>
      <button className={`${buttonStyle} ${styles.optionBut}`}>M</button>
      <button className={`${buttonStyle} ${styles.optionBut}`}>MR</button>
      <button className={`${buttonStyle} ${styles.operationBut}`} onClick={() => pushToCalculator('/')}>/</button>

      <button className={`${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('7')}>7</button>
      <button className={`${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('8')}>8</button>
      <button className={`${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('9')}>9</button>
      <button className={`${buttonStyle} ${styles.operationBut}`} onClick={() => pushToCalculator('*')}>x</button>

      <button className={`${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('4')}>4</button>
      <button className={`${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('5')}>5</button>
      <button className={`${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('6')}>6</button>
      <button className={`${buttonStyle} ${styles.operationBut}`} onClick={() => pushToCalculator('-')}>-</button>
      
      <button className={`${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('1')}>1</button>
      <button className={`${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('2')}>2</button>
      <button className={`${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('3')}>3</button>
      <button className={`${buttonStyle} ${styles.operationBut}`} onClick={() => pushToCalculator('+')}>+</button>

      <button className={`${styles.But0} ${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('0')}>0</button>
      <button className={`${buttonStyle} ${styles.numberBut}`} onClick={() => pushToCalculator('.')}>.</button>
      <button className={`${buttonStyle} ${calcType === 'brack' ? styles.butEqBrack : ''} ${styles.operationBut}`} onClick={() => pushToCalculator('=')}>{calcType === 'rpn' ? 'enter' : '='}</button>
    </div>

  </>)
}

//sketch out the ui
//calculator 1:
/*
0-9, ., +, -, *, /, =, CE/C (C), M, MR (r)

C m r / 
7 8 9 *
4 5 6 -
1 2 3 +
0   . =
*/

//calculator 2:
/*
  0-9, ., +, -, *, /, enter (e), CE/C (C), M, MR (r),

C m r / 
7 8 9 *
4 5 6 -
1 2 3 +
0   . e
*/

//calculator 3:
/*
0-9, ., +, -, *, /, =, (, ), CE/C (C), M, MR (r), +/- (p)

( ) p /
C m r * 
7 8 9 -
4 5 6 +
1 2 3 =
0 0 . =
*/
