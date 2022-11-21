let inputUserNameField = document.getElementById('githubUserName');
let userName = 'AlexTereschenko';
let getBtn = document.getElementById('get-btn');
let requestURL = 'https://api.github.com/users/'+userName+'/repos';
let repos = document.getElementById('repos');
let repositories;
let loading = document.querySelector('.loading');
let nameSpan = document.getElementById('name');
let logo = document.getElementById('photo');
let languages = document.getElementById('languages');
let locations = document.getElementById('location');


inputUserNameField.addEventListener("input", function() {
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
        let response = await fetch(`https://api.github.com/users/${userName}/repos`)
        if (!response.ok) {
            throw new Error('Sorry, the specified user does not exist');
        }  
        let body = await response.json(); 
        repositories = body;
        loading.classList.add('hide');

        getPhoto();
        getName();
        getLanguages();
        getLocation()
        addRepos();
    } 
    catch (error) {
        console.log(error);
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
        languages.innerHTML = uniqueLanguages;
    }
    catch {
        languages.innerHTML = 'not defined';
    }
    
}

async function getLocation() {
    loading.classList.remove('hide');

    try {
        await fetch(`https://api.github.com/users/${userName}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('ohh no wrong username');
            }
            return response.json();
        })
        .then((data) => {
            locations.innerHTML = data.location ? data.location : 'not declared';
            loading.classList.add('hide');
        });
    }
    catch (error) {
        locations.innerHTML = null;
        loading.classList.add('hide');
        // console.log(error);
    }
}

function addRepos() {
    repos.innerHTML = '';
    for (let i = 0; i < repositories.length; i++) {
        let li = document.createElement('li');
        li.className = 'repository';

        let firstBlock = document.createElement('p');
        let name = document.createTextNode(repositories[i].name);
        let spanArrow = document.createElement('span');
        spanArrow.classList.add('btn');
        let spanText = document.createTextNode('expand_more');
        spanArrow.appendChild(spanText);
        spanArrow.classList.add('material-symbols-outlined');
        spanArrow.classList.add('unselectable');
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
    let timeOfClick = new Date().getTime();
    let timeDiff = (timeOfClick - event.target.nextElementSibling.dataset.LastRequestTime)>60000;

    if (event.target.tagName === 'P') {
        event.target.lastChild.classList.toggle('rotate-onclick');
        event.target.nextElementSibling.classList.toggle('closed');
        if(!event.target.nextElementSibling.dataset.LastRequestTime || timeDiff) {
            event.target.nextElementSibling.dataset.LastRequestTime = timeOfClick;
        };
        if (event.target.nextElementSibling.textContent === '' || timeDiff) {
            getLastCommitDate(event.target.firstChild.textContent, event.target.nextElementSibling);
        };
    }
    if (event.target.tagName === 'SPAN') {
        event.target.classList.toggle('rotate-onclick');
        event.target.parentElement.nextElementSibling.classList.toggle('closed');
        if(!event.target.parentElement.nextElementSibling.dataset.LastRequestTime || timeDiff) {
            event.target.parentElement.nextElementSibling.dataset.LastRequestTime = timeOfClick;
        };
        if (event.target.parentElement.nextElementSibling.textContent === '' || timeDiff) {
            getLastCommitDate(event.target.parentElement.firstChild.textContent, event.target.parentElement.nextElementSibling);
        };
    }
});

document.addEventListener("DOMContentLoaded", fetchRepos());