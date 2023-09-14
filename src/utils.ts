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
    bio: 'Gomel, Republic of Belarus <br/> Used to work as oil engineer, currently making first steps in front-end development <br/> Tech Stack: JS, TS, HTML, CSS, React <br/> Participation on project: Routing implementation, 404 page layout, Catalog page layout, Catalog sort and filter algorithms implementation',
    git: 'https://github.com/Maltsau',
    photo: './images/avatars/dzmitry.png'
  },
  {
    name: 'Natalia Vozhdaeva',
    bio: 'Minima ut, eveniet, placeat sunt eos enim amet numquam libero atque fuga consequuntur quas maiores unde et inventore voluptatibus officia accusantium sint neque ducimus doloremque blanditiis? Deserunt, neque.',
    git: 'https://github.com/NataliaVozhdaeva',
    photo: './images/avatars/natalia.jpg'
  }
];

export { teammates };
