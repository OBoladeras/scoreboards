var currentSet = 1;
var scoreboard = {};

function pull() {
    fetch('/api/' + sport + '/' + id, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    }).catch(function (error) {
        alert('Request failed', error);
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        scoreboard = data;
    });
}

function push() {
    fetch('/api/' + sport + '/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreboard),
    })
}


function changePoitns(id, add = true) {
    span = document.getElementById(id);

    if (add) {
        if (span.innerHTML == "av") {
            span.innerHTML = 'av';
        }
        else {
            current = parseInt(span.innerHTML);
            if (current == 0) {
                span.innerHTML = 15;
            } else if (current == 15) {
                span.innerHTML = 30;
            } else if (current == 30) {
                span.innerHTML = 40;
            } else if (current == 40) {
                span.innerHTML = "av";
            }
        }
    } else {
        if (span.innerHTML == "av") {
            span.innerHTML = 40;
        }
        else {
            current = parseInt(span.innerHTML);
            if (current == 40) {
                span.innerHTML = 30;
            } else if (current == 30) {
                span.innerHTML = 15;
            } else if (current == 15) {
                span.innerHTML = 0;
            }
        }
    }

    if (id == "pointsJ1") {
        scoreboard.player1.points = span.innerHTML;
    }
    else {
        scoreboard.player2.points = span.innerHTML;
    }

    update();
}


function workingSet(add = true) {
    span = document.getElementById('set');
    currentSet = parseInt(span.innerHTML);

    if (add) {
        if (currentSet < 3) {
            currentSet++;
            span.innerHTML = currentSet;
        }
    }
    else {
        if (currentSet > 1) {
            currentSet--;
            span.innerHTML = currentSet;
        }
    }

    setsJ1 = document.getElementById('setsJ1');
    setsJ2 = document.getElementById('setsJ2');

    setsJ1.innerHTML = scoreboard.player1.sets[currentSet - 1];
    setsJ2.innerHTML = scoreboard.player2.sets[currentSet - 1];
}

function changeSet(id, add = true) {
    span = document.getElementById(id);
    set = parseInt(span.innerHTML);

    if (add) {
        if (set < 6) {
            set++;
            span.innerHTML = set;
        }
    }
    else {
        if (set > 0) {
            set--;
            span.innerHTML = set;
        }
    }

    if (id == "setsJ1") {
        scoreboard.player1.sets[currentSet - 1] = set;
    }
    else {
        scoreboard.player2.sets[currentSet - 1] = set;
    }

    update();
}


function updatePlayers() {
    player1 = document.getElementById('player1');
    player2 = document.getElementById('player2');
    player1Input = document.getElementById('player1Input');
    player2Input = document.getElementById('player2Input');

    player1.innerHTML = player1Input.value;
    player2.innerHTML = player2Input.value;

    scoreboard.player1.name = player1Input.value;
    scoreboard.player2.name = player2Input.value;
}


function update(first = false) {
    if (first) {
        pointsJ1 = document.getElementById('pointsJ1');
        pointsJ2 = document.getElementById('pointsJ2');

        pointsJ1.innerHTML = scoreboard.player1.points;
        pointsJ2.innerHTML = scoreboard.player2.points;


        setsJ1 = document.getElementById('setsJ1');
        setsJ2 = document.getElementById('setsJ2');

        setsJ1.innerHTML = scoreboard.player1.sets[0];
        setsJ2.innerHTML = scoreboard.player2.sets[0];
    }

    player1 = document.getElementById('player1');
    player2 = document.getElementById('player2');
    marcador_set1_j1 = document.getElementById('marcador_set1_j1');
    marcador_set2_j1 = document.getElementById('marcador_set2_j1');
    marcador_set3_j1 = document.getElementById('marcador_set3_j1');
    marcador_set1_j2 = document.getElementById('marcador_set1_j2');
    marcador_set2_j2 = document.getElementById('marcador_set2_j2');
    marcador_set3_j2 = document.getElementById('marcador_set3_j2');
    marcador_punto_j1 = document.getElementById('marcador_punto_j1');
    marcador_punto_j2 = document.getElementById('marcador_punto_j2');


    player1.innerHTML = scoreboard.player1.name;
    player2.innerHTML = scoreboard.player2.name;
    marcador_set1_j1.innerHTML = scoreboard.player1.sets[0];
    marcador_set2_j1.innerHTML = scoreboard.player1.sets[1];
    marcador_set3_j1.innerHTML = scoreboard.player1.sets[2];
    marcador_set1_j2.innerHTML = scoreboard.player2.sets[0];
    marcador_set2_j2.innerHTML = scoreboard.player2.sets[1];
    marcador_set3_j2.innerHTML = scoreboard.player2.sets[2];
    marcador_punto_j1.innerHTML = scoreboard.player1.points;
    marcador_punto_j2.innerHTML = scoreboard.player2.points;
}