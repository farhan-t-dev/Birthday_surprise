import { useState, lazy, Suspense } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import MusicToggle from "./components/ui/MusicToggle";

// Lazy load the larger components
const BirthdayWish = lazy(() => import("./components/BirthdayWish"));
const HerGallery = lazy(() => import("./components/HerGallery"));
const RomanticQuotes = lazy(() => import("./components/RomanticQuotes"));
const SecretVideoSection = lazy(() => import("./components/VideoMessage"));
const LoveLetterSection = lazy(() => import("./components/LoveLetterSection"));
const OpenWhenLetters = lazy(() => import("./components/OpenWhenLetters"));

function App() {
  const [started, setStarted] = useState(false);

  // Beautiful suspense fallback component
  const LoadingFallback = () => (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      {/* Romantic loading animation */}
      <div className="relative">
        {/* Beating heart animation */}
        <div className="animate-pulse">
          <svg 
            className="w-20 h-20 text-pink-500" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        
        {/* Floating rose petals */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-pink-300 opacity-70"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 80 + 10}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animation: `float ${Math.random() * 3 + 2}s infinite ease-in-out alternate`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      
      {/* Romantic loading text with changing messages */}
      <div className="text-center space-y-2">
        <p className="text-xl text-pink-100">Preparing something special...</p>
        <p className="text-sm text-pink-200 animate-pulse">
          {[
            "Gathering roses...",
            "Lighting candles...",
            "Writing love letters...",
            "Selecting the perfect song...",
            "Polishing memories..."
          ][Math.floor(Math.random() * 5)]}
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="w-48 bg-pink-900 rounded-full h-1.5">
        <div 
          className="bg-pink-500 h-1.5 rounded-full animate-[grow_2s_ease-in-out_infinite]" 
          style={{ width: `${Math.random() * 30 + 30}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#0b0c2a] text-white font-['Dancing_Script']">
      {!started ? (
        <WelcomeScreen onContinue={() => setStarted(true)} />
      ) : (
        <>
          <Suspense fallback={<LoadingFallback />}>
            <BirthdayWish />
            <LoveLetterSection />
            <HerGallery />
            <RomanticQuotes />
            <OpenWhenLetters />
            <SecretVideoSection />
          </Suspense>
          <MusicToggle />
        </>
      )}
    </div>
  );
}

export default App;