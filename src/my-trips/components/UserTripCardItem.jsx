import React, { useEffect, useState } from 'react';
import { fetchImages } from '@/service/GlobalApis'; // Adjust the import path as needed
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg'); // Default to placeholder image
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTripImage = async () => {
      setLoading(true); // Set loading state to true before fetching image

      if (trip?.userSelection?.location.label) {
        try {
          const fetchedImages = await fetchImages(trip.userSelection.location.label);
          // Log the fetched images for debugging purposes
          console.log(`Fetched images for ${trip.userSelection.location.label}:`, fetchedImages);
          setImageUrl(fetchedImages[0]?.src?.original || '/placeholder.jpg'); // Use first image or fallback to placeholder
        } catch (error) {
          console.error(`Error fetching image for ${trip.userSelection.location.label}:`, error);
          setImageUrl('/placeholder.jpg'); // Use placeholder if fetching fails
        }
      }

      setLoading(false); // Set loading state to false after fetching
    };

    fetchTripImage(); // Call the async function
  }, [trip]);

  return (
    <Link to={"/view-trip/"+ trip?.id}>
    <div className=" hover:scale-105 transition-all  flex flex-col items-center">
      {loading ? (
        <div>Loading...</div> // Optional loading indicator
      ) : (
        <img
          src={imageUrl}
          className="w-[320px] h-[250px] object-cover rounded-xl" // Set fixed width and height for consistency
          alt={trip?.userSelection?.location.label || 'Trip Image'}
        />
      )}
      <div className="mt-2 ">
        <h2 className="text-[#fff] font-bold text-lg">{trip?.userSelection?.location.label}</h2>
        <h2 className="text-sm text-[#cecece]">
          {trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
        </h2>
      </div>
    </div></Link>
  );
}

export default UserTripCardItem;
