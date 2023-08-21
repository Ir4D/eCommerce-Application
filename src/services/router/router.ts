export default abstract class Router {
  public static pages = {
    main: '#main',
    about: '#about',
    catalog: '#catalog',
    login: '#login',
    signup: '#signup',
    notFound: '#404',
    cart: '#cart'
  };

  public static navigate(location: string): void {
    console.log(location);

    if (Object.values(Router.pages).includes(location)) {
      window.location.hash = location;
    } else {
      window.location.hash = Router.pages.notFound;
    }
  }
}
