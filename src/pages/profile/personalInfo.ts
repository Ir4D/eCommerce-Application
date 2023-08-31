import InfoElem from './profileElem';

const createElem = (tag: string, className: string): HTMLElement =>
  Object.assign(document.createElement(tag), { className });

export default class PersonalInfo {
  private id: string;
  private firstName: string | undefined;
  private lastName: string | undefined;
  private dateOfBirth: string | undefined;
  private email: string | undefined;
  public container: HTMLElement;

  constructor(
    id: string,
    firstName: string | undefined,
    lastName: string | undefined,
    dateOfBirth: string | undefined,
    email: string | undefined
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.container = document.createElement('div');
    this.container.className = 'profile-container';
    this.createElement();
  }

  public createElement(): void {
    const profilePerson = createElem('div', 'profile-person');
    const profileInfo = createElem('div', 'profile-info');
    profileInfo.innerHTML = 'Personal information:';
    const elemFirstName = new InfoElem(
      'first-name',
      'First name:',
      `${this.firstName}`
    ).render();
    const elemLastName = new InfoElem(
      'last-name',
      'Last name:',
      `${this.lastName}`
    ).render();
    const elemDOB = new InfoElem(
      'dob',
      'Date of birth:',
      `${this.dateOfBirth}`
    ).render();
    const elemEmail = new InfoElem('email', 'Email:', `${this.email}`).render();
    const editBtn = createElem('button', 'edit-btn');
    editBtn.classList.add('btn', 'btn--blue');
    editBtn.innerHTML = 'Edit';
    profilePerson.append(
      profileInfo,
      elemFirstName,
      elemLastName,
      elemDOB,
      elemEmail,
      editBtn
    );
    editBtn.addEventListener('click', () => {
      this.editPersonalInfo(this.id);
    });
    this.container.appendChild(profilePerson);
  }

  public editPersonalInfo(id: string): void {
    console.log('edit info', id);
  }

  public render(): HTMLElement {
    return this.container;
  }
}
