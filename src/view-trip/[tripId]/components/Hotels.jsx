import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImages } from '@/service/GlobalApis'; // Adjust the import path as needed

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({}); // To store fetched images for each hotel
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchHotelImages = async () => {
      setLoading(true); // Start loading
      const images = {};
      const hotels = trip?.tripData?.hotels || [];

      // Create an array of fetch promises
      const fetchPromises = hotels.map(async (hotel) => {
        if (hotel?.name) {
          try {
            const fetchedImages = await fetchImages(hotel.name);
            // Log the fetched images for debugging
            console.log(`Fetched images for ${hotel.name}:`, fetchedImages);
            images[hotel.name] = fetchedImages[0]?.src?.original || "/placeholder.jpeg"; // Store the first image or use placeholder
          } catch (error) {
            console.error(`Error fetching images for ${hotel.name}:`, error);
            images[hotel.name] = "/placeholder.jpeg"; // Fallback to placeholder on error
          }
        }
      });

      // Wait for all promises to resolve
      await Promise.all(fetchPromises);

      setHotelImages(images);
      setLoading(false); // Finished loading
    };

    fetchHotelImages();
  }, [trip]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div>
      <h2 className='text-[#fff] font-bold text-xl mt-5'>Hotel Recommendations</h2>
      <div className='py-6 grid grid-cols-2 md:grid-cols-3 xl:grid-col-4 gap-5'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`}
            target='_blank'
            key={index}
          >
            <div className='hover:scale-105 transition-all cursor-pointer'>
              <img
                src={hotelImages[hotel.name] || "/placeholder.jpeg"} // Use the fetched image or placeholder
                className='rounded-xl w-full h-48 object-cover' // Set a fixed height to make images equal size
                alt={hotel?.name}
              />
              <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium text-[#f4f4f4]'>{hotel.name}</h2>
                <h2 className='text-xs text-gray-100'>📍 {hotel.address}</h2>
                <h2 className='text-sm text-white'>💶 {hotel.price}</h2>
                <h2 className='text-sm text-white'>⭐ {hotel.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
