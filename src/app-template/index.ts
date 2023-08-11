import Router from "../router/router";
import TemplateLayout from "./template-components/template-layout";

export default class AppTemplate {
  private router: Router;
  private container: HTMLElement;
  private templateLayout: TemplateLayout;
  private slot: HTMLElement;

  constructor() {
    this.router = new Router();
    this.container = document.body;
    this.slot = document.createElement("div");
    this.slot.innerText = "SLOT";
    this.templateLayout = new TemplateLayout();
  }
  public start(): void {
    this.container.append(this.templateLayout.render());
    this.container.append(this.slot);
  }
}
