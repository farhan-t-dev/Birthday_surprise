import '../App.css'

export default function Starfield() {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-full h-full bg-transparent star-layer animate-starMove" />
      </div>
    );
  }
  