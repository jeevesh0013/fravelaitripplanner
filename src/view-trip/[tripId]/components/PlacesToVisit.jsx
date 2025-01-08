import React from "react";
import PlaceCardItem from "./PlaceCardItem"; // Ensure this component correctly displays the place details

function PlacesToVisit({ trip }) {
  // Extracting the itinerary from the trip data
  const itinerary = trip?.tripData?.itinerary;

  // Debugging: Log the itinerary to confirm the structure
  console.log("Trip Data:", trip);
  console.log("Itinerary:", itinerary);

  // Ensure `itinerary.days` is an array before using `.map`
  const itineraryDays = itinerary?.days;
  if (!Array.isArray(itineraryDays) || itineraryDays.length === 0) {
    return <div className="text-gray-600">No places to visit available.</div>;
  }

  return (
    <div>
      <h2 className="text-[#ffffff] font-bold text-lg">Places To Visit</h2>
      <div>
        {itineraryDays.map((item, index) => (
          <div key={index} className="mt-5">
            <h2 className="text-[#ffffff] font-medium text-lg">
              Day: {item.day || "Unknown"}
            </h2>
            <div className="grid grid-cols-2 gap-5">
              {Array.isArray(item.plan) && item.plan.length > 0 ? (
                item.plan.map((place, idx) => (
                  <div key={idx} className="my-3">
                    <h3 className="font-medium text-sm text-[#7aeafb]">
                      {place.time || "Time not specified"}
                    </h3>
                    {/* Reusing PlaceCardItem to render place details */}
                    <PlaceCardItem place={place} />
                    {/* <div className="text-[#ffffff]">
                      {place.name && <div>{place.name}</div>}
                      {place.address && <div>{place.address}</div>}
                      {place.details && <div>{place.details}</div>}
                    </div> */}
                  </div>
                ))
              ) : (
                <div className="text-[#ffffff]">
                  No plans available for this day.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
