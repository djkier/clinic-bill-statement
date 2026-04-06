
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