/**
 * 简单的 requestAnimationFrame 节流函数
 */
const rafThrottle = <T extends (...args: unknown[]) => void>(callback: T): T => {
  let rafId: number | null = null;
  let lastArgs: unknown[] | null = null;

  const throttled = (...args: unknown[]) => {
    lastArgs = args;
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (lastArgs) {
          callback(...lastArgs);
        }
      });
    }
  };

  return throttled as T;
};

export interface AnimationOptions {
  duration: number;
  easing?: (t: number) => number;
  delay?: number;
  onStart?: () => void;
  onComplete?: () => void;
  onUpdate?: (progress: number) => void;
}

export interface AnimationController {
  start: () => void;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
  isRunning: () => boolean;
}

/**
 * 缓动函数集合
 */
export const easingFunctions = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
};

/**
 * 创建动画控制器
 */
export function createAnimation(startValue: number, endValue: number, options: AnimationOptions): AnimationController {
  const { duration, easing = easingFunctions.linear, delay = 0, onStart, onComplete, onUpdate } = options;

  let startTime: number | null = null;
  let pausedTime = 0;
  let rafId: number | null = null;
  let isRunningFlag = false;
  let isPaused = false;

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp + delay;

    if (timestamp < startTime) {
      rafId = requestAnimationFrame(animate);
      return;
    }

    if (isPaused) {
      pausedTime = timestamp - startTime;
      rafId = requestAnimationFrame(animate);
      return;
    }

    const elapsed = timestamp - startTime - pausedTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    const currentValue = startValue + (endValue - startValue) * easedProgress;

    onUpdate?.(currentValue);

    if (progress < 1) {
      rafId = requestAnimationFrame(animate);
    } else {
      onComplete?.();
      isRunningFlag = false;
    }
  };

  const start = () => {
    if (isRunningFlag) return;

    isRunningFlag = true;
    isPaused = false;
    startTime = null;
    pausedTime = 0;

    onStart?.();
    rafId = requestAnimationFrame(animate);
  };

  const pause = () => {
    if (!isRunningFlag || isPaused) return;
    isPaused = true;
  };

  const resume = () => {
    if (!isRunningFlag || !isPaused) return;
    isPaused = false;
  };

  const cancel = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    isRunningFlag = false;
    isPaused = false;
    startTime = null;
    pausedTime = 0;
  };

  const isRunning = () => isRunningFlag && !isPaused;

  return {
    start,
    pause,
    resume,
    cancel,
    isRunning,
  };
}

/**
 * 创建优化的进度动画
 */
export function createProgressAnimation(
  startPercent: number,
  endPercent: number,
  onUpdate: (percent: number) => void,
  options: Partial<Omit<AnimationOptions, 'onUpdate'>> = {},
): AnimationController {
  const clampedStart = Math.max(0, Math.min(100, startPercent));
  const clampedEnd = Math.max(0, Math.min(100, endPercent));

  return createAnimation(clampedStart, clampedEnd, {
    duration: options.duration || 300,
    easing: options.easing || easingFunctions.linear,
    delay: options.delay || 0,
    onStart: options.onStart,
    onComplete: options.onComplete,
    onUpdate: (value) => onUpdate(Math.round(value * 100) / 100),
  });
}

/**
 * 节流化的动画更新函数
 */
export const throttledAnimationUpdate = (callback: () => void) => {
  const fn = rafThrottle(callback);
  fn();
};

/**
 * 批量动画管理器
 */
export class AnimationBatchManager {
  private animations: Map<string, AnimationController> = new Map();
  private onUpdateCallbacks: Set<() => void> = new Set();

  addAnimation(id: string, animation: AnimationController): void {
    this.animations.set(id, animation);
  }

  removeAnimation(id: string): void {
    const animation = this.animations.get(id);
    if (animation) {
      animation.cancel();
      this.animations.delete(id);
    }
  }

  pauseAll(): void {
    this.animations.forEach((animation) => animation.pause());
  }

  resumeAll(): void {
    this.animations.forEach((animation) => animation.resume());
  }

  cancelAll(): void {
    this.animations.forEach((animation) => animation.cancel());
    this.animations.clear();
  }

  addUpdateCallback(callback: () => void): void {
    this.onUpdateCallbacks.add(callback);
  }

  removeUpdateCallback(callback: () => void): void {
    this.onUpdateCallbacks.delete(callback);
  }

  triggerUpdate(): void {
    this.onUpdateCallbacks.forEach((callback) => callback());
  }
}

export const animationBatchManager = new AnimationBatchManager();
