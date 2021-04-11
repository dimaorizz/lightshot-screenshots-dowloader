const fetch = require('node-fetch');
const parser = require('node-html-parser');
const fs = require('fs');

const defaultUrl = 'https://prnt.sc/';

function generateID(len) {
    const alphabet = '1234567890qwertyuiopasdfghjklzxcvbnm';
    let id = '';
    for(let i = 0; i < len; i++) {
        id += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return id;
}

function downloadImage() {
    let randomId = generateID(6);
    const reqUrl = defaultUrl + randomId;
    fetch(reqUrl)
    .then(res => res.text())
    .then(body => {
        const root = parser.parse(body);
        const imageUrl = root.querySelector('#screenshot-image').getAttribute('src');
        if(imageUrl === '//st.prntscr.com/2021/04/08/1538/img/0_173a7b_211be8ff.png') {
            return;
        }
        fetch(imageUrl)
        .then(res => res.buffer())
        .then(buffer => {
            fs.writeFileSync(`images/${randomId}.png`, buffer);
        })
        });
}

let downloadTimer = setInterval(() => {
    downloadImage();
}, 2000);
