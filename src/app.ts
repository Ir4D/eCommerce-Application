import headerView from './components/view/header';

export default function App(): void {
  const appContainer = document.querySelector<HTMLElement>('body');
  if (!appContainer) throw new Error('error');
  appContainer.innerHTML = headerView();
}
