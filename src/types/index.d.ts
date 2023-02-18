export {};

declare global {
  interface Window {
    bridge: {
        sendSettings: (callback: (event: any, settings: any)=>any) => void;
    };

    electronAPI: {
        getSettings: () => void;
        playAudio: (relativePath: stirng) => void;
    }
  }
}