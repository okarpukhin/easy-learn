import ReactDOM from 'react-dom/client';
import BoardComponent from './board.component';

window.bridge.sendSettings((event, settings) => {
    const library = settings.libraries[0];

    const root = ReactDOM.createRoot(document.getElementById("root"));

    root.render(<BoardComponent library={library}/>);
});

window.electronAPI.getSettings();
