
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