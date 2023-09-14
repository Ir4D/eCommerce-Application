interface ITeammate {
  name: string;
  bio: string;
  git: string;
  photo?: string;
}
const teammates: ITeammate[] = [
  {
    name: 'Irina Dedova',
    bio: `
      Alexandroupoli, Grecce.<br>
      I used to work at a bank in the Compliance Department. In 2022, I acquired a web development diploma from ITMO University, and in 2023 I successfully completed the course 'JS/FE Pre-School 2022Q4' at RS School with the maximum score. I am currently learning Front-end development at RS School.<br>
      <strong>Contributions to the project:</strong><br>
      - CommerceTools Project creation and API Client Setup;<br>
      - Sign up page: customer registration and fields validation;<br>
      - Profile page: user's info and addresses, edit mode;<br>
      - Cart page: display, modify and remove items, promo code, total sum and empty cart message.<br>
      <strong>Additional responsibilities:</strong> Repository Keeper, Project Deployer and Cross-check Submitter.
    `,
    git: 'https://github.com/Ir4D',
    photo: './images/avatars/irina.jpg'
  },
  {
    name: 'Dzmitry Maltsau',
    bio: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam, libero similique illo minus dolor enim modi commodi delectus incidunt doloribus laborum unde quos expedita voluptas aut amet repudiandae eos veniam?',
    git: 'https://github.com/Maltsau',
    photo: './images/avatars/dzmitry.jpg'
  },
  {
    name: 'Natalia Vozhdaeva',
    bio: 'Minima ut, eveniet, placeat sunt eos enim amet numquam libero atque fuga consequuntur quas maiores unde et inventore voluptatibus officia accusantium sint neque ducimus doloremque blanditiis? Deserunt, neque.',
    git: 'https://github.com/NataliaVozhdaeva',
    photo: './images/avatars/natalia.jpg'
  }
];

export { teammates };
