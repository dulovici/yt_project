
'use strict'

// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=BMW&key=[YOUR_API_KEY]'
// const key = 'AIzaSyDSXjGS5-H-o6Dn7e1DWrh3mfho7HAZ1n4';


const main = document.querySelector('main');
const input = document.querySelector('input')
const button = document.querySelector('button');

const numberOfObjectOnPage = 12;
let currentMaxNumberOfObjectsFromApi = 12;
let inputValue = '';

input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        // renderData();
        renderDataTest();

        inputValue = input.value;
        button.style.visibility = "visible";
    }
})

button.addEventListener('click', function () {
    // renderData();
    renderDataTest();
})

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
        const player = document.querySelector('iframe');
        player.classList.add('hide')
    }
})

//////////////// TEST VERSION ////////////////

function renderDataTest() {
    main.innerHTML = '';

    // const req = new XMLHttpRequest();
    // req.open('GET', `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${currentMaxNumberOfObjectsFromApi}&q=${inputValue}&key=AIzaSyDSXjGS5-H-o6Dn7e1DWrh3mfho7HAZ1n4`);
    // req.send();
    // req.onload = function () {
    //     const data = JSON.parse(req.responseText).items;

    filterDataTest(currentMaxNumberOfObjectsFromApi);
    // fillDom(filterData(data));

    //     console.log(filterData(data));
    // }

    currentMaxNumberOfObjectsFromApi+=numberOfObjectOnPage;
}

function filterDataTest(data) {
    if (data === numberOfObjectOnPage) {
        return data;
    }
    console.log(data - numberOfObjectOnPage);
    console.log(currentMaxNumberOfObjectsFromApi);
    // if (data.length === numberOfObjectOnPage) {
    //     return data;
    // }
    // return data.splice(data.length - numberOfObjectOnPage, data.length);
}

//////////////// END TEST VERSION ////////////////

function renderData() {
    main.innerHTML = '';

    const req = new XMLHttpRequest();
    req.open('GET', `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${currentMaxNumberOfObjectsFromApi}&q=${inputValue}&key=AIzaSyDSXjGS5-H-o6Dn7e1DWrh3mfho7HAZ1n4`);
    req.send();
    req.onload = function () {
        const data = JSON.parse(req.responseText).items;
        const filteredData = filterData(data);

        fillDom(filteredData);
        console.log(filterData(filteredData));
    }

    currentMaxNumberOfObjectsFromApi+=numberOfObjectOnPage;
}

function filterData(data) {
    if (data.length === numberOfObjectOnPage) {
        return data;
    }
    return data.splice(data.length - numberOfObjectOnPage, data.length);
}

function fillDom(data) {
    data.forEach(e => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        main.append(card);

        const img = document.createElement('img');
        img.src = `${e.snippet.thumbnails.high.url}`;
        card.append(img);

        const h2 = document.createElement('h2');
        h2.textContent = `${e.snippet.title}`;
        card.append(h2);

        const par = document.createElement('p');
        par.textContent = `${e.snippet.description}`;
        card.append(par);

        const video = document.createElement('iframe');
        video.src = `https://www.youtube.com/embed/${e.id.videoId}`;
        video.setAttribute('class', 'player')
        card.addEventListener('click', function () {
            main.append(video)
        })
    })
}
