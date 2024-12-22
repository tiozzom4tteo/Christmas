import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [showSanta, setShowSanta] = useState(false);  // Per la comparsa di Babbo Natale
  const [zoomSanta, setZoomSanta] = useState(false);  // Per l'effetto zoom su Babbo Natale
  const [showVoucher, setShowVoucher] = useState(false); // Per la comparsa del voucher
  const [santaGone, setSantaGone] = useState(false);  // Per nascondere Babbo Natale dopo lo zoom
  const [buttonClicked, setButtonClicked] = useState(false); // Per far scomparire il pulsante

  const handleButtonClick = () => {
    // Vibrazione se supportata
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    // Nascondi il pulsante
    setButtonClicked(true);

    // Iniziamo a mostrare Babbo Natale
    setShowSanta(true);

    // Dopo un po' facciamo partire lo zoom
    setTimeout(() => {
      setZoomSanta(true);
    }, 1000);  // Dopo 1 secondo, inizia l'effetto zoom

    // Dopo che l'effetto zoom è finito, nascondiamo Babbo Natale e facciamo comparire il voucher
    setTimeout(() => {
      setSantaGone(true);  // Nascondiamo Babbo Natale
      setShowVoucher(true);  // Mostriamo il voucher
    }, 3000);  // Dopo 3 secondi, nascondiamo Babbo Natale e mostriamo il voucher
  };

  // Funzione per generare fiocchi di neve
  const generateSnowflakes = () => {
    const numberOfFlakes = 70; // Numero di fiocchi di neve
    const flakes = [];
    for (let i = 0; i < numberOfFlakes; i++) {
      flakes.push(
        <div key={i} className="snowflake" style={{
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 5 + 3}s`, // durata random
          animationDelay: `${Math.random() * 5}s`, // ritardo random
          opacity: Math.random() * 0.5 + 0.5, // opacità random
        }} />
      );
    }
    return flakes;
  };

  return (
    <div className={`app-container ${showVoucher ? 'show-voucher' : ''}`}>
      {/* Mostra il pulsante solo se non è stato cliccato */}
      {!buttonClicked && (
        <div className="button-container">
          <button className="discover-button" onClick={handleButtonClick}>
            Scopri il regalo
          </button>
        </div>
      )}

      {/* Contenuto principale dopo la scomparsa del pulsante */}
      {showVoucher ? (
        <>
          <div className="snowfall">
            {generateSnowflakes()}
          </div>
          <div className="voucher-container">
            <div className="voucher-card">
              <div className="voucher-header">
                <h1>Un volo verso l'<em>ignoto</em></h1>
              </div>
              <div className="voucher-content">
                <p className="voucher-description">
                  <b id="euro">50€</b><br />
                  per una destinazione <b>misteriosa</b>.
                </p>
              </div>
              <div className="voucher-footer">
                <p>Scoprirai la destinazione al momento della partenza!</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        showSanta && !santaGone && (
          <div className={`santa ${zoomSanta ? 'zoom' : ''}`}>
            <div className="hat"></div>

            <div className="ear left"></div>
            <div className="ear right"></div>

            <div className="face">
              <i></i>
              <i></i>

              <div className="eye left"></div>
              <div className="eye right"></div>

              <div className="nose"></div>
            </div>

            <div className="beard"></div>
          </div>
        )
      )}
    </div>
  );
};

export default App;
