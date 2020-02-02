//
//Header API
//
import {API_BASE_URL, POLL_LIST_SIZE} from "../../constants";
import {request} from "./Common";

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

export const getHeaderStatus = (headerId) => {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}`,
        method: 'GET'
    })
};

export function createHeader(headerData) {
    return request({
        url: `${API_BASE_URL}/headers`,
        method: 'POST',
        body: JSON.stringify(headerData)
    })
}

export function updateHeader(headerData, headerId) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}`,
        method: 'PUT',
        body: JSON.stringify(headerData)
    })
}

export function deleteHeader(headerId) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}`,
        method: 'DELETE',
        body: JSON.stringify(headerId)
    });
}

export function confirmHeader(headerData, headerId) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}/cr`,
        method: 'PUT',
        body: JSON.stringify(headerData)
    })
}

///
///Detail API
///
export function createDetail(headerId, detailData) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}/details`,
        method: 'POST',
        body: JSON.stringify(detailData)
    })
}

export function addShobComment(headerId, detailId, shobComment) {
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

export function deleteDetail(headerId, detailId) {
    return request({
        url: `${API_BASE_URL}/headers/${headerId}/details/${detailId}`,
        method: 'DELETE',
        body: JSON.stringify(headerId)
    });
}

///
///