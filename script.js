let pixelgrid = 16;
let cellwidth;
let firstgrid = true;
let areborderon = true;
let colorpen = "black";
let colorbackground = "white";
let mouseDown = false;
let eraserfunction;
let mouseClick;
let rainbowfunction;
let colornormalfunction = true;
let rainbowcolorsarray = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#9400D3",
];
let countrb = 0;

/*******************************/
/*    TAKING HTML ELEMENTS     */

const gamesection = document.querySelector(".game");
const whiterboard = document.querySelector(".whiteboard");
const slider = document.querySelector(".slider");
const slideroutput = document.querySelector(".slideroutput");
const buttongrid = document.getElementById("buttongrid");
const resetbutton = document.querySelector(".resetbutton");
const colorpickerpen = document.getElementById("colorpickerpen");
const colorpickerbackground = document.getElementById("colorpickerbackground");
const togglerainbow = document.querySelector(".togglerainbow");
const eraserbutton = document.querySelector(".eraserbutton");
const buttonstoggle = document.querySelector(".buttonstoggle");
const buttonstoggles = buttonstoggle.getElementsByClassName("buttontoggle");
const buttoncolornormal = document.getElementById("buttoncolornormal");
const buttonerase = document.getElementById("buttonerase");
const buttonrainbow = document.getElementById("buttonrainbow");
const buttonprop = document.querySelector(".buttonprop");

/*******************************/

function cellborder(numberofcells, color) {
  let cellcount = 1;
  if (firstgrid === false) {
    whiterboard.replaceChildren();
  }
  for (let i = 0; i < numberofcells; i++) {
    const column = document.createElement("div");
    column.classList.add(".column");
    whiterboard.append(column);
    for (let i = 0; i < numberofcells; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = "cell-n" + cellcount;
      cell.style.backgroundColor = color;
      cell.onmouseover = function () {
        paint(this);
      };
      cellwidth = 600 / numberofcells;
      cell.style.width = `${cellwidth}px`;
      cell.style.height = `${cellwidth}px`;
      column.append(cell);
      cellcount++;
    }
    buttongrid.classList.add("buttonpropfirstfloor");
  }
}

function cellnoborder(numberofcells, color) {
  let cellcount = 1;
  whiterboard.replaceChildren();
  for (let i = 0; i < numberofcells; i++) {
    const column = document.createElement("div");
    column.classList.add(".column");
    whiterboard.append(column);
    for (let i = 0; i < numberofcells; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cellnoborder");
      cell.id = "cell-n" + cellcount;
      cell.style.backgroundColor = color;
      cell.onpointerover = function () {
        paint(this);
      };
      cell.draggable = false;
      cellwidth = 600 / numberofcells;
      cell.style.width = `${cellwidth}px`;
      cell.style.height = `${cellwidth}px`;
      column.append(cell);
      cellcount++;
    }
  }
}
/* THIS COMBINED TO THE OTHER TWO (.onpointerdown, onpointerup) ALLOW THE 
DRAWING. MAYBE IS NOT ONE OF THE BEST DECISION IK. WITHOUT THIS FUNCTION UNDER⬇ THE FIRST 
CELL CLICKED CAN'T BE DRAW!*/
/* onmousedown +- = onpointerdown this permise to use two different listener for this 2 differente functions*/

whiterboard.onmousedown = function (e) {
  cell = e.target;
  if (colornormalfunction === true) {
    cell.style.backgroundColor = colorpen;
  } else if (eraserfunction === true) {
    cell.style.backgroundColor = colorbackground;
  } else if (rainbowfunction === true) {
    let colornow = rainbowcolorsarray[countrb];
    cell.style.backgroundColor = colornow;
    countrb++;
    if (countrb == 6) {
      countrb = 0;
    }
  }
};

document.body.onpointerdown = function () {
  mouseDown = true;
};

document.body.onpointerup = function () {
  mouseDown = false;
};

slider.onpointerup = function () {
  slideroutput.innerHTML = this.value + "x" + this.value;
  if (areborderon === true) {
    cellborder(this.value, colorbackground);
    pixelgrid = this.value;
  } else {
    cellnoborder(this.value, colorbackground);
  }
};

function paint(cell) {
  if (colornormalfunction === true) {
    if (mouseDown === true) {
      cell.style.backgroundColor = colorpen;
    }
  } else if (eraserfunction === true) {
    if (mouseDown === true) {
      cell.style.backgroundColor = colorbackground;
    }
  } else if (rainbowfunction === true) {
    if (mouseDown === true) {
      let colornow = rainbowcolorsarray[countrb];
      cell.style.backgroundColor = colornow;
      countrb++;
    }
    if (countrb == 6) {
      countrb = 0;
    }
  }
}

buttoncolornormal.addEventListener("click", (e) => {
  colornormalfunction = true;
  eraserfunction = false;
  rainbowfunction = false;
});

buttonerase.addEventListener("click", (e) => {
  colornormalfunction = false;
  eraserfunction = true;
  rainbowfunction = false;
});

buttonrainbow.addEventListener("click", (e) => {
  colornormalfunction = false;
  eraserfunction = false;
  rainbowfunction = true;
});

buttonstoggle.addEventListener("click", (e) => {
  const buttonclickedid = e.target.id;
  const buttonclicked = document.getElementById(buttonclickedid);
  for (let i = 0; i < buttonstoggles.length; i++) {
    buttonstoggles[i].classList.remove("buttontogglefirstfloor");
  }
  buttonclicked.classList.add("buttontogglefirstfloor");
});

function colorpenupdater() {
  colorpen = colorpickerpen.value;
}

function colorbackgroundupdater() {
  colorbackground = colorpickerbackground.value;
  if (areborderon === true) {
    cellborder(pixelgrid, colorbackground);
  } else {
    cellnoborder(pixelgrid, colorbackground);
  }
}

buttongrid.addEventListener("click", () => {
  if (areborderon === true) {
    cellnoborder(pixelgrid, colorbackground);
    areborderon = false;
    buttongrid.classList.remove("buttonpropfirstfloor");
  } else {
    cellborder(pixelgrid, colorbackground);
    areborderon = true;
    buttongrid.classList.add("buttonpropfirstfloor");
  }
});

resetbutton.addEventListener("click", () => {
  window.location.reload();
});

cellborder(pixelgrid, colorbackground);
firstgrid = false;
