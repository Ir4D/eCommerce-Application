const createCodeTemplate = (): string => {
  return `<main></main>`;
};

export default class MainView {
  public get render(): string {
    return createCodeTemplate();
  }
}
