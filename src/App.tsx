import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import BirthdayWish from "./components/BirthdayWish";
import HerGallery from "./components/HerGallery";
import RomanticQuotes from "./components/RomanticQuotes";
import SecretVideoSection from "./components/VideoMessage";
import LoveLetterSection from "./components/LoveLetterSection";
import { ShootingStars } from "./components/ui/ShootingStars";
// import StarDial from "./components/ui/StarDial";
import MusicToggle from "./components/ui/MusicToggle";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="bg-[#0b0c2a] text-white font-['Dancing_Script']">
      {!started ? (
        <WelcomeScreen onContinue={() => setStarted(true)} />
      ) : (
        <>
          <BirthdayWish />
          <LoveLetterSection />
          <HerGallery />
          <RomanticQuotes />
          <SecretVideoSection />
          <ShootingStars />
          <MusicToggle />
        </>
      )}
    </div>
  );
}

export default App;
