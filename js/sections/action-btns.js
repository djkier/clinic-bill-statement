const previewBtn = document.querySelector("#generate-preview-btn");
const dialogEl = document.querySelector("#preview-and-generate");
const printBtn = document.querySelector("#print-preview");
const downloadBtn = document.querySelector("#download-preview");
const backBtn = document.querySelector("#back-preview");



// -----------------------------------------------------
// Preview Btn          --------------------------------
// -----------------------------------------------------
function handlePreview() {
    dialogEl.showModal();
}

previewBtn.addEventListener("click", handlePreview);

// -----------------------------------------------------
// Back Btn             --------------------------------
// -----------------------------------------------------
backBtn.addEventListener("click", e => {
    dialogEl.close();
});

// -----------------------------------------------------
// Print Btn            --------------------------------
// -----------------------------------------------------
printBtn.addEventListener("click", e => {
    window.print();
})


// -----------------------------------------------------
// Download Btn         --------------------------------
// -----------------------------------------------------
function handleDownload() {

}

downloadBtn.addEventListener("click", handleDownload);

