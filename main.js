let clicked = false;
let content = document.getElementById('maincontent');

url = 'https://api.giphy.com/v1/gifs/random?api_key=Owva3BYrjrnx7GBcyeo39S6sRmo84uNN&rating=g'

function loadImg(num) {
    for (let i = 0; i < num; i++) {

        fetch(url)
            .then((response) => response.json())
            .then((giphy) => createNode(giphy.data.images.original.url));
    }

    document.getElementById('refresh').style.visibility = "visible";
}

function createNode(imageUrl) {
    let image = document.createElement("img");
    image.setAttribute('src', imageUrl);
    image.addEventListener('click', open, false)
    image.classList.add('giffy');
    document.getElementById('maincontent').appendChild(image);
}

function open(url) {
    event.preventDefault();
    clicked = true;
    hideAll();
    showClicked(this);
}

function showClicked(clickedContent) {
    document.getElementById('close').style.display = 'flex';
    let previous = clickedContent.previousElementSibling;
    let next = clickedContent.nextSibling;
    clickedContent.classList.remove('.hiddencontent')
    clickedContent.classList.add('mainItem')

    if (previous !== null) {
        previous.classList.remove('.hiddencontent')
        previous.classList.add('mini')
    }

    if (next !== null) {
        next.classList.remove('.hiddencontent')
        next.classList.add('mini')
    }

}

function hideAll() {
    let all = document.querySelectorAll('.giffy');
    for (let i = 0; i < all.length; i++) {
        let current = all[i];
        if (current.classList.contains('mainItem')) {
            current.classList.remove('mainItem');
        }

        if (current.classList.contains('mini')) {
            current.classList.remove('mini');
        }

        current.classList.add('hiddencontent');
    }

}

function refresh() {
    console.log(document.querySelectorAll('.giffy'))
    clicked = false;
    document.getElementById('close').style.display = 'none';
    clearImages();
    loadImg(10);
}

function clearImages() {
    let all = document.querySelectorAll('.giffy');
    for (let i = 0; i < all.length; i++) {
        let current = all[i];
        current.remove();
    }

}


window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && clicked === false) {
        loadImg(5);
    }

};

function goBack() {

    let all = document.querySelectorAll('.giffy');
    for (let i = 0; i < all.length; i++) {
        let current = all[i];
        if (current.classList.contains('mainItem')) {
            current.classList.remove('mainItem');
        }

        if (current.classList.contains('mini')) {
            current.classList.remove('mini');
        }

        if (current.classList.contains('hiddencontent')) {
            current.classList.remove('hiddencontent')
        }

    }

    document.getElementById('close').style.display = 'none';
    clicked = false;
}

loadImg(10);