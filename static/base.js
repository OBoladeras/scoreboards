urlParts = window.location.href.split('/');

sportPosition = urlParts.indexOf('sport');
sport = urlParts[sportPosition + 1];
id = urlParts[sportPosition + 2];

var url = `/api/${sport}/${id}`
var scoreboard = {};


function pull() {
    fetch(url, {
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

function push(message = true) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreboard),
    }).catch(function (error) {
        alert('Request failed', error);
    }).then(function (response) {
        if (message) {
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
}


function previewLogo(event, previewId) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;
        var logoPreview = document.getElementById(previewId);
        logoPreview.src = dataURL;
        logoPreview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
}


// setTimeout(function () {
//     window.location.reload();
// }, 1000);