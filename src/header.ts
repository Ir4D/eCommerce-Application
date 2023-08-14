/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Component from "./component";

const Buttons = [
  {
    id: "main",
    title: "Main page"
  },
  {
    id: "login",
    title: "Log in page"
  },
  {
    id: "signup",
    title: "Sign up page"
  }
];

class Header extends Component {
  public createButtonsView() {
    const buttonsView = document.createElement("div");
    buttonsView.className = "pages";
    Buttons.forEach((button) => {
      const buttonHtml = document.createElement("a");
      buttonHtml.className = "page-link";
      buttonHtml.classList.add(button.id);
      buttonHtml.href = `#${button.id}`;
      buttonHtml.innerText = button.title;
      buttonsView.append(buttonHtml);
    });
    this.container.append(buttonsView);
  }

  public render() {
    this.createButtonsView();
    return this.container;
  }
}

export default Header;
