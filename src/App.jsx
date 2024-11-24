import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/hero'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
// import Hero from './components/custom/hero';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* Hero */}
    <Hero/>

    <header>
        {/* Display SignInButton if the user is not signed in */}
        {/* <SignedOut>
          <SignInButton />
        </SignedOut> */}

        {/* Display UserButton if the user is signed in */}
        {/* <SignedIn>
          <UserButton />
        </SignedIn> */}
      </header>
      
    </>
  )
}

export default App




