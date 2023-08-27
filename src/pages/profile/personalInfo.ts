export default class PersonalInfo {
  private id: string;
  private firstName: string | undefined;
  private lastName: string | undefined;
  private dateOfBirth: string | undefined;
  private email: string | undefined;

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
  }

  public getFormattedPersonalInfo(): string {
    return `Customer: ${this.firstName} ${this.lastName}, ${this.dateOfBirth}, ${this.email}`;
  }
}
