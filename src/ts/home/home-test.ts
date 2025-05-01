class HomeTest extends HTMLElement {
  connectedCallback(): void {
    this.init();
  }

  private init(): void {
    this.setup();
  }

  private setup(): void {
    console.log('home-test');
  }
}

customElements.define('home-test', HomeTest);
