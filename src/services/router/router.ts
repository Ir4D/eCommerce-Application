type RoutesType = '#main' | '#about' | '#catalog' | '#login' | '#404';

type PagesType = {
  main: RoutesType;
  about: RoutesType;
  catalog: RoutesType;
  login: RoutesType;
  notFound: RoutesType;
};

export default abstract class Router {
  public static pages: PagesType = {
    main: '#main',
    about: '#about',
    catalog: '#catalog',
    login: '#login',
    notFound: '#404'
  };

  public static navigate(location: RoutesType): void {
    window.location.hash = location;
  }
}
