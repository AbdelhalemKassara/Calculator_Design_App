import React from 'react'
const { ipcRenderer } = window.require('electron');

interface LogObj {
  userName : string,
  calcType : ('infix' | 'rpn' | 'brackets'),
  key : string,
  time : number //the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).
}

export default function useKeyLogger(userName : string, calcType : ('infix' | 'rpn' | 'brackets')) {

  function logKey(key: string) {
    let out: LogObj = {
      userName: userName,
      calcType: calcType,
      key: key,
      time: Date.now()
    }

    ipcRenderer.send('my-message', out);
  }

  return [logKey] as const;
}