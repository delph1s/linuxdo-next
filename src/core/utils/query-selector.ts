export const qsFilter = (selector: string) => {
  return selector;
};

type DocumentQuerySelector = {
  /**
   * 同 `document.querySelector`
   * @param selector 选择器
   */
  (selector: string): Element | null;
  /**
   * 在指定元素上进行 `querySelector`
   * @param element selector 元素
   * @param scopedSelector 选择器
   */
  (element: Element, scopedSelector: string): Element | null;
};

export const qsOne: DocumentQuerySelector = (
  selectorOrElement: string | Element,
  scopedSelector?: string
) => {
  if (!scopedSelector) {
    return document.querySelector(qsFilter(selectorOrElement as string));
  }
  return (selectorOrElement as Element).querySelector(qsFilter(scopedSelector));
};

type DocumentQuerySelectorAll = {
  /**
   * 同 `document.querySelectorAll` (返回转换过的真数组)
   * @param selector 选择器
   */
  (selector: string): Element[];
  /**
   * 在指定元素上进行`querySelectorAll` (返回转换过的真数组)
   * @param element selector 元素
   * @param scopedSelector 选择器
   */
  (element: Element, scopedSelector: string): Element[];
};

export const qsAll: DocumentQuerySelectorAll = (
  selectorOrElement: Element | string,
  scopedSelector?: string
) => {
  if (!scopedSelector) {
    return Array.from(document.querySelectorAll(qsFilter(selectorOrElement as string)));
  }
  return Array.from((selectorOrElement as Element).querySelectorAll(qsFilter(scopedSelector)));
};
