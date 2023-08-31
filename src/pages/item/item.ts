import AsyncPage from '../../components/abstract/asyncPage';

export default class ItemView extends AsyncPage {
  // private item: Object
  /*  private catalog:
    | ClientResponse<ProductProjectionPagedQueryResponse>
    | undefined; */

  constructor(/* item: Object */) {
    super();
    this.container = document.createElement('section');
    this.container.classList.add('good-cart');
    console.log('item', this.container);
  }
}
