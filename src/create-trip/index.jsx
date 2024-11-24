import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelsList, AI_PROMPT } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // Import Clerk's useUser hook
import Footer from "@/view-trip/[tripId]/components/Footer";

function CreateTrip() {
  const navigate = useNavigate();
  const { user } = useUser(); // Get the authenticated user from Clerk
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState("");
  const inputRef = useRef(null);

  // Store user data in local storage when the component mounts
  useEffect(() => {
    if (user) {
      const userData = {
        email: user.emailAddresses[0]?.emailAddress, // Ensure you handle cases where emailAddresses might be undefined
        name: user.fullName,
      };
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [user]);

  // Function to update form data
  const handleFormInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Log formData whenever it changes
  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  // Handle form submission
  const OnGenerateTrip = async () => {
    if (
      !formData?.noOfDays ||
      formData?.noOfDays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.companion
    ) {
      toast("Please fill all the details");
      return;
    }

    // Check if location reference is available
    if (!formData.location.reference) {
      toast("Location reference is missing. Please select a valid location.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{Companion}', formData?.companion)
      .replace('{budget}', formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripData = result?.response?.text ? await result.response.text() : "No data received";
      console.log("--", tripData);
      await SaveAiTrip(tripData);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Firebase function
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      // Ensure location reference exists before saving
      if (formData.location && formData.location.reference) {
        await setDoc(doc(db, "AITrips", docId), {
          userSelection: formData,
          tripData: JSON.parse(TripData),
          userEmail: user?.email || "", // Add a default value or null check
          id: docId,
        });
        toast("Trip data saved successfully!");
      } else {
        console.error("Location reference is missing in formData");
        toast("Failed to save trip data. Location information is missing.");
      }
    } catch (error) {
      console.error("Error saving trip data:", error);
      toast("Failed to save trip data.");
    } finally {
      setLoading(false);
      navigate("/view-trip/" + docId);
    }
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(`https://api.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: import.meta.env.VITE_LOCATION_IQ_TOKENS,
          q: value,
          format: "json",
        },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 1000),
    []
  );

  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleLocationSelect = (suggestion) => {
    const { display_name: label, place_id: id, lat, lon } = suggestion;
    const reference = suggestion.reference || `${lat}-${lon}`; // Fallback to lat-lon combination as 'reference'

    if (!reference) {
      console.error("Location reference is missing in suggestion");
      toast("Failed to select location. Reference information is missing.");
      return;
    }

    const selected = {
      label,
      id,
      reference,
      latitude: lat,
      longitude: lon,
    };

    setSelectedLocation(selected);
    setQuery(label);
    setSuggestions([]);
    inputRef.current.blur();
    handleFormInputChange("location", selected);
    console.log("Selected Location Details:", selected);
  };

  const handleDaysChange = (e) => {
    const value = e.target.value;
    if (value === "" || parseInt(value, 10) > 0) {
      setNumberOfDays(value);
      handleFormInputChange("noOfDays", value);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-sans font-bold text-3xl text-[#ffffff]">
        Tell us your Travel Preferences 🍂🏝️
      </h2>
      <p className="mt-4 text-[#f5f4f4] text-lg leading-relaxed">
        Let us know about your preferences, interests, and budget, and we'll help craft a personalized trip plan.
      </p>

      <div className="mt-10 space-y-10">
        {/* Destination Field */}
        <div className="relative">
          <h2 className="text-xl my-2 font-semibold text-[#fff]">
            What is your Destination of Choice?
          </h2>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleLocationInputChange}
            placeholder="Search for your destination"
            className="border p-4 rounded-lg w-full text-gray-800 bg-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            style={{ height: "48px" }}
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="mt-2 bg-white border rounded-lg shadow-lg absolute z-10 w-full max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-4 hover:bg-blue-50 cursor-pointer text-gray-700"
                  onClick={() => handleLocationSelect(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Number of Days Field */}
        <div>
          <h2 className="text-xl my-2 font-semibold text-[#fff]">
            How many days are you planning your trip for?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            value={numberOfDays}
            min="1"
            onChange={handleDaysChange}
            className="border p-4 rounded-lg w-full text-gray-800 bg-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            style={{ height: "48px" }}
          />
        </div>
      </div>

      {/* Budget Section */}
      <div>
        <h2 className="text-xl my-2 font-semibold text-[#fff]">
          What is Your Budget?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget === item.title ? 'shadow-lg border-black' : ''}`}
              onClick={() => handleFormInputChange("budget", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="text-[#fff] font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-[#f9f5f5]">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Companion Section */}
      <div>
        <h2 className="text-xl my-2 font-semibold text-[#fff]">
          Which special person would you invite to join you on your dream getaway?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.companion === item.title ? 'shadow-lg border-black' : ''}`}
              onClick={() => handleFormInputChange("companion", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="text-[#fff] font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-[#f7f6f6]">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <style>
        {`
          @keyframes gradientMove {
            20% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      
      <div className="my-10 justify-end flex">
        <Button style={{
        background: "linear-gradient(90deg, #8290ff, #ec9eff, #fc7a7a)",
        backgroundSize: "200% 200%",
        animation: "gradientMove 8s ease infinite",
      }} className=" border-[2px]  border-[#fff] mt-6 hover:border-[#a6e3f7]   hover:text-[#a6e3f7] " onClick={OnGenerateTrip} disabled={loading}>
          {loading ? "Generating..." : "Generate Trip"}
        </Button>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default CreateTrip;
