function show() {
  let tab = `<table><tr class="rowTable">
<th>ID</th>
<th>Full Name</th>
<th>Position</th>
<th>Team</th>
<th>City</th>
<th></th>
</tr>`;
  let i = 0;
  const data = JSON.parse(window.localStorage.getItem("myteam"));
  for (let player of data) {
    tab += `<tr class="rowTable">
<td>${player.id}</td>
<td>${player.first_name}</td>
<td>${player.position}</td>
<td>${player.team.full_name}</td>
<td>${player.team.city}</td>
<td></td>
</tr>`;
  }
  tab += "</table>";
  document.getElementById("myteam").innerHTML = tab;
}
show();
