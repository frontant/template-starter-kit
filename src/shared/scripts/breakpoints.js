import EventEmitter from './EventEmitter';
import scssBreakpoints from '~/shared/styles/variables/_breakpoints.scss';

class Breakpoints extends EventEmitter {
  static Event = {
    CHANGED: 'Breakpoints.Event.CHANGED',
  };

  constructor(...args) {
    super(...args);

    this.breakpoints = {};
    for (const key in scssBreakpoints) {
      const val = parseInt(scssBreakpoints[key]);
      this.breakpoints[key] = val;
    }

    this.timeoutId = null;
    this.currentBreakpoint = null;

    this._init();
  }

  _init() {
    this._bindFunctions();
    this._bindEvents();
    this._updateWithDelay();
  }

  _bindFunctions() {
    this._updateWithDelay = this._updateWithDelay.bind(this);
    this._update = this._update.bind(this);
  }

  _bindEvents() {
    window.addEventListener('resize', this._updateWithDelay);
  }

  _updateWithDelay() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(this._update, 100);
  }

  _update() {
    const w = window.innerWidth;
    const hitBreakpoint = Object.values(
      this.breakpoints
    ).reduce((resVal, curVal) =>
      curVal > resVal && w - curVal >= 0 ? curVal : resVal
    );

    if (this.currentBreakpoint !== hitBreakpoint) {
      this.currentBreakpoint = hitBreakpoint;
      this.emit(Breakpoints.Event.CHANGED);
    }
  }

  get() {
    return this.breakpoints;
  }
}

const breakpoints = new Breakpoints();
const BreakpointsEvent = Breakpoints.Event;

export { breakpoints, BreakpointsEvent };
