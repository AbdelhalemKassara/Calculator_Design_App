//takes in brackets (BEDMAS) LEFT TO RIGHT
//assuming correct brackets
//make sure that there aren't an operators at the 'ends' so (+v+) is not allowed
//assuming that subtraction does exist but adding a negative numbers does
function processString(inString) {
  if(inString === "") {
    return undefined;
  }

  inString = "(" + inString + ")";
  let splitStr = inString.split(/(?=[\(\)])|(?<=[\(\)])/g); //regex for splitting on ( or ) and leaving the character

  let i = 0;
  while(splitStr.length !== 1) {
    if(splitStr[i] === ')') {
      let [leftOp, val, rightOp] = computeBEDMAS(splitStr[i-1]);
      let str = (leftOp? leftOp : "") + String(val) + (rightOp? rightOp : "");

        ///asdf j;fsjdklkafjkdsfljakldfsalkjfdslkfdskdslsdflksdfljksdls;fdalsjdf (check if the right side can also be merged)
      //check if str can be merged with i-3
      let leftOff = 2
      if(splitStr[i-3] !== undefined && splitStr[i-3] !== ')' && splitStr[i-3] !== '(') {
        str = splitStr[i-3] + str;
        leftOff = 3;
      }

      //remove the brackets and insert the value
      splitStr = [...splitStr.slice(0, i-leftOff), str, ...splitStr.slice(i+1, splitStr.length)]; //since the format is ( ,stuff, ) and we are at )
      i = 0;
      console.log(splitStr);
    }
    i++;
  }

  return splitStr[0];
}

function computeBEDMAS(string) {
  let splitStr = string.split(/(?=[+*//])|(?<=[+*//])/g);//splits based on the operator and leaves it in as it's own character
  let leftOp;
  let rightOp;

  //remove the left and right operators if they exist
  if(isNaN(splitStr[0])) {
    leftOp = splitStr.shift(); //returns the first element and removes it from the array
  } 
  if(isNaN(splitStr[splitStr.length - 1])) {
    rightOp = splitStr.pop();
  }

  //covert everything that is a number to a number
  for(let i = 0; i < splitStr.length; i++) {
    if(!isNaN(splitStr[i])) {
      splitStr[i] = Number(splitStr[i]);
    }
  }

  //division/multiplication
  for(let i = 0; i < splitStr.length; i++) {
    if(splitStr[i] === '/') {
      let val = splitStr[i-1] / splitStr[i+1];
      splitStr = [...splitStr.slice(0, i-1), val, ...splitStr.slice(i+2, splitStr.length)];
      i--;
    } else if(splitStr[i] === '*') {
      let val = splitStr[i-1] * splitStr[i+1];
      splitStr = [...splitStr.slice(0, i-1), val, ...splitStr.slice(i+2, splitStr.length)];
      i--;
    }
  }

  //addtion/subtraction
  for(let i = 0; i < splitStr.length; i++) {
    if(splitStr[i] === '+') {
      let val = splitStr[i-1] + splitStr[i+1];
      splitStr = [...splitStr.slice(0, i-1), val, ...splitStr.slice(i+2, splitStr.length)];
      i--;
    }
  }

  return [leftOp, splitStr[0], rightOp];
}

console.log(processString("154/(14*(1+-2))"));
/*
o = operator
v = value (or value to compute)

ovo(ovo)ovo
((ovo)ovo)ovo

c
  c
*/

//this will be continuously counted while the user enters values
function validBrackets(str) {
  let count = 0;
  for(let i = 0; i < str.length; i++) {
    if(str.charAt(i) === ')') {
      count--;
    } else if(str.charAt(i) === '(') {
      count++;
    }

    if (count < 0) {
      return false;
    }
  }
  
  return count === 0;
}

