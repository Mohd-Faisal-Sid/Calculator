const resultElement = document.getElementById('result');
const clrbtn = document.getElementById('clear-button');
const delbtn = document.getElementById('delete-button');
const divbtn = document.getElementById('divide-button');
const mulbtn = document.getElementById('multiplication-button');
const subbtn = document.getElementById('substraction-button');
const addbtn = document.getElementById('addition-button');
const decbtn = document.getElementById('decimal-button');
const eqlbtn = document.getElementById('equal-button');
const numbtns = document.querySelectorAll('.number');

// Intialized the Variable
let result ="";
let operation="";
let previousoprand = 0;

// function to select oprator
const selectOperator =(operatorValue) =>{
    if(result === '')  return;
    
    if (operation !== '' && previousoprand !== ''){
        calculateResult();
    }
    operation = operatorValue
    previousoprand = result;
    result= '';
    updateDisplay();
}
// function to calculate Result
const calculateResult = () => {
    let evaluateResult;

    const prev = parseFloat(previousoprand) ;
    const current =parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+' :
            evaluateResult = prev + current;
            break;
        case '-' :
             evaluateResult = prev - current;
            break;
        case '*' :
            evaluateResult = prev * current;
            break;
         case '/' :
            evaluateResult = prev / current;
            break;

        default:
            return;
    }
    result = evaluateResult.toString();
    operation = '';
    previousoprand ='';
}
//funtion to append number
const appendnumber = (number) =>{
    if(number === '.' && result.includes('.')) return;
    result += number;
    updateDisplay();
}
// function to update display
const updateDisplay = () => {
    if(operation){
        resultElement.innerText = `${previousoprand} ${operation} ${result}`;
    }
    else{
        resultElement.innerText = result;
    }
}
// Add event listener to number buttons
numbtns.forEach(button =>{
    button.addEventListener('click', ()=> {
        appendnumber(button.innerText);
    })
})
// function to clear display
const clearDisplay =() =>{
    result= '';
    previousoprand= '';
    operation = '';
    updateDisplay();
}
// function to delete Last button
const deleteLastDigit =() => {
    if(result === '') return;
    result = result.slice(0 , -1);
    updateDisplay();
}



decbtn.addEventListener('click' , () => appendnumber('.'));
addbtn.addEventListener('click', () => selectOperator('+'));
subbtn.addEventListener('click', () => selectOperator('-'));
mulbtn.addEventListener('click', () => selectOperator('*'));
divbtn.addEventListener('click', () => selectOperator('/'));
eqlbtn.addEventListener('click', () => {
    if(result ==='') return;
    calculateResult();
    updateDisplay();
});
clrbtn.addEventListener('click', clearDisplay);
delbtn.addEventListener('click', deleteLastDigit);
