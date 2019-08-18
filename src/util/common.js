import * as config from '../config/config.json';
import * as toastr from 'toastr';
import '../toastr.css';

console.log("config :", config);
const metaData = {
    'signin': {
        Links: [
            { title: "Create New Account", param: "register" },
            { title: "Forgot Password?", param: "forgot" },
        ],
    },
    'forgot': {
        Links: [
            { title: "Sign in", param: "signin" },
            { title: "Create New Account", param: "register" },
        ],
    },
    'register': {
        Links: [
            { title: "Sign in", param: "signin" },
            { title: "Forgot Password?", param: "forgot" },
        ],
    }
}
export function authMetaData(param) {
    return metaData[param];
}

export function getLocalStorage(key) {
    return localStorage.getItem(key);
}

export function setLocalStorage(key, value) {
    return localStorage.setItem(key, value);
}

export const getKey = (key) => {
    key = key.trim();
    return config[key];
}

export function toastCreate(toastType, message) {
    toastr.options = {
        positionClass: 'toast-top-right',
        hideDuration: 300,
        timeOut: 2000
    }
    toastr.clear()
    setTimeout(() => toastr[toastType](message), 300);
}

export function toastSuccess(message) {
    toastCreate('success', message)
}
export function toastError(message) {
    toastCreate('error', message)
}