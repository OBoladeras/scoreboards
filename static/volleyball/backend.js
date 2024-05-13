var currentSet = 1;


function add(item) {
    var span = item.parentElement.children[1];
    var team = item.parentElement.parentElement.getAttribute('team');
    var type = item.parentElement.getAttribute('type');

    scoreboard[team][type] = parseInt(span.innerHTML) + 1;
    span.innerHTML = scoreboard[team][type];

    if (type == 'points') {
        push();
    }
}

function subtract(item) {
    var span = item.parentElement.children[1];
    var team = item.parentElement.parentElement.getAttribute('team');
    var type = item.parentElement.getAttribute('type');

    if (parseInt(span.innerHTML) == 0) {
        return;
    }

    scoreboard[team][type] = parseInt(span.innerHTML) - 1;
    span.innerHTML = scoreboard[team][type];

    if (type == 'points') {
        push();
    }
}

function update() {
    // document.getElementById('table_name_team1').innerHTML = scoreboard['team1']['name'];
    // document.getElementById('table_name_team2').innerHTML = scoreboard['team2']['name'];

    // document.getElementById('table_sets_team1').innerHTML = scoreboard['team1']['sets'];
    // document.getElementById('table_sets_team2').innerHTML = scoreboard['team2']['sets'];

    // document.getElementById('table_points_team1').innerHTML = scoreboard['team1']['points'];
    // document.getElementById('table_points_team2').innerHTML = scoreboard['team2']['points'];

    // document.getElementById('table_changes_team1').innerHTML = scoreboard['team1']['changes'];
    // document.getElementById('table_changes_team2').innerHTML = scoreboard['team2']['changes'];

    board = document.getElementById('board');

    team1 = board.children[0];
    team2 = board.children[1];

    console.log(team1.children[0]);

    team1.children[0].innerHTML = scoreboard['team1']['name'];
    team1.children[2].children[1].innerHTML = scoreboard['team1']['sets'];
    team1.children[4].children[1].innerHTML = scoreboard['team1']['points'];
    team1.children[6].children[1].innerHTML = scoreboard['team1']['changes'];

    team2.children[0].innerHTML = scoreboard['team2']['name'];
    team2.children[2].children[1].innerHTML = scoreboard['team2']['sets'];
    team2.children[4].children[1].innerHTML = scoreboard['team2']['points'];
    team2.children[6].children[1].innerHTML = scoreboard['team2']['changes'];
}