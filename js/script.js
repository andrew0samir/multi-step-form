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
    if (stepNb == 0) {
        document.getElementById('prev').style.visibility = 'none';
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

let durationSlider = document.querySelector('#duartionSlider input');
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





