import { qsAll } from '@core/utils';

/**
 * 监听目标类型
 */
type ObserverTarget = string | Element[] | Element;

export const resolveTargets = (target: ObserverTarget) => {
  if (typeof target === 'string') {
    return qsAll(target);
  }
  if (Array.isArray(target)) {
    return target;
  }
  return [target];
};

/**
 * 监听元素
 * @param targets 监听目标
 * @param config
 * @param callback 回调函数
 */
export const mutationObserve = (
  targets: Element[],
  config: MutationObserverInit,
  callback: MutationCallback
) => {
  const observer = new MutationObserver(callback);
  targets.forEach((it) => observer.observe(it, config));
  callback([], observer);
  return [observer, config] as const;
};

/**
 * 监听直接子元素
 * @param target 监听目标
 * @param callback 回调函数
 */
export const obsChildList = (target: ObserverTarget, callback: MutationCallback) =>
  mutationObserve(
    resolveTargets(target),
    {
      childList: true,
      subtree: false,
      attributes: false,
    },
    callback
  );

/**
 * 监听所有子孙元素
 * @param target 监听目标
 * @param callback 回调函数
 */
export const obsChildListSubtree = (target: ObserverTarget, callback: MutationCallback) =>
  mutationObserve(
    resolveTargets(target),
    {
      childList: true,
      subtree: true,
      attributes: false,
    },
    callback,
  )

/**
 * 监听自身的HTML属性变化
 * @param target 监听目标
 * @param callback 回调函数
 */
export const obsAttr = (target: ObserverTarget, callback: MutationCallback) =>
  mutationObserve(
    resolveTargets(target),
    {
      childList: false,
      subtree: false,
      attributes: true,
    },
    callback,
  )

/**
 * 监听自身及其子孙元素的HTML属性变化
 * @param target 监听目标
 * @param callback 回调函数
 */
export const obsSubtreeAttr = (target: ObserverTarget, callback: MutationCallback) =>
  mutationObserve(
    resolveTargets(target),
    {
      childList: false,
      subtree: true,
      attributes: true,
    },
    callback,
  )

/**
 * 监听自身的文本内容变化
 * @param target 监听目标
 * @param callback 回调函数
 */
export const obsCharData = (target: ObserverTarget, callback: MutationCallback) =>
  mutationObserve(
    resolveTargets(target),
    {
      childList: false,
      subtree: false,
      attributes: false,
      characterData: true,
    },
    callback,
  )

/**
 * 监听自身及其子孙元素的文本内容变化
 * @param target 监听目标
 * @param callback 回调函数
 */
export const obsCharDataSubtree = (target: ObserverTarget, callback: MutationCallback) =>
  mutationObserve(
    resolveTargets(target),
    {
      childList: false,
      subtree: true,
      attributes: false,
      characterData: true,
    },
    callback,
  )

/**
 * 监听指定目标上的所有变化, 包括自身及子孙元素的元素增减, 属性变化, 文本内容变化
 *
 * 若需要监听 `document.body` 上的, 请使用 allMutations
 * @param target 监听目标
 * @param callback 回调函数
 */
export const obsAll = (target: ObserverTarget, callback: MutationCallback) =>
  mutationObserve(
    resolveTargets(target),
    {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    },
    callback,
  )
