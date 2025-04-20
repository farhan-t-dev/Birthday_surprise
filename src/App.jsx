import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import BirthdayWish from "./components/BirthdayWish";
import HerGallery from "./components/HerGallery";
import RomanticQuotes from "./components/RomanticQuotes";
import SecretVideoSection from "./components/VideoMessage";
import LoveLetterSection from "./components/LoveLetterSection";

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
        </>
      )}
    </div>
  );
}

export default App;
