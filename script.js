


// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=BMW&key=[YOUR_API_KEY]'
// const key = 'AIzaSyDSXjGS5-H-o6Dn7e1DWrh3mfho7HAZ1n4';

(function () {
    'use strict'
    const key = 'AIzaSyDSXjGS5-H-o6Dn7e1DWrh3mfho7HAZ1n4';
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const logo = document.querySelector('.logo');
    const input = document.querySelector('input');
    const nextBtn = document.querySelector('.next');
    const videoSec = document.querySelector('section');
    let inputValue;

    //PARAMETARS FOR NUMBER & CHOISE OF CARDS
    const numOfCards = 12;
    let currentNumOfCards = 12;






    //GETTING DATA FROM API

    function getData(id) {
        //API LINKS
        const initialData = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${currentNumOfCards}&q=${inputValue}&key=${key}`;
        const relatedVideos = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&relatedToVideoId=${id}&key=${key}&type=video`;

        const req = new XMLHttpRequest();
        req.open('GET', id ? relatedVideos : initialData);
        req.send();
        req.onload = function () {
            const data = JSON.parse(req.responseText).items;
            console.log(data);
            if (data.length === numOfCards) generatePage(data);
            else generatePage(data.splice(data.length - numOfCards, data.length));
        }
    }

    //CREATING HTML FROM RECIVED DATA
    function generatePage(apiData) {
        apiData.forEach(e => {
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

            card.addEventListener('click', function () {
                videoSec.innerHTML = '';
                main.innerHTML = '';
                videoSec.append(video)
                getData(e.id.videoId)
            })
        })
    }

    //=======EVENTS========//
    input.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            inputValue = input.value;
            main.innerHTML = '';
            getData();
            input.value = '';

            nextBtn.classList.remove('hide')
        }
    })

    nextBtn.addEventListener('click', function (e) {
        main.innerHTML = '';
        currentNumOfCards += numOfCards;
        getData();

    })

    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 27) {
            const player = document.querySelector('iframe');
            player.classList.add('hide')
        }
    })
    logo.addEventListener('click', function () {
        videoSec.innerHTML = '';
        main.innerHTML = '';
        nextBtn.classList.add('hide')
    })

})()


