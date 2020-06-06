import { $, matches } from '@frontant/utils-dom';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import { breakpoints, BreakpointsEvent } from '~/shared/scripts/breakpoints';

class NavigationMenu extends window.HTMLElement {
  constructor(...args) {
    super(...args);
    this.init();
  }

  init() {
    this.resolveElements();
    this.bindFunctions();
    this.bindEvents();
  }

  resolveElements() {
    this.$menuBtn = $('.hamburger', this);
  }

  bindFunctions() {
    this.triggerMenu = this.triggerMenu.bind(this);
    this.closeMenuOnBiggerScreens = this.closeMenuOnBiggerScreens.bind(this);
    this.closeMenuIfClickedOutside = this.closeMenuIfClickedOutside.bind(this);
  }

  bindEvents() {
    this.$menuBtn && this.$menuBtn.addEventListener('click', this.triggerMenu);
    breakpoints.on(BreakpointsEvent.CHANGED, this.closeMenuOnBiggerScreens);
    this.addEventListener('click', this.closeMenuIfClickedOutside);
  }

  triggerMenu() {
    matches(this, '.menuIsOpen') ? this.closeMenu() : this.openMenu();
  }

  closeMenuOnBiggerScreens() {
    const mdWidth = breakpoints.get()['md'];

    window.innerWidth >= mdWidth &&
      matches(this, '.menuIsOpen') &&
      this.closeMenu();
  }

  closeMenuIfClickedOutside(e) {
    this === e.target && matches(this, '.menuIsOpen') && this.closeMenu();
  }

  openMenu() {
    this.classList.add('menuIsOpen');
    disableBodyScroll(this);
  }

  closeMenu() {
    this.classList.remove('menuIsOpen');
    enableBodyScroll(this);
  }
}

window.customElements.define('component-navigationmenu', NavigationMenu, {
  extends: 'nav',
});
