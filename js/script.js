let inputUserNameField = document.getElementById('githubUserName');
let userName = 'AlexTereschenko';
const requestURL = 'https://api.github.com/';
let repositoriesList = document.getElementById('repositories');
let repositories;
let loading = document.querySelector('.loading');
let logo = document.getElementById('photo');
let languagesList = document.getElementById('languages');
let locations = document.getElementById('location');


inputUserNameField.addEventListener('input', function() {
    let inputUnspaced = [...inputUserNameField.value].filter(e => e !== ' ').join('');
    userName = inputUserNameField.value ? inputUnspaced : 'AlexTereschenko';
})

formElem.onsubmit = async (e) => {
    e.preventDefault();

    fetchRepos()
};

async function fetchRepos() {
    loadingScreenAdder()
    try {
        let response = await fetch(`${requestURL}users/${userName}/repos`)
        let body = await response.json(); 
        repositories = body;

        loadingScreenRemover();
        getPhoto();
        getName();
        getLanguages();
        getLocation()
        addRepositories();
    } 
    catch {
        return null;
    }
}

function getName() {
    document.getElementById('name').innerHTML = userName;
}

function getPhoto() {
    try {
        logo.src = repositories[0].owner.avatar_url;
    }
    catch {
        logo.src = 'img/userDefault.png';
        alert('Sorry, the specified user does not exist');
    }
}

function getLanguages() {
    try {
        let langArr = [];
        for (let i = 0; i < repositories.length; i++) {
            langArr.push(repositories[i].language)
        }
        let uniqueLanguages = (langArr.filter((value, index, self) => ((self.indexOf(value) === index) && (value !== null)))).join(', ')
        languagesList.innerHTML = uniqueLanguages;
    }
    catch {
        languagesList.innerHTML = 'not defined';
    }
    
}

async function getLocation() {
    loadingScreenAdder()

    try {
        await fetch(`${requestURL}users/${userName}`)
        .then((response) => {
        if (response.status === 404) {
            throw new Error();
        } 
            return response.json();
        })
        .then((data) => {
            locations.innerHTML = data.location ? data.location : 'not declared';
            loadingScreenRemover();
        });
    }
    catch {
        locations.innerHTML = null;
        loadingScreenRemover();
        userName = '404 invalid userName ;)';
        getName();
    }
}

function addRepositories() {
    repositoriesList.innerHTML = '';
    for (let i = 0; i < repositories.length; i++) {
        let li = document.createElement('li');
        li.className = 'repository';

        let p = document.createElement('p');
        p.classList.add('repository__name');
        let nameTextNode = document.createTextNode(repositories[i].name);
        p.appendChild(nameTextNode);

        let span = document.createElement('span');
        let arrowTextNode = document.createTextNode('expand_more');
        span.appendChild(arrowTextNode);
        span.classList.add('arrow');
        span.classList.add('material-symbols-outlined');
        span.classList.add('unselectable');
        span.classList.add('repository__name__icon');
        span.classList.add('chocolate');

        p.appendChild(span);

        let div = document.createElement('div');
        div.classList.add('closed');
        div.classList.add('time-container');
        let lastCommitTextNode = document.createTextNode('');
        div.appendChild(lastCommitTextNode);
        
        li.appendChild(p);
        li.appendChild(div);

        repositoriesList.appendChild(li);
    }
}

async function getLastCommitDate(repo, div) {
    loadingScreenAdder()
    await fetch(`${requestURL}repos/${userName}/${repo}/commits`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        div.innerHTML = `Last committed at ${data[0].commit.author.date}`;
        loadingScreenRemover();
    });
}

repositoriesList.addEventListener('click', function(event) {
    let clickedEl = event.target;
    const delay = 60000;
    let timeOfClick = new Date().getTime();

    if (clickedEl.classList.contains('repository__name')) {
        clickChecking(clickedEl);
    }
    if (clickedEl.classList.contains('repository__name__icon')) {
        clickChecking(clickedEl.parentElement);
    }

    function clickChecking(clickTarget) {
        let nextToTarget = clickTarget.nextElementSibling;
        let lastRequestTime = nextToTarget.dataset.LastRequestTime;
        let timeDiff = (timeOfClick - lastRequestTime)>delay;

        clickTarget.lastChild.classList.toggle('rotate-onclick');
        nextToTarget.classList.toggle('closed');

        if(!lastRequestTime || timeDiff) {
            lastRequestTime = timeOfClick;
        };
        if (nextToTarget.textContent === '' || timeDiff) {
            getLastCommitDate(clickTarget.firstChild.textContent, nextToTarget);
        };
    }
});

function loadingScreenAdder() {
    loading.classList.remove('hide');
}

function loadingScreenRemover() {
    loading.classList.add('hide');
}


document.addEventListener('DOMContentLoaded', fetchRepos());