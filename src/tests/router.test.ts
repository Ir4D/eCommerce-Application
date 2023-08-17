import Router from '../services/router/router';

test('Test routes', () => {
  expect(Router.pages).toEqual({
    main: '#main',
    about: '#about',
    catalog: '#catalog',
    login: '#login',
    notFound: '#404'
  });
});
