/* eslint-disable @typescript-eslint/explicit-function-return-type */

class MainPage {
  private container: HTMLElement;

  public static TextObject = {
    MainTitle: "This is Main Page"
  };

  constructor(id: string) {
    this.container = document.createElement("div");
    this.container.id = id;
  }

  public static createHeaderTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.innerHTML = text;
    return headerTitle;
  }

  public render() {
    const title = MainPage.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default MainPage;
