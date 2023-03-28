import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Styles from './styles.module.css';

interface Props {
  setUserName: (name: string) => void;
}

export default function Header({ setUserName } : Props): JSX.Element {
  const location = useLocation();
  const path = location.pathname;

  return (<div className={Styles.header}>
    <div className={Styles.headerPages}>
      <Link to='/infix' className={`${Styles.link} ${path === '/infix' ? Styles.curLink : ''}`}>Infix</Link>
      <Link to='/rpn' className={`${Styles.link} ${path === '/rpn' ? Styles.curLink : ''}`}>RPN</Link>
      <Link to='/brackets' className={`${Styles.link} ${path === '/brackets' ? Styles.curLink : ''}`}>Brackets</Link>
    </div>
  </div>)
}
