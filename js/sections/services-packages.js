import { setLizaAmount, setDalireAmount, setNursingService, setRecoveryRoom, setPreAndPostNatal, setMedication, setMiscellaneous, setEncpProfFee, setEns, setBcgVaccine, setVitK, setHepaBVaccine, setErythromycin, setCordClamp, getMcpDetails, getEncpDetails } from "../state.js";
import { viewDisplay, hideDisplay, enableInput, disableInput, nonNegativeMultipleInput, enableAllServiceInput, disableAllServiceInput, descToId, disableInputAndClear } from "../util.js";

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


const encpCheckBox = document.querySelector("#encp-box");
const encpServiceCard = document.querySelector("#encp-service");
const encpServicePricing = document.querySelector("#encp-service-pricing");
const encpServiceBox = document.querySelector("#encp-service-checkbox");
const encpServiceInputs = document.querySelectorAll("#encp-service-pricing input");
// -----------------------------------------------------
// DEFAULTS    -----------------------------------------
// -----------------------------------------------------
populateServiceCards(getMcpDetails(), mcpServicePricing, "mcp");
initMcp();
initEncp();

//constraints
nonNegativeMultipleInput(packageInputs);



// -----------------------------------------------------
// MCP CARD            ---------------------------------
// -----------------------------------------------------
function initMcp() {
    defaultMcp();
    defaultProfFee();
    defaultMcpPricing();
}

function defaultMcp() {
    hideDisplay(profFeeCard);
    hideDisplay(mcpServiceCard);
}

function defaultProfFee() {
    rualCheckBox.checked = false;
    disableInputAndClear(rualInput);
    dalireCheckBox.checked = false;
    disableInputAndClear(dalireInput);
}

function defaultMcpPricing() {
    mcpServiceBox.checked = false;
    hideDisplay(mcpServicePricing);
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
        const mcpServiceInputs = document.querySelectorAll("#mcp-service-pricing input");
        enableAllServiceInput(mcpServiceInputs);
    } else {
        defaultMcpPricing();
    }
});


// -----------------------------------------------------
// ENCP CARD           ---------------------------------
// -----------------------------------------------------

function initEncp() {
    hideDisplay(encpServiceCard);    
    defaultEncpService();
}

function defaultEncpService() {
    hideDisplay(encpServicePricing);
    disableAllServiceInput(encpServiceInputs);
}



encpCheckBox.addEventListener("change", e => {
    if (e.target.checked) {
        viewDisplay(encpServiceCard);
    } else {
        hideDisplay(encpServiceCard);
        encpServiceBox.checked = false;
        defaultEncpService();
    }
})

encpServiceBox.addEventListener("change", e => {
    if (e.target.checked) {
        viewDisplay(encpServicePricing);
        enableAllServiceInput(encpServiceInputs);
    } else {
        defaultEncpService();
    }
})

// -----------------------------------------------------
// Common Functions     --------------------------------
// -----------------------------------------------------

function populateServiceCards(details, section, type) {
    const keys = Object.keys(details);
    keys.forEach(key => {
        
        if (!(details[key]["name"] === undefined)) {
            section.appendChild(serviceCardDiv(details[key], type));
        }
    });
}

function serviceCardDiv(detail, type) {
    const kebabName = descToId(detail.name, type);

    const div = document.createElement("div");
    div.classList.add("service-row", "service-row-space");

    const label = document.createElement("label");
    label.textContent = detail.name;
    label.setAttribute("for", kebabName);
    
    const input = document.createElement("input");
    input.type = "number";
    input.name = kebabName;
    input.id = kebabName;
    input.value = detail.amount;

    div.appendChild(label);
    div.appendChild(input);

    return div;
}

// -----------------------------------------------------
// Preview Btn Handlers --------------------------------
// -----------------------------------------------------
function handleItemizedDetailsState() {
    setLizaAmount(rualInput.value);
    setDalireAmount(dalireInput.value);
}


