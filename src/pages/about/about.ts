import Teammate from '../../components/teammate';
import { teammates } from '../../utils';

interface ITeammate {
  name: string;
  bio: string;
  git: string;
  photo?: string;
}

export default class AboutView {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('section');
    this.container.classList.add('about-us');
  }

  public renderHero(): string {
    const header = `<h1>About Us</h1>`;
    return `<div class="about-hero">${header}</div>`;
  }

  public renderTeam(arr: ITeammate[]): string {
    return `
    <div class="about-wrapper">
      <p class="subtitle subtitle--green">Team</p>
      <h2 class="about-title">Our Develop Experts</h2>
      <p class="about-text">Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
      <ul class="about-team list">
      ${arr?.map((el) => new Teammate(el).render).join('')}
      </ul>
    </div>
    <div class='rss'><div class="subtitle">All this was created thanks to <a class='link' target='_blanc' href='https://rs.school/js/'><img width='150' height='auto' src='./images/icons/rs_school_js.svg' /></a></div></div>`;
  }

  public render(): HTMLElement {
    this.container.innerHTML = `${this.renderHero()}${this.renderTeam(
      teammates
    )}`;
    return this.container;
  }
}
