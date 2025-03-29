import React, { useState, useEffect } from "react";
import MediaLibraryModal from "../MediaLibraryModal";
import { API_IMAGE, API_ENDPOINTS } from "../../Service/apiConfig";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Slider = () => {
  const [rotatedStates, setRotatedStates] = useState({});
  const [isMediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const [currentSliderId, setCurrentSliderId] = useState(null);
  const [currentField, setCurrentField] = useState(null);

  const [sliders, setSliders] = useState([
    // {
    //   id: "1",
    //   title: "Service 1",
    //   subtitle: "",
    //   linkTitle: "",
    //   urlLink: "",
    //   logo: "",
    //   image: "",
    //   urlIcon: "",
    // },
  ]);

  const handleAddSlider = () => {
    const newSlider = {
      id: `${Date.now()}`,
      title: `Service ${sliders.length + 1}`,
      subtitle: "",
      linkTitle: "",
      urlLink: "",
      logo: "",
      image: "",
      urlIcon: "",
    };

    setSliders([...sliders, newSlider]); // Append new slider to the list
  };

  const toggleRotation = (id) => {
    setRotatedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newSliders = Array.from(sliders);
    const [reorderedSlider] = newSliders.splice(result.source.index, 1);
    newSliders.splice(result.destination.index, 0, reorderedSlider);

    setSliders(newSliders);
  };

  const openMediaLibrary = (sliderId, field) => {
    setCurrentSliderId(sliderId);
    setCurrentField(field);
    setMediaLibraryOpen(true);
  };

  const handleImageSelect = (imageUrl, sliderId, field) => {
    setSliders((prevSliders) =>
        prevSliders.map((slider) =>
            slider.id === sliderId
                ? { ...slider, [field]: imageUrl ? `${API_IMAGE}/${imageUrl}` : "" }
                : slider
        )
    );

    setMediaLibraryOpen(false);
  };

  const handleToggleDisplay = (id) => {
    setSliders((prevSliders) =>
      prevSliders.map((slider) =>
        slider.ssid === id
          ? { ...slider, display: slider.display === 1 ? 0 : 1 }
          : slider
      )
    );
  };

  useEffect(() => {
    const fetchSlideshows = async () => {
      try {
        // Fetch slideshow data
        const slideshowResponse = await axios.get(`${API_ENDPOINTS.getSlideShow}`);
        // Fetch image data
        const imageResponse = await axios.get(`${API_ENDPOINTS.images}`);
        // Fetch text data
        const textResponse = await axios.get(`${API_ENDPOINTS.getText}`);
        // Fetch button data
        const buttonResponse = await axios.get(`${API_ENDPOINTS.getButton}`);

        if (
          slideshowResponse.status === 200 &&
          textResponse.status === 200 &&
          imageResponse.status === 200 &&
          buttonResponse.status === 200
        ) {
          let slideshows = slideshowResponse.data.data;
          const texts = textResponse.data.data;
          const images = imageResponse.data.data;
          const buttons = buttonResponse.data.data;

          slideshows = slideshows
            .filter((slide) => slide.active === 1) // Show only active slides
            .sort((a, b) => a.ssorder - b.ssorder); // Sort by ssorder

          const slideshowsWithDetails = slideshows.map((slide) => {
            const matchedText = texts.find((text) => text.textid === slide.text_id);
            const matchedImage = images.find((image) => image.imageid === slide.image_id);
            const matchedButton = buttons.find((button) => button.buttonid === slide.button_id);

            let buttonImage = null;
            if (matchedButton && matchedButton.image_id) {
              buttonImage = images.find((img) => img.imageid === matchedButton.image_id);
            }

            return {
              ...slide,
              title: matchedText ? matchedText.title : `Slide ${slide.ssid}`,
              subTitle: matchedText ? matchedText.subTitle : null,
              image: matchedImage ? `${API_IMAGE}/${matchedImage.image}` : null,
              buttonText: matchedButton ? matchedButton.title : null,
              buttonUrl: matchedButton ? matchedButton.url : null,
              buttonImage: buttonImage ? `${API_IMAGE}/${buttonImage.image}` : null,
            };
          });

          setSliders([...slideshowsWithDetails]); // Update state
          console.log(sliders);
        }
      } catch (error) {
        console.error("Error fetching slideshow data:", error);
      }
    };

    fetchSlideshows();
  }, []);

  return (
    <section className="px-8 py-2">
      <div className="border-2 rounded-lg overflow-x-scroll hide-scroll-bar">
        <div className="col-span-1 sm:col-span-3">
          <div>
            <ul className="mt-6 md:block cursor-pointer ">
              <details className="group [&_summary::-webkit-details-marker]:hidden ">
                <summary className="flex justify-between cursor-pointer rounded-lg px-2 py-2 text-xl font-medium w-full border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset my-2">
                  <label className="block text-2xl font-medium leading-6 text-gray-900 indent-4 ">
                    SlideShow
                  </label>
                  <span className="shrink-0 transition-transform duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                </summary>

                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="mx-4 mb-4"
                      >
                        <ul class="h-auto  overflow-y-auto border rounded-t-lg mt-1">
                          {sliders.map((slider, index) => (
                            <Draggable
                              key={slider.ssid}
                              draggableId={slider.ssid.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <li
                                  className={`below-border ${
                                    index === sliders.length - 1
                                      ? "border-none"
                                      : ""
                                  }`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <details className="group [&_summary::-webkit-details-marker]:hidden ">
                                    <summary
                                      className="flex justify-between rounded-lg px-2 py-2 pl-5 w-full "
                                      onClick={() => toggleRotation(slider.ssid)}
                                    >
                                      <div className="flex ">
                                        <svg
                                          class=" size-5 my-auto"
                                          viewBox="0 0 320 512"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"></path>
                                        </svg>
                                        <span className="ml-2 text-lg">
                                          Slideshow {slider.ssid}
                                        </span>
                                      </div>
                                      <span className="shrink-0 transition-transform duration-500 group-open:-rotate-0 flex gap-2">
                                        <div className="block">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6 cursor-pointer"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                          </svg>
                                        </div>
                                        <span
                                          className={`shrink-0 transition-transform duration-300 ${
                                            rotatedStates[slider.ssid]
                                              ? "rotate-180"
                                              : ""
                                          }`}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="size-6"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                            />
                                          </svg>
                                        </span>
                                      </span>
                                    </summary>

                                    <div className="flex flex-row gap-4 px-4 py-2">
                                      {/* Title Field */}
                                      <div className="flex-1">
                                        <label className="block text-xl font-medium leading-6 text-white-900">
                                          Title
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="text"
                                            className="block w-full border-0 rounded-md py-2 pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-2xl sm:leading-6"
                                            value={slider.title}
                                          />
                                        </div>
                                      </div>

                                      {/* Display Toggle */}
                                      <div className="flex-non">
                                        <label className="block text-xl font-medium leading-6 text-white-900">
                                          Display
                                        </label>
                                        <div className="mt-2">
                                          <label class="toggle-switch mt-2">
                                            <input
                                                type="checkbox"
                                                checked={slider.display === 1}
                                                onChange={() => handleToggleDisplay(slider.ssid)}
                                              />
                                              <span
                                                className={`slider ${slider.display === 1 ? "bg-blue-500" : ""}`}
                                              ></span>
                                          </label>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex flex-row gap-4 px-4 py-2">
                                      <div className="flex-1">
                                        <label className="block text-xl font-medium leading-6 text-white-900">
                                          Subtitle
                                        </label>
                                        <div className="mt-2">
                                          <textarea
                                            value={slider.subTitle}
                                            className="h-32 block w-full rounded-md border-0 py-2 pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"></textarea>
                                        </div>
                                      </div>

                                      <div className="flex-1">
                                        <div className="">
                                          <label className="block text-xl font-medium leading-6 text-white-900">
                                            Link title
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              type="text"
                                              value={slider.buttonText}
                                              className="block w-full rounded-md border-0 py-2 pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
                                            />
                                          </div>
                                        </div>

                                        <div className="mt-2">
                                          <label className="block text-xl font-medium leading-6 text-white-900">
                                            Url link
                                          </label>
                                          <div className="mt-2">
                                            <input
                                              type="text"
                                              value={slider.buttonUrl}
                                              className="block w-full rounded-md border-0 py-2 pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex flex-row gap-4 px-4 py-2">
                                      <div className="flex-1">
                                        <label className="block text-xl font-medium leading-6 text-white-900">
                                          Image
                                        </label>
                                        <div class="flex items-center justify-center w-full mt-2 border-1">
                                          <label
                                            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                          >
                                            {slider.image ? (
                                              <div>
                                                <img src={slider.image} alt="Selected" className="h-40 w-40 object-contain" />
                                                <div className="flex gap-3 mt-2 justify-center">
                                                  <svg
                                                    onClick={() => openMediaLibrary(slider.ssid, "image")}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-8 hover:text-red-700"
                                                  >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                                  </svg>
                                                  <svg
                                                    onClick={() => handleImageSelect("", slider.ssid, "image")}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-8 hover:text-red-700"
                                                  >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                  </svg>
                                                </div>
                                              </div>
                                            ) : (
                                              <div
                                                onClick={() => openMediaLibrary(slider.ssid, "image")}
                                                className="flex flex-col items-center justify-center pt-5 pb-6 "
                                              >
                                                <svg
                                                  className="w-8 h-8 mb-4 text-gray-500"
                                                  aria-hidden="true"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 20 16"
                                                >
                                                  <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                  />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500">
                                                  <span className="font-semibold">Click to upload image</span>
                                                </p>
                                              </div>
                                            )}
                                          </label>
                                        </div>
                                      </div>
                                      {isMediaLibraryOpen && (
                                        <MediaLibraryModal
                                          onSelect={(imageUrl) => handleImageSelect(imageUrl, currentSliderId, currentField)}
                                          onClose={() => setMediaLibraryOpen(false)}
                                        />
                                      )}

                                      <div className="flex-1">
                                        <label className="block text-xl font-medium leading-6 text-white-900">
                                          Icon
                                        </label>
                                        <div class="flex items-center justify-center w-full mt-2 border-1">
                                          <label
                                            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                          >
                                            {slider.buttonImage ? (
                                              <div>
                                                <img src={slider.buttonImage} alt="Selected" className="h-40 w-40 object-contain" />
                                                <div className="flex gap-3 mt-2 justify-center">
                                                  <svg
                                                    onClick={() => openMediaLibrary(slider.ssid, "icon")}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-8 hover:text-red-700"
                                                  >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                                  </svg>
                                                  <svg
                                                    onClick={() => handleImageSelect("", slider.ssid, "icon")}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-8 hover:text-red-700"
                                                  >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                  </svg>
                                                </div>
                                              </div>
                                            ) : (
                                              <div
                                                onClick={() => openMediaLibrary(slider.ssid, "icon")}
                                                className="flex flex-col items-center justify-center pt-5 pb-6 "
                                              >
                                                <svg
                                                  className="w-8 h-8 mb-4 text-gray-500"
                                                  aria-hidden="true"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 20 16"
                                                >
                                                  <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                  />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500">
                                                  <span className="font-semibold">Click to upload image</span>
                                                </p>
                                              </div>
                                            )}
                                          </label>
                                        </div>
                                      </div>
                                      {isMediaLibraryOpen && (
                                        <MediaLibraryModal
                                          onSelect={(imageUrl) => handleImageSelect(imageUrl, currentSliderId, currentField)}
                                          onClose={() => setMediaLibraryOpen(false)}
                                        />
                                      )}
                                    </div>
                                  </details>
                                </li>
                              )}
                            </Draggable>
                          ))}
                        </ul>
                        <a
                          className="flex items-center p-3 text-sm font-medium text-blue-600 border-t border rounded-b-lg bg-gray-50  hover:bg-gray-100  hover:underline"
                          onClick={handleAddSlider}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6 mr-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          Add new item
                        </a>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </details>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
