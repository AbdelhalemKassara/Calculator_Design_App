//assume we can't do subtraction but we can add a neagtive number
//the values are already in an array
//https://leetcode.com/problems/evaluate-reverse-polish-notation/description/
function processString(inArray) {
  let stack = [];

  for(let i = 0; i < inArray.length; i++) {
    let val1;
    let val2;

    if(inArray[i] === "+") {
      val2 = stack.pop();
      val1 = stack.pop();
      val1 += val2;
      stack.push(val1);
    } else if (inArray[i] === "-") {
      val2 = stack.pop();
      val1 = stack.pop();
      val1 -= val2;
      stack.push(val1);
    } else if (inArray[i] === "*") {
      val2 = stack.pop();
      val1 = stack.pop();
      val1 *= val2;
      stack.push(val1);
    } else if (inArray[i] === "/") {
      val2 = stack.pop();
      val1 = stack.pop();
      val1 /= val2;

      if(val1 < 0) {
        val1 *= -1; //math.floor rounds down for negative numbers (not up towards 0)
        stack.push(Math.floor(val1) * -1);    
      } else {
        stack.push(Math.floor(val1));
      }

    } else {
      stack.push(Number(inArray[i]));
    }
  }
  return stack[0];
};


processString