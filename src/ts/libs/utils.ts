import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/all';
import SplitType from 'split-type';
import { FadeSplitTextOptions, ScreenType, TextSplitOptions } from 'src/types';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const getScreenType = (): ScreenType => {
  const width = window.innerWidth;
  const type = width > 991 ? 'dsk' : window.innerWidth > 767 ? 'tb' : 'mb';
  const size = width;
  const isMobile = width <= 767;
  const isTablet = width > 767 && width <= 991;
  const isDesktop = width > 991;
  return { type, size, isMobile, isDesktop, isTablet };
};

const lerp = (a: number, b: number, t: number = 0.08): number => {
  return a + (b - a) * t;
};

const xSetter = (el: HTMLElement): any => gsap.quickSetter(el, 'x', 'px');
const ySetter = (el: HTMLElement): any => gsap.quickSetter(el, 'y', 'px');
const xGetter = (el: HTMLElement): number => gsap.getProperty(el, 'x') as number;
const yGetter = (el: HTMLElement): number => gsap.getProperty(el, 'y') as number;

const parseRem = (input: number = 0): number => {
  return (input / 10) * parseFloat(getComputedStyle(document.querySelector('html')!).fontSize);
};

const MathMap = (x: number, a: number, b: number, c: number, d: number): number => {
  return parseFloat((((x - a) * (d - c)) / (b - a) + c).toFixed(3));
};

class TextSplit {
  DOM: TextSplit | undefined;

  constructor({ el, type }: TextSplitOptions) {
    if (!el) return;
    this.DOM = { el, splitType: new SplitType(el, { types: type || 'lines' }) };
    this.init();
  }

  init(): void {
    this.DOM?.el.classList.add('text__mask');
    this.DOM?.splitType.lines?.forEach((line) => {
      const div = document.createElement('div');
      div.appendChild(line);
      div.classList.add('line__mask');
      this.DOM?.el.appendChild(div);
    });
  }
}

class FadeSplitText {
  DOM: Element | undefined;
  allowMobile: boolean;
  breakType: string;
  textSplit: SplitType | null;
  delay?: number;
  animation: gsap.core.Timeline | null;

  constructor({ el, delay, breakType, isDisableRevert, allowMobile, ...props }: FadeSplitTextOptions) {
    if (!el || el.textContent === '') return;
    this.DOM = { el };
    this.allowMobile = getScreenType().isMobile ? allowMobile : true;
    this.breakType = breakType || 'lines';
    this.textSplit = this.allowMobile ? new TextSplit({ el: this.DOM.el, type: this.breakType }).DOM.splitType : null;
    this.delay = delay;
    this.animation =
      this.allowMobile && this.textSplit
        ? gsap.from(this.textSplit[this.breakType], {
            autoAlpha: 0,
            yPercent: 100,
            stagger: this.breakType === 'lines' ? 0.1 : 0.04,
            duration: this.breakType === 'lines' ? 0.6 : 1,
            ease: 'power2.out',
            clearProps: isDisableRevert ? '' : 'all',
            onComplete: () => {
              if (!isDisableRevert && this.textSplit) {
                this.textSplit.revert();
              }
            },
            ...props,
          })
        : null;
  }

  init(): void {
    document.fonts.onloadingdone = () => {
      if (this.allowMobile && this.textSplit) {
        gsap.set(this.textSplit[this.breakType], { autoAlpha: 0, yPercent: 100 });
      }
    };
  }
}

class MasterTimeline {
  timeline: gsap.core.Timeline;
  triggerInit: HTMLElement;
  scrollTrigger: ScrollTrigger.Vars;
  tweenArr: Array<{
    init?: () => void;
    animation: gsap.core.Timeline;
    delay?: string | number;
  }>;
  stagger: number;

  constructor({ triggerInit, timeline, tweenArr, stagger = 0.1, scrollTrigger }: MasterTimeline) {
    this.timeline = timeline;
    this.triggerInit = triggerInit;
    this.scrollTrigger = scrollTrigger;
    this.tweenArr = tweenArr;
    this.stagger = stagger;
    this.setup();
  }

  setup(): void {
    gsap.timeline({
      scrollTrigger: {
        trigger: this.triggerInit,
        start: 'top bottom+=100vh',
        end: 'bottom top',
        once: true,
        scrub: false,
        onEnter: () => {
          this.tweenArr.forEach((item) => item.init?.());
        },
      },
    });

    if (!this.timeline) {
      this.timeline = gsap.timeline({
        scrollTrigger: {
          start: 'top top+=90%',
          end: '+=100%',
          scrub: false,
          once: true,
          ...this.scrollTrigger,
        },
      });
    }

    this.tweenArr.forEach((item) => this.timeline.add(item.animation, item.delay || `<=${this.stagger}` || '<=.1'));
  }
}

export {
  parseRem,
  xSetter,
  ySetter,
  xGetter,
  yGetter,
  lerp,
  TextSplit,
  MathMap,
  FadeSplitText,
  getScreenType,
  MasterTimeline,
};
