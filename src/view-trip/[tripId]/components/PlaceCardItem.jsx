import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImages } from '@/service/GlobalApis'; // Adjust the import path as needed

const imageCache = {}; // Simple in-memory cache

function PlaceCardItem({ place }) {
  const [placeImage, setPlaceImage] = useState("/placeholder.jpeg"); // Default to placeholder
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPlaceImage = async () => {
      if (place?.name) {
        setLoading(true); // Set loading to true when fetching starts

        // Check if the image is cached
        if (imageCache[place.name]) {
          setPlaceImage(imageCache[place.name]);
          setLoading(false);
          return; // Skip the fetch if we have it in cache
        }

        try {
          const fetchedImages = await fetchImages(place.name);
          // Log the fetched images for debugging
          console.log(`Fetched images for ${place.name}:`, fetchedImages);
          const imageUrl = fetchedImages[0]?.src?.original || "/placeholder.jpeg";
          imageCache[place.name] = imageUrl; // Cache the fetched image
          setPlaceImage(imageUrl); // Set the first image or fallback
        } catch (error) {
          console.error(`Error fetching images for ${place.name}:`, error);
          setPlaceImage("/placeholder.jpeg"); // Fallback to placeholder on error
        } finally {
          setLoading(false); // Set loading to false when done
        }
      }
    };

    fetchPlaceImage();
  }, [place,placeImage]);

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.name},${place?.address}`} 
          target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        {loading ? (
          <div className='w-[130px] h-[130px] bg-gray-300 animate-pulse rounded-xl' /> // Placeholder during loading
        ) : (
          <img 
            src={placeImage} 
            alt={place?.name} 
            loading="lazy" // Lazy loading
            className='w-[130px] h-[130px] object-cover rounded-xl' // Ensure equal size and cover
          />
        )}
        <div>
          <h2 className='font-bold text-lg'>{place.name}</h2>
          <p className='text-sm text-[#dbdada]'>{place.details}</p>
          <h2 className='mt-2'>🎟️ {place.ticket_pricing}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
