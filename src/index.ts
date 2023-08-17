import "./index.scss";
import App from "./app";
import { signupCreate } from "./services/signupCustomer/signupCustomer";

const app = new App();
app.init();
app.runClient();

const submitForm = document.querySelector(".form-button");
submitForm?.addEventListener("click", signupCreate);
