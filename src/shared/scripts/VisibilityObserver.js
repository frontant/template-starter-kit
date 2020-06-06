class VisibilityObserver {
  constructor(threshold = 0) {
    this.threshold = threshold;
    this.observer = null;

    this._init();
  }

  observe(el) {
    this.observer.observe(el);
  }

  _init() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.observer.unobserve(entry.target);
            entry.target.classList.add('is-triggered');
          }
        });
      },
      {
        threshold: this.threshold,
      }
    );
  }
}

const visibilityObserver = new VisibilityObserver();

export { VisibilityObserver, visibilityObserver };
