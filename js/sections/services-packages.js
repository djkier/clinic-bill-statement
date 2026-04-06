import { viewDisplay, hideDisplay, enableInput, disableInput, nonNegativeMultipleInput } from "../util.js";

const packageInputs = document.querySelectorAll("#packages input[type='number']");
const mcpCheckBox = document.querySelector("#mcp-box");
const mcpCard = document.querySelector("#mcp");
const profFeeCard = document.querySelector("#professional-fee");
const mcpServiceBox = document.querySelector("#mcp-service-checkbox");
const mcpServiceCard = document.querySelector("#mcp-service");
const mcpServicePricing = document.querySelector("#mcp-service-pricing");
const rualCheckBox = document.querySelector("#rual-checkbox");
const rualInput = document.querySelector("#rual-pf")
const dalireCheckBox = document.querySelector("#dalire-checkbox");
const dalireInput = document.querySelector("#dalire-pf");
const mcpServiceInputs = document.querySelectorAll("#mcp-service-pricing input");


// -----------------------------------------------------
// DEFAULTS    -----------------------------------------
// -----------------------------------------------------
initMcp();

//constraints
nonNegativeInput(packageInputs);



// -----------------------------------------------------
// MCP CARD            ---------------------------------
// -----------------------------------------------------
function initMcp() {
    defaultMcp();
    defaultProfFee();
    defaultPricing();
}

function defaultMcp() {
    hideDisplay(profFeeCard);
    hideDisplay(mcpServiceCard);
}

function defaultProfFee() {
    rualCheckBox.checked = false;
    disableInput(rualInput);
    dalireCheckBox.checked = false;
    disableInput(dalireInput);
}

function disableAllServiceInput() {
    mcpServiceInputs.forEach(input => {
        disableInput(input);
    });
}

function enableAllServiceInput() {
    mcpServiceInputs.forEach(input => {
        enableInput(input);
    });
}

function defaultPricing() {
    mcpServiceBox.checked = false;
    hideDisplay(mcpServicePricing);
    disableAllServiceInput();
}

mcpCheckBox.addEventListener("change", e => {
    if (e.target.checked) {
        viewDisplay(profFeeCard);
        viewDisplay(mcpServiceCard);
    } else {
        initMcp();
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
        viewDisplay(mcpServicePricing);
        enableAllServiceInput();
    } else {
        defaultPricing();
    }
});






