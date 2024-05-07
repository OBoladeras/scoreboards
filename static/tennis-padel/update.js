name_j1 = document.getElementById('name_j1');
points_j1 = document.getElementById('points_j1');
set1_j1 = document.getElementById('set1_j1');
set2_j1 = document.getElementById('set2_j1');
set3_j1 = document.getElementById('set3_j1');

name_j2 = document.getElementById('name_j2');
points_j2 = document.getElementById('points_j2');
set1_j2 = document.getElementById('set1_j2');
set2_j2 = document.getElementById('set2_j2');
set3_j2 = document.getElementById('set3_j2');

function update() {
    fetch('/api/tennis-padel/' + id, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    }).catch(function (error) {
        console.log('Request failed', error);
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        name_j1.innerHTML = data.player1.name;
        points_j1.innerHTML = data.player1.points;
        set1_j1.innerHTML = data.player1.sets[0];
        set2_j1.innerHTML = data.player1.sets[1];
        set3_j1.innerHTML = data.player1.sets[2];


        name_j2.innerHTML = data.player2.name;
        points_j2.innerHTML = data.player2.points;
        set1_j2.innerHTML = data.player2.sets[0];
        set2_j2.innerHTML = data.player2.sets[1];
        set3_j2.innerHTML = data.player2.sets[2];
    });
}

setInterval(update, 500);