import React, { useState } from 'react';

const ImageBody = () => {
    const [images, setImages] = useState([]);
    const [selectedImageName, setSelectedImageName] = useState("");

    // Handle Image Upload
    const handleImageUpload = (event) => {
        const files = event.target.files;
        const newImages = [...images];

        for (let file of files) {
            const imageUrl = URL.createObjectURL(file);
            newImages.push({ url: imageUrl, name: file.name });
        }

        setImages(newImages);
    };

    return (
        <section className="px-8">
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
                {images.length === 0 ? (
                    <p className="text-gray-500 text-center">No images uploaded.</p>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative border rounded-lg overflow-hidden group">
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-full h-auto object-cover cursor-pointer"
                                    onClick={() => setSelectedImageName(image.name)}
                                />
                                <button
                                    className="h-8 w-8 absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-100 hover:opacity-100 transition"
                                    onClick={() => setImages(images.filter((_, i) => i !== index))}>
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