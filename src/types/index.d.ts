import SplitType from 'split-type';

interface ScreenType {
  type: 'dsk' | 'tb' | 'mb';
  size: number;
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
}

interface DOMElement {
  el: HTMLElement;
}

interface AnimationOptions {
  delay?: number;
  allowMobile?: boolean;
  [key: string]: any;
}

interface TextSplitOptions extends AnimationOptions {
  el: HTMLElement;
  type?: string;
}

interface TextSplitDOM extends DOMElement {
  splitType: SplitType;
}

interface FadeSplitTextOptions extends AnimationOptions {
  el: HTMLElement;
  breakType?: string;
  isDisableRevert?: boolean;
}

interface RevealTextOptions extends AnimationOptions {
  el: HTMLElement;
  color: string;
  isDisableRevert?: boolean;
  isHighlight?: boolean;
  isFast?: boolean;
}

interface FadeInOptions extends AnimationOptions {
  el: HTMLElement;
  type?: 'bottom' | 'top' | 'left' | 'right' | 'default';
  isDisableRevert?: boolean;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

interface ScaleLineOptions extends AnimationOptions {
  el: HTMLElement;
  type?: 'top' | 'left' | 'right' | 'bottom' | 'default';
  isCenter?: boolean;
  isDisableRevert?: boolean;
}

interface ScaleInsetOptions extends AnimationOptions {
  el: HTMLElement;
  elInner?: HTMLElement;
  type?: string;
  options?: gsap.TweenVars;
}

interface MasterTimelineOptions {
  triggerInit: HTMLElement;
  timeline?: gsap.core.Timeline;
  tweenArr: Array<{
    init?: () => void;
    animation: gsap.core.Timeline;
    delay?: string | number;
  }>;
  stagger?: number;
  scrollTrigger?: ScrollTrigger.Vars;
}
