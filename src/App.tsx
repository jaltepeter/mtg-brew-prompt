import { useState } from "react";
import { generatePrompt, type GeneratedPrompt } from "./generatePrompt";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState<GeneratedPrompt | null>(null);

  const handleGenerate = () => {
    setPrompt(generatePrompt());
  };

  return (
    <main className="app">
      <h1>MTG Brew Prompt Generator</h1>
      <p className="tagline">Get random deck-building constraints to spark new ideas.</p>
      <button type="button" className="generate-btn" onClick={handleGenerate}>
        Generate prompt
      </button>
      <div className="prompt-card" aria-live="polite">
        {prompt == null ? (
          <p className="placeholder">Click the button to generate a constraint.</p>
        ) : (
          <div className="prompt-result">
            <p className="prompt-heading">{prompt.heading}</p>
            <ul className="prompt-list">
              {prompt.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="scryfall-links">
              <a
                href={prompt.scryfallLegendaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="scryfall-link"
              >
                Browse commanders on Scryfall that match these constraints
              </a>
              {prompt.scryfallThemeUrl && (
                <a
                  href={prompt.scryfallThemeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scryfall-link"
                >
                  Browse theme cards on Scryfall that match these constraints
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      <footer className="app-footer">
        {[import.meta.env.VITE_APP_VERSION ?? "dev", import.meta.env.VITE_GIT_SHA ?? "local"]
          .join(" · ")}
      </footer>
    </main>
  );
}

export default App;
