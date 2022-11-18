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
    inputUnspaced = [...document.getElementById('githubUserName').value].filter(e => e !== ' ').join('');
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
        // if (response.status === '403') {
        //     throw new Error('403 is unacceptalble for me');
        // }
        // if (response.status === '404') {
        //     throw new Error('404 ohh no');
        // }
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
            // if (response.status === '404') {
            //     throw new Error('404 ohh no');
            // }
            return response.json();
        })
        .then((data) => {
            locations.innerHTML = data.location ? data.location : 'not declared';
            loading.classList.add('hide');
        });

        
    }
    catch {
        // console.log('404 ohh no');
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
        getLastCommitDate(repositories[i].name, secondBlock);
        
        li.appendChild(firstBlock);
        li.appendChild(secondBlock);

        repos.appendChild(li);
    }
}

async function getLastCommitDate(repo, secondBlock) {
    loading.classList.remove('hide');
    return await fetch(`https://api.github.com/repos/${userName}/${repo}/commits`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let lastCommit = document.createTextNode(`Last committed at ${data[0].commit.author.date}`);
        // let lastCommit = document.createTextNode(new Date(data[0].commit.author.date));
        secondBlock.appendChild(lastCommit);
        loading.classList.add('hide');
    });
}

repos.addEventListener('click', function(event) {
    if (event.target.tagName === 'P') {
        event.target.lastChild.classList.toggle('rotate-onclick');
        event.target.nextElementSibling.classList.toggle('closed');
    } else {
        if (event.target.tagName === 'SPAN') {
            event.target.classList.toggle('rotate-onclick');
            event.target.parentElement.nextElementSibling.classList.toggle('closed');
        }
    }
});

document.addEventListener("DOMContentLoaded", fetchRepos());