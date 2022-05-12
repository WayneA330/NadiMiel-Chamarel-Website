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
let miel_class = document.getElementsByClassName("Honey");
let snacks_class = document.getElementsByClassName("Snacks");
let charcuterie_class = document.getElementsByClassName("Charcuterie");
let piment_class = document.getElementsByClassName("Achard/Piments");
let patisserie_class = document.getElementsByClassName("Pâtisserie");
// console.log(patisserie_class[0]);

// Function for honey
function toggleCheckboxMiel(id) {
  if (document.getElementById(id).checked === true) {
      Array.from(miel_class).forEach(item => {
      item.style.display = 'revert';
    });
  }
  else if (document.getElementById(id).checked === false) {
      Array.from(miel_class).forEach(item => {
      item.style.display = 'none';
    });
  }
}

// Function for snacks
function toggleCheckboxSnacks(id) {
  if (document.getElementById(id).checked === true) {
      Array.from(snacks_class).forEach(item => {
      item.style.display = 'revert';
    });
  }
  else if (document.getElementById(id).checked === false) {
      Array.from(snacks_class).forEach(item => {
      item.style.display = 'none';
    });
  }
}

// Function for charcuterie
function toggleCheckboxCharcuterie(id) {
  if (document.getElementById(id).checked === true) {
      Array.from(charcuterie_class).forEach(item => {
      item.style.display = 'revert';
    });
  }
  else if (document.getElementById(id).checked === false) {
      Array.from(charcuterie_class).forEach(item => {
      item.style.display = 'none';
    });
  }
}

// Function for patisserie
function toggleCheckboxPatisserie(id) {
  if (document.getElementById(id).checked === true) {
      Array.from(patisserie_class).forEach(item => {
      item.style.display = 'revert';
    });
  }
  else if (document.getElementById(id).checked === false) {
      Array.from(patisserie_class).forEach(item => {
      item.style.display = 'none';
    });
  }
}

// Function for achard & piment
function toggleCheckboxAchardPiment(id) {
  if (document.getElementById(id).checked === true) {
      Array.from(piment_class).forEach(item => {
      item.style.display = 'revert';
    });
  }
  else if (document.getElementById(id).checked === false) {
      Array.from(piment_class).forEach(item => {
      item.style.display = 'none';
    });
  }
}

// Check ID
// let miel_check = document.getElementById('miel');
// let snacks_check = document.getElementById('snacks');
// let charcuterie_check = document.getElementById('charcuterie');
// let piment_check = document.getElementById('Achard_&_Piment');
// let patisserie_check = document.getElementById('patisserie');

// function displayAll() {
//   if(miel_check.checked === false && snacks_check.checked === false && charcuterie_check.checked === false && piment_check.checked === false && patisserie_check.checked === false) {
//       Array.from(miel_class).forEach(item => {
//       item.style.display = 'revert';
//     });

//       Array.from(snacks_class).forEach(item => {
//       item.style.display = 'revert';
//     });

//       Array.from(charcuterie_class).forEach(item => {
//       item.style.display = 'revert';
//     });

//       Array.from(patisserie_class).forEach(item => {
//       item.style.display = 'revert';
//     });

//       Array.from(piment_class).forEach(item => {
//       item.style.display = 'revert';
//     });
//   }
// }

// displayAll();