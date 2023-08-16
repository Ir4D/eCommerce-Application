import SignupTitleView from "./signup-title";
import SignupFormView from "./signup-form";
import { loginCheck } from "../../api/loginLogic";

const createCodeTemplate = (): string => {
  const signupTitleView = new SignupTitleView().render;
  const signupFormView = new SignupFormView().render;

  return `${signupTitleView}${signupFormView}`;
};

export default class SignupView {
  public get render(): string {
    return createCodeTemplate();
  }
}
