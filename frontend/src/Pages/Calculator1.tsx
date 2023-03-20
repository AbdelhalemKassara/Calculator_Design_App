import React from 'react'
import PageButtons from '../components/PageButtons/PageButtons'
import styles from './styles.module.css';

export default function Calculator1() {
  return (<>
    <div className={styles.textContainer}></div>
      <PageButtons calcType='infix'/>
  </>)
}
