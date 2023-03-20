import React from 'react'
import styles from './styles.module.css';
import R5Styles from './R5Styles.module.css';
import R6Styles from './R6Styles.module.css';

interface Props {
  calcType : 'infix' | 'rpn' | 'brack';
}

export default function PageButtons({calcType} : Props) {
  const buttonStyle = (calcType === 'brack'? styles.buttonR6 : styles.buttonR5);

  return (<>
    <div className={styles.buttonContainer}>
      {(() => {
        if(calcType === 'brack') {
          return (<>
            <button className={`${buttonStyle} ${styles.optionBut}`}>(</button>
            <button className={`${buttonStyle} ${styles.optionBut}`}>)</button>
            <button className={`${buttonStyle} ${styles.optionBut}`}>+/-</button>
            <div></div>
          </>);
        } else {
          return (<></>);
        }
      })()}

      <button className={`${buttonStyle} ${styles.optionBut}`}>AC</button>
      <button className={`${buttonStyle} ${styles.optionBut}`}>M</button>
      <button className={`${buttonStyle} ${styles.optionBut}`}>MR</button>
      <button className={`${buttonStyle} ${styles.operationBut}`}>/</button>

      <button className={`${buttonStyle} ${styles.numberBut}`}>7</button>
      <button className={`${buttonStyle} ${styles.numberBut}`}>8</button>
      <button className={`${buttonStyle} ${styles.numberBut}`}>9</button>
      <button className={`${buttonStyle} ${styles.operationBut}`}>X</button>

      <button className={`${buttonStyle} ${styles.numberBut}`}>4</button>
      <button className={`${buttonStyle} ${styles.numberBut}`}>5</button>
      <button className={`${buttonStyle} ${styles.numberBut}`}>6</button>
      <button className={`${buttonStyle} ${styles.operationBut}`}>-</button>
      
      <button className={`${buttonStyle} ${styles.numberBut}`}>1</button>
      <button className={`${buttonStyle} ${styles.numberBut}`}>2</button>
      <button className={`${buttonStyle} ${styles.numberBut}`}>3</button>
      <button className={`${buttonStyle} ${styles.operationBut}`}>+</button>

      <button className={`${styles.But0} ${buttonStyle} ${styles.numberBut}`}>0</button>
      <button className={`${buttonStyle} ${styles.numberBut}`}>.</button>
      <button className={`${buttonStyle} ${calcType == 'brack' ? styles.butEqBrack : ''} ${styles.operationBut}`}>=</button>
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
