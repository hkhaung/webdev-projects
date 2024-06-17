let selectedColor = "white";
let isDraw = false;
let ROWS = 5;
let COLS = 5;

// sliders, copied from w3 schools
function setUpSliders() {
    let sliderRows = document.getElementById("grid-rows-range");
    let outputRows = document.getElementById("grid-rows");
    outputRows.innerHTML = sliderRows.value;
    sliderRows.oninput = function () {
        outputRows.innerHTML = this.value;
        ROWS = this.value;
        createGrid(COLS, ROWS);
        isDraw = false;
        selectedColor = "white";
    };

    let sliderCols = document.getElementById("grid-cols-range");
    let outputCols = document.getElementById("grid-cols");
    outputCols.innerHTML = sliderCols.value;
    sliderCols.oninput = function () {
        outputCols.innerHTML = this.value;
        COLS = this.value;
        createGrid(COLS, ROWS);
        isDraw = false;
        selectedColor = "white";
    };
}

// grid
function createGrid(rows, cols) {
    let gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = ""; // Clear the existing grid

    for (let i = 0; i < rows; i++) {
        const divRow = document.createElement("div");
        divRow.classList.add("row");

        for (let j = 0; j < cols; j++) {
            const divCol = document.createElement("div");
            divCol.classList.add("col");
            divRow.appendChild(divCol);
        }
        gridContainer.appendChild(divRow);
    }
    attachCellListeners();
}

// color palette
// prettier-ignore
function colorSelected() {
    document.querySelectorAll("#colors-palette .col").forEach(function (col) {
        col.addEventListener("click", function () {
            document.querySelectorAll("#colors-palette .col").forEach(function (otherCol) {
                otherCol.classList.remove("clicked");
            });
            col.classList.add("clicked");
            selectedColor = col.style.backgroundColor;
        });
    });
}

// button functionality
// prettier-ignore
function toggleButton(button) {
    document.querySelectorAll("#buttons button").forEach(function (btn) {
        btn.classList.remove("clicked");
    });
    button.classList.add("clicked");
}

// draw
document.getElementById("button-draw").addEventListener("click", function () {
    isDraw = true;
    toggleButton(this);
});

// erase
document.getElementById("button-erase").addEventListener("click", function () {
    isDraw = false;
    toggleButton(this);
});

// clear
document.getElementById("button-clear").addEventListener("click", function () {
    document.querySelectorAll(".grid-container .col").forEach(function (col) {
        col.classList.remove("clicked");
        col.style.backgroundColor = "white";
    });
    isDraw = false;
    toggleButton(this);
});

setUpSliders();
createGrid(ROWS, COLS);
colorSelected();

function attachCellListeners() {
    document.querySelectorAll(".grid-container .col").forEach(function (col) {
        col.addEventListener("mouseenter", function () {
            if (isDraw) {
                col.style.backgroundColor = selectedColor;
            } else {
                col.style.backgroundColor = "white";
            }
        });
    });
}
