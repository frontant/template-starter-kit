class Contact extends window.HTMLElement {
  constructor(...args) {
    super(...args);
    console.log('1. "Contact" created');
  }

  connectedCallback() {
    console.log('2. "Contact" inserted to DOM');
  }
}

window.customElements.define('component-contact', Contact, {
  extends: 'section',
});
