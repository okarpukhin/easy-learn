import { contextBridge, ipcRenderer } from 'electron';

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

//listener: (event: IpcRendererEvent, ...args: any[]) => void)
contextBridge.exposeInMainWorld('bridge', {
    sendSettings: (settings: any) => ipcRenderer.on('send-settings', settings)
});

contextBridge.exposeInMainWorld('electronAPI', {
    getSettings: () => ipcRenderer.send('get-settings'),
    playAudio: (relativePath: string) => ipcRenderer.send('play-audio', relativePath),
});