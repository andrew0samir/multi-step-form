let inputBox = document.querySelectorAll('#step1 .inputBox');
let priceDetails = [0, 0, 0, 0];

// show the first step

let progression = document.querySelectorAll('.step');
let sidebar = document.querySelectorAll('.progress');
let valid = true;
let currentStep = 0;

showStep(currentStep);

function showStep(stepNb) {
    progression[stepNb].style.display = 'flex';
    sidebar[stepNb].classList.add('active');
    document.getElementById('confirm').style.display = 'none';
    if (stepNb === 0) {
        document.getElementById('prev').style.visibility = 'hidden';
    }
    else {
        document.getElementById('prev').style.visibility = 'visible';
    }
    if (stepNb === (progression.length - 1)) {
        document.getElementById('next').style.display = 'none';
        document.getElementById('confirm').style.display = 'block';
    }
    else {
        document.getElementById('next').style.display = 'block';
    }
}

// to validate that inputs not empty 
function validation() {
    for (let i = 0; i < inputBox.length; i++) {
        if (inputBox[i].querySelector('input').value === '') {
            inputBox[i].querySelector('.invalid').classList.add('show');
            let input = inputBox[i].querySelector('input');
            input.classList.add('invalid');
            valid = false;
        }
        else {
            valid = true;
        }
    }
    return valid;
}

// to control the previous and next buttons
function prevNext(stepNb) {
    if (currentStep === 0 && !validation()) return false;
    progression[currentStep].style.display = 'none';
    sidebar[currentStep].classList.remove('active');
    currentStep += stepNb;
    showStep(currentStep);
}


// step 1

let inputs = document.querySelectorAll('#step1 input');

inputs.forEach((input, i) => {
    input.addEventListener('blur', () => {
        if (input.value !== '') {
            inputBox[i].querySelector('.invalid').classList.remove('show');
            input.classList.remove('invalid');
        }
        else {
            inputBox[i].querySelector('.invalid').classList.add('show');
            input.classList.add('invalid');
        }
    })
})


// step 2

let durationSlider = document.querySelector('#durationSlider input');
let checkPlans = document.getElementsByName('radioCard');
let isMonthly = true;
let checkedPlanNb = 0;

priceDetails[0] = checkPrice(checkedPlanNb, null);

document.querySelector('#monthlyOption').style.display = 'flex';
checkPlans[0].checked = true;

monthSelection();
selectionName(checkedPlanNb);
selectionOptions(checkedPlanNb);
priceShow();

durationSlider.addEventListener('change', (e) => {
    if (e.target.checked) {
        isMonthly = false;
        yearlyChange();
        yearSelection();
        selectionName(checkedPlanNb);
        selectionOptions(checkedPlanNb);
        checkOptions(checkedPlanNb);
        priceShow();
    }
    else {
        monthlyChange();
        monthSelection();
        selectionName(checkedPlanNb);
        selectionOptions(checkedPlanNb);
        checkOptions(checkedPlanNb);
        priceShow();
    }
});

checkPlans.forEach((selection, i) => {
    selection.addEventListener('click', () => {
        checkedPlanNb = i;
        selectionName(checkedPlanNb);
        selectionOptions(checkedPlanNb);
        priceDetails[0] = checkPrice(checkedPlanNb, null);
        priceShow();
    });
});

// yearlyChange and monthlyChange functions change the appearence of the slider
// and recalculate the price of the selected options 

function yearlyChange() {
    document.querySelector('#monthlyOption').style.display = 'none';
    document.querySelector('#monthDuration').style.color = 'var(--coolGray)';
    document.querySelector('#yearlyOption').style.display = 'flex';
    document.querySelector('#yearDuration').style.color = 'var(--marineBlue)';
    checkPlans[3].checked = true;
    checkedPlanNb = 3;
    priceDetails[0] = checkPrice(checkedPlanNb, null);
    priceShow();
}

function monthlyChange() {
    document.querySelector('#yearlyOption').style.display = 'none';
    document.querySelector('#yearDuration').style.color = 'var(--coolGray)';
    document.querySelector('#monthlyOption').style.display = 'flex';
    document.querySelector('#monthDuration').style.color = 'var(--marineBlue)';
    checkPlans[0].checked = true;
    checkedPlanNb = 0;
    priceDetails[0] = checkPrice(checkedPlanNb, null);
    priceShow();
}


// step 3 

let optionCase = [false, false, false];
let options = document.querySelectorAll('.addonBox input');
document.querySelector('.optionBox').style.display = 'none';

// the monthSelection and yearSelection functions display options 
// based on the selected offer 

function monthSelection() {
    document.querySelector('#onlineService').innerHTML = '+&dollar;1/mo';
    document.querySelector('#storage').innerHTML = '+&dollar;2/mo';
    document.querySelector('#profile').innerHTML = '+&dollar;2/mo';
}

function yearSelection() {
    document.querySelector('#onlineService').innerHTML = '+&dollar;10/yr';
    document.querySelector('#storage').innerHTML = '+&dollar;20/yr';
    document.querySelector('#profile').innerHTML = '+&dollar;20/yr';
}

options.forEach((option, i) => {
    option.addEventListener('change', (e) => {
        if (e.target.checked) {
            optionCase[i] = true;
            document.getElementById('option' + i).style.display = 'flex';
            priceDetails[i + 1] = checkPrice(checkedPlanNb, i);
            priceShow();
        }
        else {
            optionCase[i] = false;
            document.getElementById('option' + i).style.display = 'none';
            priceDetails[i + 1] = 0;
            priceShow();
        }
        optionCase.includes(true) ? document.querySelector('.optionBox').style.display = 'block' : document.querySelector('.optionBox').style.display = 'none';
    });
});

// step 4 

// the selectionName function displays the name and price of the selected offer 

function selectionName(option) {
    switch (option) {
        case 0:
            document.getElementById('selection__name').innerHTML = 'Arcade (Monthly)';
            document.getElementById('selection__price').innerHTML = '&dollar;9/mo';
            break;
        case 1:
            document.getElementById('selection__name').innerHTML = 'Advanced (Monthly)';
            document.getElementById('selection__price').innerHTML = '&dollar;12/mo';
            break;
        case 2:
            document.getElementById('selection__name').innerHTML = 'Pro (Monthly)';
            document.getElementById('selection__price').innerHTML = '&dollar;15/mo';
            break;
        case 3:
            document.getElementById('selection__name').innerHTML = 'Arcade (Yearly)';
            document.getElementById('selection__price').innerHTML = '&dollar;90/yr';
            break;
        case 4:
            document.getElementById('selection__name').innerHTML = 'Advanced (Yearly)';
            document.getElementById('selection__price').innerHTML = '&dollar;120/yr';
            break;
        case 5:
            document.getElementById('selection__name').innerHTML = 'Pro (Yearly)';
            document.getElementById('selection__price').innerHTML = '&dollar;150/yr';
            break;
        default:
            // no default cause use must choose one 
            break;
    }
}

// check plans and options 

// the checkOptions function stores the price of the selected options 
// in the price details variable

function checkOptions(option) {
    let options = document.querySelectorAll('.addonBox input');
    options.forEach((checkedOption, i) => {
        if (checkedOption.checked === true) {
            priceDetails[i + 1] = checkPrice(option, i);
        }
    });
}

// the selectionOptions function displays the options in step 3 and step 4

function selectionOptions(option) {
    switch (option) {
        case 0:
        case 1:
        case 2:
            document.querySelector('#option0 .option__price').innerHTML = '+&dollar;1/mo';
            document.querySelector('#option1 .option__price').innerHTML = '+&dollar;2/mo';
            document.querySelector('#option2 .option__price').innerHTML = '+&dollar;2/mo';
            break;
        case 3:
        case 4:
        case 5:
            document.querySelector('#option0 .option__price').innerHTML = '+&dollar;1/yr';
            document.querySelector('#option1 .option__price').innerHTML = '+&dollar;2/yr';
            document.querySelector('#option2 .option__price').innerHTML = '+&dollar;2/yr';
            break;
    }
}

// checkPrice function returns the price of the selected offer and options 

function checkPrice(plan, option) {
    if (option === null) {
        switch (plan) {
            case 0:
                return 9;
            case 1:
                return 12;
            case 2:
                return 15;
            case 3:
                return 90;
            case 4:
                return 120;
            case 5:
                return 150;

        }
    }
    if (option === 0 && plan < 3) {
        return 1;
    }
    if (option === 0 && plan >= 3) {
        return 10;
    }
    if ((option === 1 || option === 2) && plan < 3) {
        return 2;
    }
    if ((option === 1 || option === 2) && plan >= 3) {
        return 20;
    }
}

// the priceShow function calculates the total price and displays it in step 4

function priceShow() {
    let x = 0;
    priceDetails.forEach((price)=>{
        x += price;
    });
    if(isMonthly){
        document.querySelector('.totalPrice__price').innerHTML = `&dollar;${x}/mo`;
    }
    else{
        document.querySelector('.totalPrice__price').innerHTML = `&dollar;${x}/yr`;
    }
}

// confirmation 

document.getElementById('multistepForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    document.querySelector('#multistepForm').style.display = 'none';
    document.querySelector('#confirmation').style.display = 'flex';
})





