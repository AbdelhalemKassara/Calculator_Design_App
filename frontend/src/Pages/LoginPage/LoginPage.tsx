import React, { useRef, useState } from 'react'
import Styles from './styles.module.css';

interface Props {
  setUserName : (name: string) => void;
}

export default function LoginPage({setUserName}: Props) {
  const [userNameInput, setUserNameInput] = useState('');

  return (<>
      <p className={Styles.p}>User Name: </p>
      <input type='text'  value={userNameInput} onChange={
        (event: React.ChangeEvent<HTMLInputElement>) => {
          setUserNameInput(event.target.value);
        }
      }></input>
      <button onClick={(e) => {
        if(userNameInput !== '') {
          setUserName(userNameInput);
        }
        }}
        className={Styles.button}>Submit</button>
  </>)
}