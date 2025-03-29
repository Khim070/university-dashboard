import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../Service/apiConfig';
import ImageHeader from './imageHeader';

const ImageBody = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [selectedImageName, setSelectedImageName] = useState("");

    // Fetch Images from API
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.images);
                if (response.data && response.data.data) {
                    setImages(response.data.data);
                    setFilteredImages(response.data.data);
                } else {
                    console.error("API did not return expected data structure:", response.data);
                    setImages([]);
                    setFilteredImages([]);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
                setImages([]);
                setFilteredImages([]);
            }
        };

        fetchImages();
    }, []);

    // Search functionality
    const handleSearch = (query) => {
        if (!query) {
            setFilteredImages(images);
        } else {
            const filtered = images.filter(image =>
                image.image.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredImages(filtered);
        }
    };

    // Upload Images
    const handleImageUpload = async (event) => {
        const files = event.target.files;
        const formData = new FormData();

        for (let file of files) {
            formData.append("image[]", file);
        }

        try {
            const response = await axios.post(API_ENDPOINTS.uploadImage, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data && response.data.data) {
                const updatedImages = await axios.get(API_ENDPOINTS.images);
                if (updatedImages.data && updatedImages.data.data) {
                    setImages(updatedImages.data.data);
                    setFilteredImages(updatedImages.data.data);
                }
            } else {
                console.error("Upload failed:", response.data);
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    const handleDeleteImage = async (imageId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`${API_ENDPOINTS.deleteImage}/${imageId}`);
            if (response.status === 200) {
                setImages(images.filter(image => image.imageid !== imageId));
                setFilteredImages(filteredImages.filter(image => image.imageid !== imageId)); // Update filtered images
            } else {
                console.error("Failed to delete image:", response.data);
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <section className="px-8">
            <ImageHeader onSearch={handleSearch} />

            {/* Upload Button */}
            <div className="mb-6">
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
                    <i className="ti ti-photo-up text-xl text-white mr-2"></i>
                    Upload Images
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </label>
                <span className='ml-2 text-gray-600'>{selectedImageName}</span>
            </div>

            {/* Image Library Grid */}
            <div className="border-2 rounded-lg overflow-y-auto h-screen p-4 mb-6">
                {filteredImages.length === 0 ? (
                    <p className="text-gray-500 text-center">No images uploaded.</p>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredImages.map((image) => (
                            <div key={image.imageid} className="relative border rounded-lg overflow-hidden group">
                                <img
                                    src={image.image_url}
                                    alt={image.image}
                                    className="w-full h-auto object-cover cursor-pointer"
                                    onClick={() => setSelectedImageName(image.image)}
                                />
                                <button
                                    className="h-8 w-8 absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-100 hover:opacity-100 transition"
                                    onClick={() => handleDeleteImage(image.imageid)}>
                                    <i className="ti ti-x text-xl text-white"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ImageBody;