import FightersView from './fightersView';
import { fighterService } from './services/fightersService';

class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById('root');
  static loadingElement = document.getElementById('loading-overlay');

  async startApp() {
    try {
      (App.loadingElement as HTMLElement).style.visibility = 'visible';
      const fighters = await fighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;

        (App.rootElement as HTMLElement).appendChild(fightersElement);
    } catch (error) {
        console.warn(error);
        (App.rootElement as HTMLElement).innerText = 'Failed to load data';
    } finally {
        (App.loadingElement as HTMLElement).style.visibility = 'hidden';
    }
  }
}

export default App;