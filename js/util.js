function displayStyle(card, opt) {
    card.style.display = opt;
}

export function displayFlex(card) {
    displayStyle(card, "flex");
}

export function displayNone(card) {
    displayStyle(card, "none");
}

export function enableInput(input) {
    input.disabled = false;
}

export function disableInput(input) {
    input.disabled = true;
}