import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import * as THREE from 'three';

import {
  parseRem,
  xGetter,
  yGetter,
  xSetter,
  ySetter,
  lerp,
  TextSplit,
  FadeSplitText,
  getScreenType,
  MasterTimeline,
} from './utils';

declare global {
  interface Window {
    THREE: typeof THREE;
    gsap: typeof gsap;
    ScrollTrigger: typeof ScrollTrigger;
    SplitType: typeof SplitType;
    parseRem: typeof parseRem;
    xGetter: typeof xGetter;
    yGetter: typeof yGetter;
    xSetter: typeof xSetter;
    ySetter: typeof ySetter;
    lerp: typeof lerp;
    FadeSplitText: typeof FadeSplitText;
    MasterTimeline: typeof MasterTimeline;
    getScreenType: typeof getScreenType;
  }
}

// Assign to window object
(window as any).THREE = THREE;

(window as any).ScrollTrigger = ScrollTrigger;
(window as any).SplitType = SplitType;
(window as any).parseRem = parseRem;
(window as any).xGetter = xGetter;
(window as any).yGetter = yGetter;
(window as any).xSetter = xSetter;
(window as any).ySetter = ySetter;
(window as any).lerp = lerp;
(window as any).TextSplit = TextSplit;
(window as any).FadeSplitText = FadeSplitText;
(window as any).MasterTimeline = MasterTimeline;
(window as any).getScreenType = getScreenType;

gsap.registerPlugin(ScrollTrigger);
