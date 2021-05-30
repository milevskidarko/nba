// Api url

const api_url = "https://www.balldontlie.io/api/v1/players";

let players = [];
let myteam = [];
//Show input value from first html

let username = localStorage.getItem("username");
document.getElementById("welcome").innerHTML += username;

// Defining async function
function getapi(options) {
  fetch(`${api_url}?search=${options.q}`)
    .then((e) => e.json())
    .then((e) => {
      hideloader();
      show(e, options);
      drop(e, options);
      players = e;
    });
}

// Function to hide the loader

function hideloader() {
  document.getElementById("loading").style.display = "none";
}

// Function to add player

function addToMyTeam(index) {
  if (myteam.length > 12) {
    alert("You have reached the maximum players in the list.");
    return;
  }
  const player = players.data[index];
  for (let i = 0; i < myteam.length; i++) {
    if (myteam[i].id === player.id) {
      alert("The player is already added to the list.");
      return;
    }
  }
  myteam.push(player);
  window.localStorage.setItem("myteam", JSON.stringify(myteam));
}

// Function to remove player

function removeToMyTeam(index) {
  const player = players.data[index];
  console.log(player);

  for (let i = 0; i < myteam.length; i++) {
    if (myteam[i].id === player.id) {
      alert("The player is remove from the list.");
      return;
    }
  }
  myteam.pop(player);
  window.localStorage.getItem("myteam");
  window.localStorage.removeItem("myteam");
}

// Function to print data
function show(data, options) {
  let tab = `<tr>
<th>ID</th>
<th>Full Name</th>
<th>Position</th>
<th>Team</th>
<th>City</th>
<th></th>
</tr>`;
  let i = 0;
  for (let player of data.data) {
    if (
      options &&
      options.position !== "false" &&
      player.position !== options.position
    ) {
      continue;
    }
    tab += `<tr>
<td>${player.id}</td>
<td>${player.first_name}</td>
<td>${player.position}</td>
<td>${player.team.full_name}</td>
<td>${player.team.city}</td>
<td><button class="buttonOne" onClick="addToMyTeam(${i})">Add player</button></td>
<td><button class="buttonOne" onClick="removeToMyTeam(${i})">Remove player</button></td>
</tr>`;
    i++;
  }

  document.getElementById("players").innerHTML = tab;
}

// Load dropdown menu

function drop(data, options) {
  let selectBar = `<select><option value="false">Choose player</option></select>`;
  let addedPositions = [];

  for (let player of data.data) {
    if (addedPositions.indexOf(player.position) !== -1) {
      //already in the list
      continue;
    }
    let selected = "";
    if (
      options &&
      options.position !== "false" &&
      player.position === options.position
    ) {
      selected = 'selected="selected"';
    }
    addedPositions.push(player.position);
    selectBar += `<option ${selected}>${player.position}</option>`;
  }

  document.getElementById("dropDown").innerHTML = selectBar;
}

// Function for sorting

function sortFunc() {
  const sorted = players.data.sort();
  console.log(sorted);
  show(sorted);
}

let btn = document.getElementById("sort");

btn.addEventListener("click", () => {
  sortFunc();
});

//Filter function

window.onload = function () {
  getapi({ q: "", position: "false" });
  document.getElementById("searchInput").addEventListener("keyup", (e) => {
    getapi({
      q: e.target.value,
      position: document.getElementById("dropDown").value || "false",
    });
  });
  document.getElementById("dropDown").addEventListener("change", (e) => {
    console.log(e.target.value);
    getapi({
      q: document.getElementById("searchInput").value || "",
      position: e.target.value || "false",
    });
  });
};
