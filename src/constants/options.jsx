export const SelectTravelsList=[
    {
        id:1,
        title:"Just Me ",
        desc:"A Sole Travels in Exploration",
        icon:"✈️",
        people:"1"
    },
    {
        id:2,
        title:"A Couple ",
        desc:"Two trips side by side",
        icon:"🥂",
        people:"2"
    },
    {
        id:3,
        title:"Family",
        desc:"A fun-loving family seeking adventure",
        icon:"🏘️",
        people:"3 to 5"
    },
    {
        id:4,
        title:"Friends",
        desc:"A Bunch of Trill-Seekers",
        icon:"🚤",
        people:"5 to 10"
    }
] 




export const SelectBudgetOptions=[
    {
        id:1,
        title:"Cheap",
        desc:"Focus on affordability",
        icon:"💸",
    },
    {
        id:2,
        title:"Moderate",
        desc:"Stay within a reasonable budget",
        icon:"💰",
    },
    {
        id:3,
        title:"Luxury",
        desc:"Dont worry about cost",
        icon:"🏝️",
    },
    
]

export const AI_PROMPT = `
Generate a travel plan for the location: {location}, for {totalDays} days with {Companion}, and a {budget} budget. 
Provide a list of hotel options including:
- Hotel Name
- Hotel Address
- Accurate real-time price (in local currency)
- Hotel Image URL
- Precise geo-coordinates (latitude, longitude)
- Rating
- Descriptions

Also, suggest an itinerary with:
- Place Name
- Place Address 
- Place Details
- Place Image URL
- Exact geo-coordinates
- Ticket Pricing
- Time to travel
- Time Travel for each location across {totalDays} days with a day-by-day plan, including the best time to visit, all in JSON format.
`;


