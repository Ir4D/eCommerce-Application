interface ITeammate {
  name: string;
  bio: string;
  git: string;
  photo?: string;
}
const teammates: ITeammate[] = [
  {
    name: 'Irina Dedova',
    bio: 'Veniam sequi optio deserunt praesentium officia adipisci nihil animi velit earum labore quo, quas debitis architecto maiores excepturi quis laudantium tenetur atque expedita voluptatibus amet numquam consequuntur! Voluptates, voluptate necessitatibus',
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
