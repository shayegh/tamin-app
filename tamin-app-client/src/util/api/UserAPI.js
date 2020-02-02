import {ACCESS_TOKEN, API_BASE_URL, POLL_LIST_SIZE} from "../../constants";
import {request} from "./Common";

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export const changePass = (changePassRequest) => {
    return request({
        url: API_BASE_URL + "/user/changePass",
        method: 'POST',
        body: JSON.stringify(changePassRequest)
    })
};

export const updateUser = (updateUserRequest) => {
    return request({
        url: API_BASE_URL + "/user",
        method: 'PUT',
        body: JSON.stringify(updateUserRequest)
    })
};

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export const getUsersList = ( page, size)=>{
    page = page || 0;
    size = size || POLL_LIST_SIZE;
    return request({
        url: API_BASE_URL + "/users/?page=" + page + "&size=" + size,
        method: 'GET'
    });
};