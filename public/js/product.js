// Filter
var button = document.getElementById("filter-button");
var container = document.getElementById("filter-container");
var input = document.querySelectorAll("input");

button.onclick = function (e) {
  e.stopPropagation();
  if (container.classList.contains("filters--active")) {
    container.classList.remove("filters--active");
  } else {
    container.classList.add("filters--active");
  }
};

container.onclick = function (e) {
  e.stopPropagation();
};

window.onclick = function () {
  container.classList.remove("filters--active");
};

for (var i = 0; i < input.length; i++) {
  var currentInput = input[i];

  currentInput.onclick = function () {
    var isChecked = false;
    for (var j = 0; j < input.length; j++) {
      if (input[j].checked) {
        isChecked = true;
        break;
      }
    }

    if (isChecked) {
      button.classList.add("button--highlight");
    } else {
      button.classList.remove("button--highlight");
    }
  };
}

// FILTER
//Card Items 
let miel_id = document.getElementById("Honey");
let snacks_id = document.getElementById("Snacks");
let charcuterie_id = document.getElementById("Charcuterie");
let piment_id = document.getElementById("Achard & Piments / Chili");
let patisserie_id  =document.getElementById("Pâtisserie / Pastry");

// Function for honey
function toggleCheckboxMiel(id) {
  if (document.getElementById(id).checked === true) {
    miel_id.style.display = 'revert';
  }
  else if (document.getElementById(id).checked === false) {
    miel_id.style.display = 'none';
  }
}

// Function for snacks
function toggleCheckboxSnacks(id) {
  if (document.getElementById(id).checked === true) {
    snacks_id.style.display = 'revert';
  }
  else if (document.getElementById(id).checked === false) {
    snacks_id.style.display = 'none';
  }
}

// Function for charcuterie
function toggleCheckboxCharcuterie(id) {
  if (document.getElementById(id).checked === true) {
    charcuterie_id.style.display = 'revert';
  }
  else if (document.getElementById(id).checked === false) {
    charcuterie_id.style.display = 'none';
  }
}

// Function for patisserie
function toggleCheckboxPatisserie(id) {
  if (document.getElementById(id).checked === true) {
    patisserie_id.style.display = 'revert';
  }
  else if (document.getElementById(id).checked === false) {
    patisserie_id.style.display = 'none';
  }
}

function toggleCheckboxAchardPiment(id) {
  if (document.getElementById(id).checked === true) {
    piment_id.style.display = 'revert';
  }
  else if (document.getElementById(id).checked === false) {
    piment_id.style.display = 'none';
  }
}

// Check ID
let miel_check = document.getElementById('miel');
let snacks_check = document.getElementById('snacks');
let charcuterie_check = document.getElementById('charcuterie');
let piment_check = document.getElementById('Achard_&_Piment');
let patisserie_check = document.getElementById('patisserie');

function displayAll() {
  if(miel_check.checked === false && snacks_check.checked === false && charcuterie_check.checked === false && piment_check.checked === false && patisserie_check.checked === false) {
    miel_id.style.display = 'revert';
    snacks_id.style.display = 'revert';
    charcuterie_id.style.display = 'revert';
    patisserie_id.style.display = 'revert';
    piment_id.style.display = 'revert';
  }
}

displayAll();