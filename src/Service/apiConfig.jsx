const API_BASEURL = "http://127.0.0.1:8000/api";
const API_IMAGE = "http://127.0.0.1:8000/storage/uploads";

const API_ENDPOINTS = {
    // text
    getText: `${API_BASEURL}/text`,

    // slideshows
    getSlideShow: `${API_BASEURL}/slideshow`,
    updateSlideShow: `${API_BASEURL}/slideshow`,

    // images
    images: `${API_BASEURL}/images`,
    uploadImage: `${API_BASEURL}/images/upload`,
    deleteImage: `${API_BASEURL}/images`,

    // button
    getButton: `${API_BASEURL}/button`,

    // addon
    addons: `${API_BASEURL}/addon`
};

export {API_BASEURL, API_ENDPOINTS, API_IMAGE};