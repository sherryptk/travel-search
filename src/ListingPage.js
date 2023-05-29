import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar";
import he from "he";
import Modal from "react-modal";

function ListingPage() {
  Modal.setAppElement("#root");

  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);

  const openModal = (index) => {
    setClickedImageIndex(index);
    setModalIsOpen(true);
  };

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/listings/${id}`
      );
      const decodedDescription = he.decode(response.data.description);
      setListing({ ...response.data, description: decodedDescription });
    } catch (error) {
      console.error("Error fetching listing:", error);
    }
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  const { title, images, description, amenities, location, host } = listing;

  return (
    <div>
      <Navbar />
      <div className="p-12">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h1 className="font-bold text-2xl py-4">{title}</h1>
            <div className="grid grid-cols-6 gap-4">
              {images &&
                images.data.length > 0 && ( // Check if images exist
                  <img
                    src={images.data[0].url}
                    alt=""
                    className="w-full h-97 object-cover col-span-3"
                  />
                )}
              {images &&
                images.data.length > 1 && ( // Check if there are more images
                  <>
                    <div className="col-span-3 grid grid-cols-2 gap-4">
                      {images.data.slice(1, 5).map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt=""
                          className="w-full h-48 object-cover"
                          onClick={() => openModal(index + 1)}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setModalIsOpen(true)}
                      className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mt-2"
                    >
                      More Photos
                    </button>
                  </>
                )}
            </div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Image Modal"
              className="modal bg-white p-4 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              overlayClassName="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
              <div className="modal-content">
                {images &&
                  clickedImageIndex !== null &&
                  images.data.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt=""
                      className={`w-full h-96 object-cover ${
                        index === clickedImageIndex ? "block" : "hidden"
                      }`}
                    />
                  ))}
              </div>
            </Modal>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8">
                <div>
                  <div>
                    <h3 className="font-semibold text-xl py-4">
                      About this place
                    </h3>
                    <p style={{ whiteSpace: "pre-line" }}>{description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl py-4">Amenities</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <ul className="list-disc">
                        {amenities.data.map((amenity) => (
                          <li key={amenity.id}>{amenity.title}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl py-4">Location</h3>
                    <p>{location.address}</p>
                    <p>{location.city}</p>
                    <p>{location.country.code}</p>
                    <p>{location.zip}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl py-3">
                      Meet your host
                    </h3>
                    <img src={host.avatar.url} alt="Host" />
                    <p className="text-lg text-gray-600 italic">{host.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="sticky top-0 h-full bg-white rounded-lg mt-4">
                  <div className="flex flex-col py-4 pr-4 border border-gray-300">
                    <div className="px-4 py-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Make your reservation
                      </h3>
                      <div className="mb-4">
                        <label htmlFor="check-in">Check-in:</label>
                        <input type="date" id="check-in" className="ml-2" />
                      </div>
                      <div>
                        <label htmlFor="check-out">Check-out:</label>
                        <input type="date" id="check-out" className="ml-1" />
                      </div>
                    </div>
                    <div className="flex justify-center mt-auto">
                      <button className="bg-teal-500 text-white py-2 px-4 rounded-lg">
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
