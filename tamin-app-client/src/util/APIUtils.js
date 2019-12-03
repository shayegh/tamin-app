import {ACCESS_TOKEN, API_BASE_URL, POLL_LIST_SIZE} from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

//
//Header API
//
export function getAllHeaders(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/headers?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getHeader(headerId) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}`,
        method: 'GET'
    })

}

export function createHeader(headerData) {
    return request({
        url: `${API_BASE_URL}/headers`,
        method: 'POST',
        body: JSON.stringify(headerData)
    })
}

export function updateHeader(headerData,headerId) {
    return request({
        url:`${API_BASE_URL}/headers/${headerId}`,
        method: 'PUT',
        body:JSON.stringify(headerData)
    })
}

export function deleteHeader(headerId) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}`,
        method: 'DELETE',
        body: JSON.stringify(headerId)
    });
}
///
///Detail API
///
export function createDetail(headerId,detailData) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}/details`,
        method: 'POST',
        body: JSON.stringify(detailData)
    })
}
export function addShobComment(headerId,detailId,shobComment) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}/details/${detailId}`,
        method: 'PUT',
        body: JSON.stringify(shobComment)
    })
}

export function getAllDetailsByHeaderId(headerId) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}/details`,
        method: 'GET'
    })
}

export function deleteDetail(headerId,detailId) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}/details/${detailId}`,
        method: 'DELETE',
        body: JSON.stringify(headerId)
    });
}

///
///
export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls",
        method: 'POST',
        body: JSON.stringify(pollData)
    });
}

export function castVote(voteData) {
    return request({
        url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

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

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: 'GET'
    });
}