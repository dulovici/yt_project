
'use strict'

// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=BMW&key=[YOUR_API_KEY]'
// const key = 'AIzaSyDSXjGS5-H-o6Dn7e1DWrh3mfho7HAZ1n4';


const main = document.querySelector('main');
const input = document.querySelector('input')

function generatePage(data) {
    data.forEach(e => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const img = document.createElement('img');
        img.src = `${e.snippet.thumbnails.high.url}`;
        const h2 = document.createElement('h2');
        h2.textContent = `${e.snippet.title}`;
        const par = document.createElement('p');
        par.textContent = `${e.snippet.description}`;
        const video = document.createElement('iframe');
        video.src = `https://www.youtube.com/embed/${e.id.videoId}`;
        video.setAttribute('class', 'player')

        main.append(card);
        card.append(img);
        card.append(h2);
        card.append(par)

        card.addEventListener('click', function (e) {
            main.append(video)
        })
    })
}

function getData() {
    const req = new XMLHttpRequest();
    req.open('GET', `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${input.value}&key=AIzaSyDSXjGS5-H-o6Dn7e1DWrh3mfho7HAZ1n4`);
    req.send();
    req.onload = function () {
        const data = JSON.parse(req.responseText).items;
        generatePage(data);

        console.log(data);
    }
}

input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        main.innerHTML = '';
        getData();
        input.value = '';
    }
})

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
        const player = document.querySelector('iframe');
        player.classList.add('hide')
    }
})

