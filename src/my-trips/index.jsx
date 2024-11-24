import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/usertripcarditem';
import Footer from '@/view-trip/[tripId]/components/Footer';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const getUserTrips = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        navigate('/'); // Redirect to home if user is not found
        return;
      }

      try {
        const db = getFirestore(); // Initialize Firestore instance
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
        const querySnapshot = await getDocs(q);

        const trips = [];
        querySnapshot.forEach((doc) => {
          trips.push({ id: doc.id, ...doc.data() }); // Include document ID
        });

        setUserTrips(trips);
      } catch (error) {
        console.error('Error fetching user trips:', error);
        setError('Error fetching user trips.'); // Set error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    getUserTrips();
  }, [navigate]);

  
  

  return (
    <div className='text-center sm:px-10 md:px-32 xl:px-72 px-5 mt-10'>
      <h2 className='text-[#ffffff] font-bold text-3xl'>My Trips </h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>

        {userTrips?.length>0 ?userTrips.map((trip,index)=>(
          
      <UserTripCardItem trip={trip} key ={index} />

        )):[1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className='h-[250px] w-[320] bg-slate-200 animate-pulse rounded-xl '>

          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MyTrips;