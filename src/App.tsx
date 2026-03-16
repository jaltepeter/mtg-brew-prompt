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

  const [copied, setCopied] = useState(false);

  const [promptKey, setPromptKey] = useState(0);

  const handleGenerate = () => {
    setPrompt(generatePrompt());
    setPromptKey((k) => k + 1);
  };

  const handleCopyBrief = async () => {
    if (!prompt) return;
    const lines = [
      prompt.heading,
      ...prompt.items.map((item) => `• ${item}`),
      "",
      "Browse commanders: " + prompt.scryfallLegendaryUrl,
    ];
    if (prompt.scryfallThemeUrl) {
      lines.push("Browse theme cards: " + prompt.scryfallThemeUrl);
    }
    const text = lines.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
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
        Roll the dice—get random Commander constraints.
        <br />
        Color, theme, budget, and more.
        <br />
        Your next deck starts here.
      </p>
      <button
        type="button"
        className="generate-btn"
        onClick={handleGenerate}
        aria-label="Roll the dice to generate a new build brief"
      >
        {terminalMode ? "> roll" : "Roll the dice"}
      </button>
      <section
        className="prompt-card"
        aria-live="polite"
        aria-label="Build brief"
      >
        {prompt == null ? (
          <p className="placeholder">Roll the dice above to get your random build brief and Scryfall links.</p>
        ) : (
          <div className="prompt-result" key={promptKey}>
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
                title="Open Scryfall search for legendary creatures matching this build"
              >
                Browse commanders on Scryfall that match these constraints
              </a>
              {prompt.scryfallThemeUrl && (
                <a
                  href={prompt.scryfallThemeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scryfall-link"
                  title="Open Scryfall search for theme cards matching this build"
                >
                  Browse theme cards on Scryfall that match these constraints
                </a>
              )}
            </div>
            <button
              type="button"
              className="copy-brief-btn"
              onClick={handleCopyBrief}
              aria-live="polite"
              aria-label={copied ? "Copied to clipboard" : "Copy build brief to clipboard"}
            >
              {copied ? "Copied!" : "Copy build brief"}
            </button>
          </div>
        )}
      </section>
      <footer className="app-footer" title="Version · Git commit" aria-label="App version and build">
        {version}
        {" · "}
        <button
          type="button"
          className="footer-sha"
          onClick={() => setTerminalMode((prev) => !prev)}
          title="Toggle terminal mode"
          aria-label="Toggle terminal mode; shows version and Git commit"
        >
          {sha}
        </button>
      </footer>
    </main>
  );
}

export default App;
