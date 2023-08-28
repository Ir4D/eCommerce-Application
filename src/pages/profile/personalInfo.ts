import InfoElem from './profileElem';

const createDivElem = (className: string): HTMLElement =>
  Object.assign(document.createElement('div'), { className });

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
    const profilePerson = createDivElem('profile-person');
    const profileInfo = createDivElem('profile-info');
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
    profilePerson.append(
      profileInfo,
      elemFirstName,
      elemLastName,
      elemDOB,
      elemEmail
    );
    this.container.appendChild(profilePerson);
  }

  public render(): HTMLElement {
    return this.container;
  }
}
