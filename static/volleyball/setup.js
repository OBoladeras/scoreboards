function updateImage() {
    var image = document.getElementById("image");
    var select = document.getElementById("select");
    image.src = select.value;
}