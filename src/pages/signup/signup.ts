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
    if (target.classList.contains('country_bill')) {
      const postalCodeInput = document.querySelector(
        '.post_bill'
      ) as HTMLInputElement;
      if (postalCodeInput) {
        postalCodeInput.value = '';
      }
    }
    if (target.classList.contains('country_ship')) {
      const postalCodeInput = document.querySelector(
        '.post_ship'
      ) as HTMLInputElement;
      if (postalCodeInput) {
        postalCodeInput.value = '';
      }
    }
  });

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('form-button')) {
      const inputElements = document.querySelectorAll('input');
      let hasError = false;
      let allInputsEmpty = true;
      inputElements.forEach((input) => {
        if (input.classList.contains('error')) {
          hasError = true;
        }
        if (input.value !== '') {
          allInputsEmpty = false;
        }
      });
      if (hasError || allInputsEmpty) {
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

  document.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    const shipAddress = document.querySelector(
      '.form-shipping-address'
    ) as HTMLElement;
    const shipTitle = document.querySelector(
      '.form-shipping_title'
    ) as HTMLElement;
    if (target && target.classList.contains('copy_address')) {
      if (target.checked) {
        shipAddress.classList.add('hidden');
        shipTitle.classList.add('hidden');
      } else {
        shipAddress.classList.remove('hidden');
        shipTitle.classList.remove('hidden');
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
