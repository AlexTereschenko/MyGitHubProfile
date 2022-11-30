const inputUserNameField = document.getElementById('githubUserName');
const myName = document.getElementById('name');
const myAvatar = document.getElementById('photo');
const myLocations = document.getElementById('location');
const repositoriesList = document.getElementById('repositories');
const myLanguages = document.getElementById('languages');
const loading = document.querySelector('.js-loading');

const GITHUB_API_URL = 'https://api.github.com/';

let userName = 'AlexTereschenko';

// methods
function loadingScreenToggler(show = true) {
    show ? loading.classList.remove('hide') : loading.classList.add('hide');
};

async function getUserInfo() {
    loadingScreenToggler();
    try {
        const response = await fetch(`${GITHUB_API_URL}users/${userName}`)
        const userInfo = await response.json(); 

        if (response.status === 404) {
            throw new Error();
        };

        myName.innerHTML = userName;
        myAvatar.src = userInfo.avatar_url ? userInfo.avatar_url : 'img/userDefault.png';
        myLocations.innerHTML = userInfo.location ? userInfo.location : 'not declared';

        getRepositoriesInfo();
    } 
    catch {
        myName.innerHTML = '404 invalid userName ;)';
        myAvatar.src = 'img/userDefault.png';
        myLanguages.innerHTML = 'not declared';
        myLocations.innerHTML = 'not declared';
        repositoriesList.innerHTML = '';
        alert('Sorry, the specified user does not exist');
        loadingScreenToggler(false);
    };
};

async function getRepositoriesInfo() {
    const response = await fetch(`${GITHUB_API_URL}users/${userName}/repos`)
    const repoInfo = await response.json(); 

    // add languages
    const langArr = [];
    for (let i = 0; i < repoInfo.length; i++) {
        langArr.push(repoInfo[i].language)
    }
    const uniqueLanguages = (langArr.filter((value, index, self) => ((self.indexOf(value) === index) && (value !== null)))).join(', ')
    myLanguages.innerHTML = uniqueLanguages;

    // add repositories
    repositoriesList.innerHTML = '';

    const fullRepoList = repoInfo.reduce(function (acc, cur, i) {
        cur = 
        `<li class="repository">
            <p class="repository__name"><a href="${repoInfo[i].html_url}" target="_blank" class="repository__name__link">${repoInfo[i].name}</a><span class="arrow material-symbols-outlined unselectable repository__name__icon chocolate">expand_more</span></p>
            <div class="time-container closed" data--last-request-time=""></div>
        </li>`;
        return acc + cur;
    }, '');

    repositoriesList.innerHTML = fullRepoList;

    loadingScreenToggler(false);
};

async function getLastCommitDate(repo, div) {
    loadingScreenToggler();

    const response = await fetch(`${GITHUB_API_URL}repos/${userName}/${repo}/commits`)
    const commitDates = await response.json();
    const [date, time] = (commitDates[0].commit.author.date).slice(0, -1).split('T')

    div.innerHTML = `Last committed at ${time} / ${date}`;

    loadingScreenToggler(false);
}

repositoriesList.addEventListener('click', function(event) {
    const clickedEl = event.target;
    const delay = 60000;
    const timeOfClick = new Date().getTime();

    if (clickedEl.classList.contains('repository__name')) {
        clickChecking(clickedEl);
    }
    if (clickedEl.classList.contains('repository__name__icon')) {
        clickChecking(clickedEl.parentElement);
    }

    function clickChecking(clickTarget) {
        const nextToTarget = clickTarget.nextElementSibling;

        const lastRequestTime = nextToTarget.dataset.LastRequestTime ? 
            nextToTarget.dataset.LastRequestTime :
            nextToTarget.dataset.LastRequestTime = timeOfClick;
        const timeDiff = (timeOfClick - lastRequestTime)>delay;

        if(!lastRequestTime || timeDiff) {
            nextToTarget.dataset.LastRequestTime = timeOfClick
        };

        clickTarget.firstChild.nextElementSibling.classList.toggle('rotate-onclick');
        nextToTarget.classList.toggle('closed');

        if (nextToTarget.textContent === '' || timeDiff) {
            getLastCommitDate(clickTarget.firstChild.textContent, nextToTarget);
        };
    }
});

// listeners
inputUserNameField.addEventListener('input', function() {
    const inputUnspaced = [...inputUserNameField.value].filter(e => e !== ' ').join('');
    userName = inputUserNameField.value ? inputUnspaced : 'AlexTereschenko';
})

formElem.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    getUserInfo();
})

document.addEventListener('DOMContentLoaded', getUserInfo);