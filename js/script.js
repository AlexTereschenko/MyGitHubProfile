let inputUserNameField = document.getElementById('githubUserName');
let userName = 'AlexTereschenko';
let getBtn = document.getElementById('get-btn');
const requestURL = 'https://api.github.com/users/';
let repos = document.getElementById('repos');
let repositories;
let loading = document.querySelector('.loading');
let nameSpan = document.getElementById('name');
let logo = document.getElementById('photo');
let languages = document.getElementById('languages');
let locations = document.getElementById('location');


inputUserNameField.addEventListener('input', function() {
    let inputUnspaced = [...document.getElementById('githubUserName').value].filter(e => e !== ' ').join('');
    userName = inputUserNameField.value ? inputUnspaced : 'AlexTereschenko';
})

formElem.onsubmit = async (e) => {
    e.preventDefault();

    fetchRepos()
};

async function fetchRepos() {
    loading.classList.remove('hide');
    try {
        let response = await fetch(requestURL+userName+'/repos')
        let body = await response.json(); 
        repositories = body;
        loading.classList.add('hide');

        getPhoto();
        getName();
        getLanguages();
        getLocation()
        addRepos();
    } 
    catch {
        return null;
    }
}

function getName() {
    nameSpan.innerHTML = userName;
}

function getPhoto() {
    try {
        logo.src = repositories[0].owner.avatar_url;
    }
    catch {
        logo.src = 'img/userDefault.png';
        alert('Sorry, the specified user does not exist, you will be redirected to main page');
    }
}

function getLanguages() {
    try {
        let langArr = [];
        for (let i = 0; i < repositories.length; i++) {
            langArr.push(repositories[i].language)
        }
        let uniqueLanguages = (langArr.filter((value, index, self) => ((self.indexOf(value) === index) && (value !== null)))).join(', ')
        languages.innerHTML = uniqueLanguages;
    }
    catch {
        languages.innerHTML = 'not defined';
    }
    
}

async function getLocation() {
    loading.classList.remove('hide');

    try {
        await fetch(requestURL+userName)
        .then((response) => {
        if (response.status === 404) {
            window.open('/', '_self'); //just a patch to avoid creating a separate 404 page
        } 
            return response.json();
        })
        .then((data) => {
            locations.innerHTML = data.location ? data.location : 'not declared';
            loading.classList.add('hide');
        });
    }
    catch {
        locations.innerHTML = null;
        loading.classList.add('hide');
    }
}

function addRepos() {
    repos.innerHTML = '';
    for (let i = 0; i < repositories.length; i++) {
        let li = document.createElement('li');
        li.className = 'repository';

        let firstBlock = document.createElement('p');
        firstBlock.classList.add('repository__name');
        let name = document.createTextNode(repositories[i].name);
        let spanArrow = document.createElement('span');
        spanArrow.classList.add('btn');
        let spanText = document.createTextNode('expand_more');
        spanArrow.appendChild(spanText);
        spanArrow.classList.add('material-symbols-outlined');
        spanArrow.classList.add('unselectable');
        spanArrow.classList.add('repository__name__icon');
        firstBlock.appendChild(name);
        firstBlock.appendChild(spanArrow);
        let secondBlock = document.createElement('div');
        secondBlock.classList.add('closed');
        secondBlock.classList.add('time-container');
        let lastCommit = document.createTextNode('');
        secondBlock.appendChild(lastCommit);
        
        li.appendChild(firstBlock);
        li.appendChild(secondBlock);

        repos.appendChild(li);
    }
}

async function getLastCommitDate(repo, timeBlock) {
    loading.classList.remove('hide');
    return await fetch(`https://api.github.com/repos/${userName}/${repo}/commits`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        timeBlock.innerHTML = `Last committed at ${data[0].commit.author.date}`;
        loading.classList.add('hide');
    });
}

repos.addEventListener('click', function(event) {
    const delay = 60000;
    let timeOfClick = new Date().getTime();

    if (event.target.classList.contains('repository__name')) {
        clickChecking(event.target);
    }
    if (event.target.classList.contains('repository__name__icon')) {
        clickChecking(event.target.parentElement);
    }

    function clickChecking(clickTarget) {
        let lastRequestTime = clickTarget.nextElementSibling.dataset.LastRequestTime;
        let timeDiff = (timeOfClick - lastRequestTime)>delay;

        clickTarget.lastChild.classList.toggle('rotate-onclick');
        clickTarget.nextElementSibling.classList.toggle('closed');

        if(!lastRequestTime || timeDiff) {
            lastRequestTime = timeOfClick;
        };
        if (clickTarget.nextElementSibling.textContent === '' || timeDiff) {
            getLastCommitDate(clickTarget.firstChild.textContent, clickTarget.nextElementSibling);
        };
    }
});


document.addEventListener('DOMContentLoaded', fetchRepos());