/* eslint-disable max-lines-per-function */
import SignupTitleView from './signup-title';
import SignupFormView from './signup-form';
import { signupCreate } from '../../services/signupCustomer/signupCustomer';
import { validators } from '../../services/signupCustomer/validationParams';

const createCodeTemplate = (): string => {
  const signupTitleView = new SignupTitleView().render;
  const signupFormView = new SignupFormView().render;

  document.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;
    const targetClass = Array.from(target.classList).find(
      (cls) => cls in validators
    );
    if (targetClass) {
      validators[targetClass](target.value);
    }
  });

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
