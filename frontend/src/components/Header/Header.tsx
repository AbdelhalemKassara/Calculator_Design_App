import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './styles.module.css';

export default function Header() {
  return (<div className={Styles.header}>
    <Link to='/infix' className={Styles.link}>Infix</Link>
    <Link to='/rpn' className={Styles.link}>RPN</Link>
    <Link to='/brackets' className={Styles.link}>Brackets</Link>
  </div>)
}
