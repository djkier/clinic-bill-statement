const tableData = [
    {
        "Maternity Care Package (MCP)" : [
            {
                name: "Professional Fee",
                amount: 0,
            },
            {
                name: "Liza H. Rual, RM",
                amount: 6240,
            },
            {
                name: "Nursing Service Fee",
                amount: 1500,
            },
            {
                name: "Recovery Room",
                amount: 1000,
            },
            {
                name: "Prenatal and Postnatal Fee",
                amount: 2000,
            },
            {
                name: "Medications",
                amount: 3500,
            },
            {
                name: "Miscellaneous Fee",
                amount: 1360
            }
        ]
    },
    {
        "Expanded Newborn Care" : [
            {
                name: "Expanded Newborn Screening",
                amount: 2761.50
            },
            {
                name: "Vitamin K",
                amount: 400
            },
            {
                name: "Hepatitis B Vaccine",
                amount: 500
            },
            {
                name: "Erythromycin Eye Prophylaxis",
                amount: 180
            },
            {
                name: "BCG Vaccine",
                amount: 300
            },
            {
                name: "Professional Fee",
                amount: 978
            }
        ]
    }
]

const tbody = document.querySelector("tbody");
const tr = document.createElement("tr");
const td1 = document.createElement("td");
const td2 = document.createElement("td");

td2.textContent = "21";

tr.appendChild(td1);
tr.appendChild(td2);

tbody.appendChild(tr);

