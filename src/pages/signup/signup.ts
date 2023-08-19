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
      const inputElements = document.querySelectorAll('input');
      let hasError = false;
      inputElements.forEach((input) => {
        if (input.classList.contains('error')) {
          hasError = true;
        }
      });
      if (hasError) {
        const modal = document.getElementById('errorModal') as HTMLElement;
        const closeModal = modal.querySelector('.modal-close') as HTMLElement;
        modal.style.display = 'block';
        closeModal.addEventListener('click', () => {
          modal.style.display = 'none';
        });
      } else {
        signupCreate();
        window.location.hash = 'main';
      }
    }
  });

  return `${signupTitleView}${signupFormView}`;
};

export default class SignupView {
  public get render(): string {
    return createCodeTemplate();
  }
}
