const mcpCard = document.querySelector("#mcp");
const mcpCheckBox = document.querySelector("#mcp-box");
const profFeeCard = document.querySelector("#professional-fee");
const encpCard = document.querySelector("#encp");
const encpCheckBox = document.querySelector("#encp-box");

// default
profFeeCard.style.display = "none";


mcpCheckBox.addEventListener("change", e => {
    if (mcpCheckBox.checked) {
        mcpCard.style.backgroundColor = "oklch(94.158% 0.02414 254.032)";
        profFeeCard.style.display = "flex";
    } else {
        mcpCard.style.backgroundColor = "oklch(0.985 0.002 247.839)";
        profFeeCard.style.display = "none";
    }
})

encpCheckBox.addEventListener("change", e => {
    if (encpCheckBox.checked) {
        encpCard.style.backgroundColor = "oklch(94.158% 0.02414 254.032)";
    } else {
        encpCard.style.backgroundColor = "oklch(0.985 0.002 247.839)";
    }
})