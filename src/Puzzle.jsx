import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// variabile che non cambiera mai, quindi da tenere fuori dalla funzione
const PUZZLE_RISOLTO = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function creaPuzzleMischiato() {
  let pezziMischiati = [...PUZZLE_RISOLTO];

  do {
    pezziMischiati = [...PUZZLE_RISOLTO].sort(() => Math.random() - 0.5);
  } while (pezziMischiati.every((pezzo, index) => pezzo === PUZZLE_RISOLTO[index]));

  return pezziMischiati;
}

export default function Puzzle() {
  const [pezzi, setPezzi] = useState(creaPuzzleMischiato);
  const [pezzoSelezionato, setPezzoSelezionato] = useState(null);
  const [vinto, setVinto] = useState(false);
  const [mostraGif, setMostraGif] = useState(false);
  const explosionRef = useRef(null);

  // riavvia il video quando viene mostrato
  useEffect(() => {
    if (!mostraGif || !explosionRef.current) return;

    const video = explosionRef.current;
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  }, [mostraGif]);

  // quanto tempo sta la gif
  useEffect(() => {
    if (!mostraGif) return;

    const timer = setTimeout(() => {
      setMostraGif(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [mostraGif]);

  // per cambiare pagine
  const navigate = useNavigate();

  // funzioni per rendere interattivo il puzzle
  function handleClick(pezzoCliccato) {
    if (vinto) return;

    if (pezzoSelezionato === null) {
      setPezzoSelezionato(pezzoCliccato);
      return;
    }

    const nuoviPezzi = [...pezzi];

    [nuoviPezzi[pezzoSelezionato], nuoviPezzi[pezzoCliccato]] = [
      nuoviPezzi[pezzoCliccato],
      nuoviPezzi[pezzoSelezionato],
    ];

    const vittoria = nuoviPezzi.every((pezzo, index) => pezzo === PUZZLE_RISOLTO[index]);

    setPezzi(nuoviPezzi);
    setPezzoSelezionato(null);

    if (vittoria) {
      setVinto(true);
      setMostraGif(true);
    }
  }

  // calcola la posizione dell'immagine
  function calcolaImg(numeroPezzo) {
    const riga = Math.floor(numeroPezzo / 3);
    const colonna = numeroPezzo % 3;

    return `${colonna * 50}% ${riga * 50}%`;
  }

  return (
    <div className="Puzzle">
      <h1>Vyres to</h1>

      <div className={`tabellone ${vinto ? "completato" : ""}`}>
        {pezzi.map((pezzo, index) => (
          <div
            className={`pezzo ${pezzoSelezionato === index ? "selezionato" : ""}`}
            key={index}
            onClick={() => handleClick(index)}
            style={{
              backgroundPosition: calcolaImg(pezzo),
            }}
          ></div>
        ))}

        <video
          ref={explosionRef}
          src="/esplosione.mov"
          className={`gif-vittoria ${mostraGif ? "visible" : ""}`}
          muted
          playsInline
          preload="metadata"
        />
      </div>

      {vinto && (
        <div className="vittoria-container">
          <h2>COMPLETE!!</h2>
          <button className="vai-avanti-btn" onClick={() => navigate("/Vsechno-Nejlepsi")}>
            Pokracovat
          </button>
        </div>
      )}
    </div>
  );
}
