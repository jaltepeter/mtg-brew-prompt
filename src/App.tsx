import { useState, useEffect } from "react";
import { generatePrompt, type GeneratedPrompt } from "./generatePrompt";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState<GeneratedPrompt | null>(null);
  const [terminalMode, setTerminalMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("terminal-mode", terminalMode);
    return () => document.body.classList.remove("terminal-mode");
  }, [terminalMode]);

  const handleGenerate = () => {
    setPrompt(generatePrompt());
  };

  const version = import.meta.env.VITE_APP_VERSION ?? "dev";
  const sha = import.meta.env.VITE_GIT_SHA ?? "local";

  return (
    <main className={`app ${terminalMode ? "terminal-mode" : ""}`}>
      {terminalMode && (
        <p className="prompt-line">
          <span className="cmd">$ brew-prompt</span>
        </p>
      )}
      <h1>What are we brewing?</h1>
      <p className="tagline">
        Roll the dice—get random Commander constraints. Color, theme, budget, and more.
        <br />
        Your next deck starts here.
      </p>
      <button type="button" className="generate-btn" onClick={handleGenerate}>
        {terminalMode ? "> roll" : "Roll the dice"}
      </button>
      <div className="prompt-card" aria-live="polite">
        {prompt == null ? (
          <p className="placeholder">Hit the button above and see what you get. No take-backs.</p>
        ) : (
          <div className="prompt-result">
            <p className="prompt-intro">Your build brief:</p>
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
        {version}
        {" · "}
        <button
          type="button"
          className="footer-sha"
          onClick={() => setTerminalMode((prev) => !prev)}
          title="Toggle terminal mode"
        >
          {sha}
        </button>
      </footer>
    </main>
  );
}

export default App;
