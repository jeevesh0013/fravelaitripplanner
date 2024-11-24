import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  // Debugging: Log the itinerary to confirm the data structure
  console.log("Itinerary:", itinerary);

  // Ensure `itinerary` is an array before using `.map`
  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return <div className="text-gray-600">No places to visit available.</div>;
  }

  return (
    <div>
      <h2 className="text-[#ffffff] font-bold text-lg">Places To Visit</h2>
      <div>
        {itinerary.map((item, index) => (
          <div key={index} className="mt-5">
            <h2 className="text-[#ffffff] font-medium text-lg">
              Day: {item.day || "Unknown"}
            </h2>
            <div className="grid grid-cols-2 gap-5">
              {Array.isArray(item.plan) && item.plan.length > 0 ? (
                item.plan.map((place, idx) => (
                  <div key={idx} className="my-3">
                    <h2 className="font-medium text-sm text-[#7aeafb]">
                      {place.time || "Time not specified"}
                    </h2>
                    <PlaceCardItem place={place} />
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
