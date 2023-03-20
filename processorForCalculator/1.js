//this takes in a string and processes it as s simple 4-function calculator (1)

//we will assume the user can't enter in multiple dots for one number or before any digits are seen
//we will assume the user can't enter in more than one operators in a row
function processString(inString) {

	let splitStr = inString.split(/([+-/*])/); //regex for splitting on +, -, /, or *	
	if (splitStr.length >= 3) {//so there is 2 values and an operator
		let total = Number(splitStr[0]);

		for (let i = 1; i < splitStr.length; i += 2) {
			let operator = splitStr[i];
			let curVal = Number(splitStr[i + 1]);
			total = performOperation(total, operator, curVal);
		}
		return total;
	}

	return null;
}

function performOperation(val1, operation, val2) {
	switch (operation) {
		case '-':
			return val1 - val2;
		case '+':
			return val1 + val2;
		case '/':
			return val1 / val2;
		case '*':
			return val1 * val2;
	}
}

console.log(processString("1 + 2 + 3 /6 - 3 * 10"))