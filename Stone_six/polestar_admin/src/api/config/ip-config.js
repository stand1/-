'use strict'

let apiURL = '';
let projectKey = 'polestar';
localStorage.setItem('projectKey', projectKey);
let localKey = projectKey + '_pc_';

let apiURLDev = "";
apiURLDev = "http://test-redt.sixeco.com/";

let loc = ''
if (typeof window != "undefined") {
    loc = window.location.hostname || window.location.protocol
}
if (process.env.NODE_ENV === 'development' || loc == "file:" || loc == "localhost") {
    apiURL = apiURLDev;
} else if (/test-redt/.test(window.location.pathname)) {
    //测试
     apiURL = 'http://test-redt.sixeco.com/'
    //正式
     // apiURL = 'http://redt.sixeco.com/'
} else {
    apiURL = `${window.location.protocol}//${window.location.hostname}`
}

module.exports = {
    apiURL: apiURL,
    localKey: localKey,
    projectKey: projectKey
}
