const ERRORS_DESCRIPTIONS = {
    // Redirection messages
    '300': "Multiple Choices",
    // The request has more than one possible response. The user agent or user should choose one of them. (There is no standardized way of choosing one of the responses, but HTML links to the possibilities are recommended so the user can pick.)
    "301": 'Moved Permanently',
    // The URL of the requested resource has been changed permanently. The new URL is given in the response.
    '302': 'Found',
    // This response code means that the URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.
    '303': 'See Other',
    // The server sent this response to direct the client to get the requested resource at another URI with a GET request.
    '304': 'Not Modified',
    // This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.
    '305': 'Use Proxy Deprecated',
    // Defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.
    '306': 'unused',
    // This response code is no longer used; it is just reserved. It was used in a previous version of the HTTP/1.1 specification.
    '307': 'Temporary Redirect',
    // The server sends this response to direct the client to get the requested resource at another URI with same method that was used in the prior request. This has the same semantics as the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
    '308': 'Permanent Redirect',
    // This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
    // Client error responses
    '400': 'Bad Request',
    // The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
    '401': 'Unauthorized',
    // Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
    '402': 'Payment Required Experimental',
    // This response code is reserved for future use. The initial aim for creating this code was using it for digital payment systems, however this status code is used very rarely and no standard convention exists.
    '403': 'Forbidden',
    // The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
    '404': 'Not Found',
    // The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
    '405': 'Method Not Allowed',
    // The request method is known by the server but is not supported by the target resource. For example, an API may not allow calling DELETE to remove a resource.
    '406': 'Not Acceptable',
    // This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content that conforms to the criteria given by the user agent.
    '407': 'Proxy Authentication Required',
    // This is similar to 401 Unauthorized but authentication is needed to be done by a proxy.
    '408': 'Request Timeout',
    // This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.
    '409': 'Conflict',
    // This response is sent when a request conflicts with the current state of the server.
    '410': 'Gone',
    // This response is sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
    '411': 'Length Required',
    // Server rejected the request because the Content-Length header field is not defined and the server requires it.
    '412': 'Precondition Failed',
    // The client has indicated preconditions in its headers which the server does not meet.
    '413': 'Payload Too Large',
    // Request entity is larger than limits defined by server. The server might close the connection or return an Retry-After header field.
    '414': 'URI Too Long',
    // The URI requested by the client is longer than the server is willing to interpret.
    '415': 'Unsupported Media Type',
    // The media format of the requested data is not supported by the server, so the server is rejecting the request.
    '416': 'Range Not Satisfiable',
    // The range specified by the Range header field in the request cannot be fulfilled. It's possible that the range is outside the size of the target URI's data.
    '417': 'Expectation Failed',
    // This response code means the expectation indicated by the Expect request header field cannot be met by the server.
    '418': "I'm a teapot",
    // The server refuses the attempt to brew coffee with a teapot.
    '421': 'Misdirected Request',
    // The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.
    '422': 'Unprocessable Entity (WebDAV)',
    // The request was well-formed but was unable to be followed due to semantic errors.
    '423': 'Locked (WebDAV)',
    // The resource that is being accessed is locked.
    '424': 'Failed Dependency (WebDAV)',
    // The request failed due to failure of a previous request.
    '425': 'Too Early Experimental',
    // Indicates that the server is unwilling to risk processing a request that might be replayed.
    '426': 'Upgrade Required',
    // The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol(s).
    '428': 'Precondition Required',
    // The origin server requires the request to be conditional. This response is intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
    '429': 'Too Many Requests',
    // The user has sent too many requests in a given amount of time ("rate limiting").
    '431': 'Request Header Fields Too Large',
    // The server is unwilling to process the request because its header fields are too large. The request may be resubmitted after reducing the size of the request header fields.
    '451': 'Unavailable For Legal Reasons',
    // The user agent requested a resource that cannot legally be provided, such as a web page censored by a government.
    // Server error responses
    '500': 'Internal Server Error',
    // The server has encountered a situation it does not know how to handle.
    '501': 'Not Implemented',
    // The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
    '502': 'Bad Gateway',
    // This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
    '503': 'Service Unavailable',
    // The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This response should be used for temporary conditions and the Retry-After HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.
    '504': 'Gateway Timeout',
    // This error response is given when the server is acting as a gateway and cannot get a response in time.
    '505': 'HTTP Version Not Supported',
    // The HTTP version used in the request is not supported by the server.
    '506': 'Variant Also Negotiates',
    // The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
    '507': 'Insufficient Storage (WebDAV)',
    // The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.
    '508': 'Loop Detected (WebDAV)',
    // The server detected an infinite loop while processing the request.
    '510': 'Not Extended',
    // Further extensions to the request are required for the server to fulfill it.
    '511': 'Network Authentication Required',
    // Indicates that the client needs to authenticate to gain network access.
};

const inputUserNameField = document.getElementById('githubUserName');
const myName = document.getElementById('name');
const myAvatar = document.getElementById('photo');
const myLocations = document.getElementById('location');
const repositoriesList = document.getElementById('repositories');
const myLanguages = document.getElementById('languages');
const loading = document.querySelector('.js-loading');

const GITHUB_API_URL = 'https://api.github.com';

let userName = 'AlexTereschenko';

// methods
function toggleLoadingScreen(show) {
    show ? loading.classList.remove('hide') : loading.classList.add('hide');
};

async function getInfo() {
    toggleLoadingScreen(true);

    await getUserInfo().then(getRepositoriesInfo())
    
    toggleLoadingScreen(false);
}

async function getUserInfo() {
    try {
        const response = await fetch(`${GITHUB_API_URL}/users/${userName}`)
        const userInfo = await response.json(); 

        if (!response.ok) {
            throw response.status;
        };

        myName.innerHTML = userName;
        myAvatar.src = userInfo.avatar_url ? userInfo.avatar_url : 'img/userDefault.png';
        myLocations.innerHTML = userInfo.location ? userInfo.location : 'not declared';
    } 
    catch (status) {
        myName.innerHTML = `${status} ${ERRORS_DESCRIPTIONS[status]}`;
        myAvatar.src = 'img/userDefault.png';
        myLanguages.innerHTML = 'not declared';
        myLocations.innerHTML = 'not declared';
        repositoriesList.innerHTML = '';
        alert('Sorry, the specified user does not exist');
    };
};

async function getRepositoriesInfo() {
    const response = await fetch(`${GITHUB_API_URL}/users/${userName}/repos`)
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
};

async function getLastCommitDate(repo, div) {
    toggleLoadingScreen(true);

    const response = await fetch(`${GITHUB_API_URL}/repos/${userName}/${repo}/commits`)
    const commitDates = await response.json();
    const [date, time] = (commitDates[0].commit.author.date).slice(0, -1).split('T')

    div.innerHTML = `Last committed at ${time} / ${date}`;

    toggleLoadingScreen(false);
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

    // Я хотів реалізувати оновлення даних в реальному часі, щоб можна було побачити свіжі коміти,
    // які додали під час перебуванні на нашій сторінці, але щоб не робити запит на кожен клік
    // бо можна хоч 10 разів за сек нажати на кнопку туди сюди і впертися в 403 помилку, 
    // я зробив додавання часового маркеру і перевірку при кліку чи прошла задана затримка чи ні,
    // якщо пройшла, то можна робити наступний запит

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
    const inputUnspaced = inputUserNameField.value.trim();
    userName = inputUserNameField.value ? inputUnspaced : 'AlexTereschenko';
})

formElem.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    getInfo();
})

document.addEventListener('DOMContentLoaded', getInfo);