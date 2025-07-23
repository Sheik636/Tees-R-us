// App.jsx
import { useRef, useState } from "react";
import { gsap } from "gsap";

export default function App() {
  const introRef = useRef(null);
  const titleRef = useRef(null);
  const cloneRef = useRef(null);
  const buttonRef = useRef(null);
  const [showMain, setShowMain] = useState(false);

  const handleEnter = () => {
    const titleEl = titleRef.current;
    const cloneEl = cloneRef.current;
    const introEl = introRef.current;
    const buttonEl = buttonRef.current;
    const rect = titleEl.getBoundingClientRect();

    // 1) Make the clone sit exactly over the original
    gsap.set(cloneEl, {
      textContent: titleEl.textContent,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      fontSize: window.getComputedStyle(titleEl).fontSize,
      position: "fixed",
      opacity: 1,
      x: 0,
      y: 0,
    });

    // 2) Fade out the intro title
    gsap.to(titleEl, { opacity: 0, duration: 0.2 });

   

    // 3) Slide intro away
    gsap.to(introEl, {
      y: "-100%",
      duration: 1,
      ease: "power3.inOut",
    });
     gsap.to(buttonEl, {
      opacity:0,
      duration:0.2,
      
    })

    // 4) Move clone to top-center
    gsap.to(cloneEl, {
      top: 20,
      left: "50%",
      x: "-50%",
      duration: 1,
      width:'200px',
      ease: "power3.inOut",
      onComplete: () => {
        // reveal your main content (with its own h2 in flow)
        setShowMain(true);
      },
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-100">
      {/* intro screen */}
      <div
        ref={introRef}
        className="fixed inset-0 bg-gray-800 flex flex-col items-center justify-center z-40"
      >
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-sky-300 mb-6 w-[200px]"
        >
           TEES R US 
        </h2>
        <button ref={buttonRef}
          onClick={handleEnter}
          className="bg-blue-400 hover:bg-blue-600 text-white px-6 py-2 rounded "
        >
          Enter The New World
        </button>
      </div>

      {/* this clone is what actually animates up */}
      <h2
        ref={cloneRef}
        className="text-4xl font-bold text-sky-300 pointer-events-none opacity-0 z-50 "
      />

      {/* main content (hidden until after animation) */}
      {showMain && (
        <main className="pt-32 px-6">
          {/* the “permanent” heading in your flow */}
          <h2 className="text-4xl font-bold mb-6 text-sky-800">
            Welcome to My Website
          </h2>
          <p className="text-lg mb-4 text-sky-800">
            This is the main content of the website.
          </p>
          <p className="text-lg mb-4 text-sky-800">Scroll down for more content…</p>
        </main>
      )}
    </div>
  );
}
