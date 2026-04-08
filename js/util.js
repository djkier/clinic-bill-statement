
export function viewDisplay(card) {
    card.classList.remove("hidden");
}

export function hideDisplay(card) {
    card.classList.add("hidden");
}

export function enableInput(input) {
    input.disabled = false;
}

export function disableInput(input) {
    input.disabled = true;
    clearInput(input);
}

function clearInput(input) {
    input.value = "";
}

export function nonNegativeMultipleInput(inputArr) {
    inputArr.forEach(input => {
        nonNegativeInput(input);
    });
}

export function nonNegativeInput(input) {
    input.addEventListener("input", e => {
        let inputValue = Number(e.target.value);

        if (inputValue < 0) {
            e.target.value = 0;
        }
    });
}

export function disableAllServiceInput(inputArr) {
    inputArr.forEach(input => {
        disableInput(input);
    });
}

export function enableAllServiceInput(inputArr) {
    inputArr.forEach(input => {
        enableInput(input);
    });
}

export function formatMoney(money) {
    
}

export function defaultDateFormat(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
}