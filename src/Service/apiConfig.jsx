const API_BASEURL = "http://127.0.0.1:8000/api";

const API_ENDPOINTS = {
    // text
    texts: `${API_BASEURL}/text`,

    // images
    images: `${API_BASEURL}/images`,
    uploadImage: `${API_BASEURL}/images/upload`,
    deleteImage: `${API_BASEURL}/images`,

    // button
    buttons: `${API_BASEURL}/button`,

    // addon
    addons: `${API_BASEURL}/addon`
};

export {API_BASEURL, API_ENDPOINTS};