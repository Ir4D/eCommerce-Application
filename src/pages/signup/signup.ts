import SignupTitleView from './signup-title';
import SignupFormView from './signup-form';
import { signupCreate } from '../../services/signupCustomer/signupCustomer';

const createCodeTemplate = (): string => {
  const signupTitleView = new SignupTitleView().render;
  const signupFormView = new SignupFormView().render;

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('form-button')) {
      signupCreate();
    }
  });

  return `${signupTitleView}${signupFormView}`;
};

export default class SignupView {
  public get render(): string {
    return createCodeTemplate();
  }
}
