import { displayFlex, displayNone, enableInput, disableInput } from "../util.js";

const mcpCheckBox = document.querySelector("#mcp-box");
const mcpCard = document.querySelector("#mcp");
const profCheckBox = document.querySelectorAll(`.pf input[type="checkbox"]`);
const profInput = document.querySelectorAll(`.pf input[type="number"]`);
const profFeeCard = document.querySelector("#professional-fee");
const mcpServiceBox = document.querySelector("#mcp-service-checkbox");
const mcpServiceCard = document.querySelector("#mcp-service");
const mcpServicePricing = document.querySelector("#mcp-service-pricing");
const rualCheckBox = document.querySelector("#rual-checkbox");
const rualInput = document.querySelector("#rual-pf")
const dalireCheckBox = document.querySelector("#dalire-checkbox");
const dalireInput = document.querySelector("#dalire-pf");

// -----------------------------------------------------
// DEFAULTS    -----------------------------------------
// -----------------------------------------------------
initMcp();




// -----------------------------------------------------
// Pricing checkbox    ---------------------------------
// -----------------------------------------------------
function initMcp() {
    defaultMcp();
    defaultPricing();
}

function defaultMcp() {
    displayNone(profFeeCard);
    displayNone(mcpServiceCard);
}

function defaultPricing() {
    mcpServiceBox.checked = false;
    displayNone(mcpServicePricing);
}

mcpCheckBox.addEventListener("change", e => {
    if (e.target.checked) {
        displayFlex(profFeeCard);
        displayFlex(mcpServiceCard);
    } else {
        defaultMcp();
        defaultPricing();
    }
});

rualCheckBox.addEventListener("change", e => {
    if (e.target.checked) {
        enableInput(rualInput);
    } else {
        disableInput(rualInput);
    }
});

dalireCheckBox.addEventListener("change", e => {
    if (e.target.checked) {
        enableInput(dalireInput);
    } else {
        disableInput(dalireInput);
    }
})

mcpServiceBox.addEventListener("change", e => {
    if (e.target.checked) {
        displayFlex(mcpServicePricing);
    } else {
        defaultPricing();
    }
});




