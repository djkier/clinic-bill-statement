import { previewItemizedTable } from "../preview/itemized-details.js";
import { setProfAmount, setMcpState, setEncpState, getMcpDetails, getEncpDetails, setMcpDetails, setEncpDetails,  getServicePackages} from "../state.js";
import { viewDisplay, hideDisplay, enableInput, disableInput, nonNegativeMultipleInput, enableAllServiceInput, disableAllServiceInput, descToId, disableInputAndClear, idToDesc } from "../util.js";


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
initServicesCards();
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
    defaultServiceInput(getMcpDetails(), "mcp");
    hideDisplay(mcpServicePricing);
}


mcpCheckBox.addEventListener("change", e => {
    if (e.target.checked) {
        viewDisplay(profFeeCard);
        viewDisplay(mcpServiceCard);
    } else {
        initMcp();
    }

    setMcpState(e.target.checked);
});

rualCheckBox.addEventListener("change", e => {
    if (e.target.checked) {
        enableInput(rualInput);
    } else {
        disableInputAndClear(rualInput);
    }
});

dalireCheckBox.addEventListener("change", e => {
    if (e.target.checked) {
        enableInput(dalireInput);
    } else {
        disableInputAndClear(dalireInput);
    }
})

mcpServiceBox.addEventListener("change", e => {
    if (e.target.checked) {
        viewDisplay(mcpServicePricing);
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
    encpServiceBox.checked = false;
    defaultServiceInput(getEncpDetails(), "encp");
    hideDisplay(encpServicePricing);
}


encpCheckBox.addEventListener("change", e => {
    if (e.target.checked) {
        viewDisplay(encpServiceCard);
    } else {
        hideDisplay(encpServiceCard);
        defaultEncpService();
    }

    setEncpState(e.target.checked);
})

encpServiceBox.addEventListener("change", e => {
    if (e.target.checked) {
        viewDisplay(encpServicePricing);
    } else {
        defaultEncpService();
    }
})

// -----------------------------------------------------
// Common Functions     --------------------------------
// -----------------------------------------------------
function initServicesCards() {
    populateServiceCards(getMcpDetails(), mcpServicePricing, "mcp");
    populateServiceCards(getEncpDetails(), encpServicePricing, "encp");
}

function populateServiceCards(details, section, type) {
    const keys = Object.keys(details);
    keys.forEach(key => {
        
        if (details[key]["professionals"] === undefined) {
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
    setProfAmount(rualInput.id, rualInput.value);
    setProfAmount(dalireInput.id, dalireInput.value);
    inputToStateService(setMcpDetails, mcpServicePricing);
    inputToStateService(setEncpDetails, encpServicePricing);
}

function inputToStateService(setDetails, section) {
    const inputs = section.querySelectorAll("input");
    
    const nameToKey = {};
    for (const key in setDetails) {
        const name = setDetails[key].name.toLowerCase();
        nameToKey[name] = key;
    }

    for (const input of inputs) {
        const name = idToDesc(input.id);
        const key = nameToKey[name];

        if (key !== undefined) {
            setDetails[key].amount = input.value;
        }
    }
}


function defaultServiceInput(getDetails, prepend) {
    const nameToId = {};
    for (const key in getDetails) {
        if (getDetails[key].professionals === undefined) {
            const keyName = getDetails[key].name.toLowerCase();
            const id = descToId(keyName, prepend);
            nameToId[id] = key;
        }
        
    }

    for (const id in nameToId) {
        const inputEl = document.getElementById(id);
        const key = nameToId[id];
        inputEl.value = getDetails[key]?.philHealth ?? "";
    }
}

//when edited services is turned off the services default input will be back to its default value
//the handleItemizedDetailsState() will always get the input value 
export function processItem() {
    handleItemizedDetailsState();

    previewItemizedTable(getServicePackages());
}


