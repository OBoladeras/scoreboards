urlParts = window.location.href.split('/');


sportPosition = urlParts.indexOf('sport');

sport = urlParts[sportPosition + 1];
id = urlParts[sportPosition + 2];





// setTimeout(function () {
//     window.location.reload();
// }, 1000);