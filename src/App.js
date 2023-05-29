import React, { useState, useEffect } from "react";
import "./styles/tailwind.css";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "./NavBar";
import axios from "axios";
import { Link } from "react-router-dom";

function IndexPage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/listings");
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const handleSearch = async (location) => {
    try {
      const response = await axios.get("http://localhost:3000/api/listings", {
        params: { location: location },
      });
      const searchResults = response.data;
      const uniqueListings = filterDuplicateListings(searchResults);
      setListings(uniqueListings);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const filterDuplicateListings = (listings) => {
    const idSet = new Set();
    return listings.filter((listing) => {
      if (idSet.has(listing.id)) {
        return false;
      } else {
        idSet.add(listing.id);
        return true;
      }
    });
  };

  return (
    <div>
      <NavBar handleSearch={handleSearch} />
      <div className="p-8">
        <main className="listings-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {listings.map((listing, index) => (
            <Link
              to={`/listing/${listing.info.id}`}
              key={`${listing.info.id}-${index}`}
            >
              <div className="listing bg-gray-100 p-4 rounded shadow-md cursor-pointer transition-transform hover:scale-105">
                <img
                  className="w-full h-48 object-cover rounded-xl"
                  src={listing.info.mainImage.url}
                  alt={listing.location}
                />
                <h3 className="font-bold mt-2">{listing.info.location.city}</h3>
                <p className="text-sm text-gray-500">
                  Nightly Rate: ${listing.info.price}
                </p>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}

export default IndexPage;
