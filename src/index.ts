/* eslint-disable @typescript-eslint/no-unused-vars */
import "./index.scss";
import App from "./app";
// import AppPages from "./app_pages";
import FormHandler from "./signUp";


const app = new App();
app.init();

// App();
// const app = new AppPages();
// app.run();

const formHandler = new FormHandler(".signup-form");

