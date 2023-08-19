import SignupTitleView from './signup-title';
import SignupFormView from './signup-form';
import SignUpModal from './sign-up-modal';

const createCodeTemplate = (): string => {
  const signupTitleView = new SignupTitleView().render;
  const signupFormView = new SignupFormView().render;
  const signUpModal = new SignUpModal();

  return `${signupTitleView}${signUpModal.render(true)}${signupFormView}`;
};

export default class SignupView {
  public get render(): string {
    return createCodeTemplate();
  }
}
