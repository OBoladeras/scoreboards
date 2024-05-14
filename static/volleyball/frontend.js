name_team1 = document.getElementById('name_team1');
name_team2 = document.getElementById('name_team2');

logo_team1 = document.getElementById('logo_team1');
logo_team2 = document.getElementById('logo_team2');

changes_team1 = document.getElementById('changes_team1');
changes_team2 = document.getElementById('changes_team2');

points_team1 = document.getElementById('points_team1');
points_team2 = document.getElementById('points_team2');

sets_team1 = document.getElementById('sets_team1');
sets_team2 = document.getElementById('sets_team2');

logo1 = "volei-sant-cugat-b.png";
logo2 = "sant-boi-voley.png";

function update() {
    fetch('/api/volleyball/' + id, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    }).catch(function (error) {
        console.log('Request failed', error);
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        name_team1.innerHTML = data.team1.name;
        name_team2.innerHTML = data.team2.name;

        if (data.team1.logo != logo1 && data.team1.logo != logo2) {
            logo_team1.src = `/static/volleyball/logos/${data.team1.logo}`;
            logo_team2.src = `/static/volleyball/logos/${data.team2.logo}`;

            logo1 = data.team1.logo;
            logo2 = data.team2.logo;
        }

        changes_team1.innerHTML = data.team1.changes;
        changes_team2.innerHTML = data.team2.changes;

        points_team1.innerHTML = data.team1.points;
        points_team2.innerHTML = data.team2.points;

        sets_team1.innerHTML = data.team1.sets;
        sets_team2.innerHTML = data.team2.sets;
    });
}

setInterval(update, 500);