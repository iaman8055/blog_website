import { createContext, useContext, useEffect, useState } from "react";

const GptContext = createContext(false);

export function useGptReady() {
  return useContext(GptContext);
}

export function GptProvider({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };

    if (!document.getElementById("gpt-script")) {
      const script = document.createElement("script");
      script.id = "gpt-script";
      script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
      script.async = true;
      document.head.appendChild(script);
    }

    window.googletag.cmd.push(() => {
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
      setReady(true);
    });
  }, []);

  return <GptContext.Provider value={ready}>{children}</GptContext.Provider>;
}
