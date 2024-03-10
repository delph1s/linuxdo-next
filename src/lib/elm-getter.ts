// 异步获取元素的脚本库 ElementGetter, https://bbs.tampermonkey.net.cn/thread-2726-1-1.html

// const elmGetter = (() => {
//   const win = window.unsafeWindow || document.defaultView || window;
//   const doc = win.document;
//   const listeners = new WeakMap();
//   let mode = 'css';
//   let $: JQueryStatic | undefined;
//   const elProto = win.Element.prototype;
//   const matches = elProto.matches || elProto.matchesSelector || elProto.webkitMatchesSelector || elProto.mozMatchesSelector || elProto.oMatchesSelector;
//   const MutationObs = win.MutationObserver || win.WebkitMutationObserver || win.MozMutationObserver;
//
//   const addObserver = (target, callback) => {
//     const observer = new MutationObs(mutations => {
//       for (const mutation of mutations) {
//         if (mutation.type === 'attributes') {
//           callback(mutation.target);
//           if (observer.canceled) return;
//         }
//         for (const node of mutation.addedNodes) {
//           if (node instanceof Element) callback(node);
//           if (observer.canceled) return;
//         }
//       }
//     });
//     observer.canceled = false;
//     observer.observe(target, {childList: true, subtree: true, attributes: true});
//     return () => {
//       observer.canceled = true;
//       observer.disconnect();
//     };
//   };
//
//   const addFilter = (target, filter) => {
//     let listener = listeners.get(target);
//     if (!listener) {
//       listener = {
//         filters: new Set(),
//         remove: addObserver(target, el => listener.filters.forEach(f => f(el)))
//       };
//       listeners.set(target, listener);
//     }
//     listener.filters.add(filter);
//   };
//
//   const removeFilter = (target, filter) => {
//     const listener = listeners.get(target);
//     if (!listener) return;
//     listener.filters.delete(filter);
//     if (!listener.filters.size) {
//       listener.remove();
//       listeners.delete(target);
//     }
//   };
//
//   const query = (all, selector, parent, includeParent, curMode = mode) => {
//     switch (curMode) {
//       case 'css':
//         const checkParent = includeParent && matches.call(parent, selector);
//         return all
//           ? [...(checkParent ? [parent] : []), ...parent.querySelectorAll(selector)]
//           : checkParent ? parent : parent.querySelector(selector);
//       case 'jquery':
//         let jNodes = $(includeParent ? parent : []);
//         jNodes = jNodes.add([...parent.querySelectorAll('*')]).filter(selector);
//         return all ? $.map(jNodes, el => $(el)) : jNodes.length ? $(jNodes[0]) : null;
//       case 'xpath':
//         const ownerDoc = parent.ownerDocument || parent;
//         selector += '/self::*';
//         if (all) {
//           const xPathResult = ownerDoc.evaluate(selector, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//           return Array.from({length: xPathResult.snapshotLength}, (_, i) => xPathResult.snapshotItem(i));
//         }
//         return ownerDoc.evaluate(selector, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//     }
//   };
//
//   const isJquery = jq => jq && jq.fn && typeof jq.fn.jquery === 'string';
//
//   const getOne = (selector, parent, timeout) => {
//     return new Promise(resolve => {
//       const node = query(false, selector, parent, false);
//       if (node) return resolve(node);
//       const filter = el => {
//         const node = query(false, selector, el, true);
//         if (node) {
//           removeFilter(parent, filter);
//           clearTimeout(timer);
//           resolve(node);
//         }
//       };
//       addFilter(parent, filter);
//       const timer = timeout > 0 ? setTimeout(() => {
//         removeFilter(parent, filter);
//         resolve(null);
//       }, timeout) : null;
//     });
//   };
//
//   return {
//     get currentSelector() {
//       return mode;
//     },
//     get(selector, ...args) {
//       let [parent = doc, timeout = 0] = args;
//       if (mode === 'jquery' && parent instanceof $) parent = parent[0];
//       return Array.isArray(selector)
//         ? Promise.all(selector.map(s => getOne(s, parent, timeout)))
//         : getOne(selector, parent, timeout);
//     },
//     each(selector, ...args) {
//       let [parent = doc, callback] = args;
//       if (mode === 'jquery' && parent instanceof $) parent = parent[0];
//       const refs = new WeakSet();
//       const nodes = query(true, selector, parent, false);
//       nodes.forEach(node => {
//         const el = mode === 'jquery' ? node[0] : node;
//         if (refs.has(el)) return;
//         refs.add(el);
//         if (callback(node, false) === false) return;
//       });
//       const filter = el => {
//         query(true, selector, el, true).forEach(node => {
//           const _el = mode === 'jquery' ? node[0] : node;
//           if (refs.has(_el)) return;
//           refs.add(_el);
//           if (callback(node, true) === false) {
//             removeFilter(parent, filter);
//           }
//         });
//       };
//       addFilter(parent, filter);
//     },
//     create(domString, ...args) {
//       const [returnList = false, parent] = args;
//       const template = doc.createElement('template');
//       template.innerHTML = domString;
//       const node = template.content.firstElementChild;
//       if (!node) return null;
//       parent ? parent.appendChild(node) : node.remove();
//       return returnList ? Array.from(node.querySelectorAll('[id]')).reduce((acc, el) => {
//         acc[el.id] = el;
//         return acc;
//       }, {0: node}) : node;
//     },
//     selector(desc) {
//       if (isJquery(desc)) {
//         $ = desc;
//         mode = 'jquery';
//       } else if (!desc || typeof desc.toLowerCase !== 'function') {
//         mode = 'css';
//       } else if (desc.toLowerCase() === 'jquery') {
//         $ = [window.jQuery, window.$, win.jQuery, win.$].find(isJquery);
//         mode = $ ? 'jquery' : 'css';
//       } else if (desc.toLowerCase() === 'xpath') {
//         mode = 'xpath';
//       } else {
//         mode = 'css';
//       }
//     }
//   };
// })();
//
//
// var elmGetterOld = function() {
//   const win = window.unsafeWindow || document.defaultView || window;
//   const doc = win.document;
//   const listeners = new WeakMap();
//   let mode = 'css';
//   let $;
//   const elProto = win.Element.prototype;
//   const matches = elProto.matches ||
//     elProto.matchesSelector ||
//     elProto.webkitMatchesSelector ||
//     elProto.mozMatchesSelector ||
//     elProto.oMatchesSelector;
//   const MutationObs = win.MutationObserver ||
//     win.WebkitMutationObserver ||
//     win.MozMutationObserver;
//   function addObserver(target, callback) {
//     const observer = new MutationObs(mutations => {
//       for (const mutation of mutations) {
//         if (mutation.type === 'attributes') {
//           callback(mutation.target);
//           if (observer.canceled) return;
//         }
//         for (const node of mutation.addedNodes) {
//           if (node instanceof Element) callback(node);
//           if (observer.canceled) return;
//         }
//       }
//     });
//     observer.canceled = false;
//     observer.observe(target, {childList: true, subtree: true, attributes: true});
//     return () => {
//       observer.canceled = true;
//       observer.disconnect();
//     };
//   }
//   function addFilter(target, filter) {
//     let listener = listeners.get(target);
//     if (!listener) {
//       listener = {
//         filters: new Set(),
//         remove: addObserver(target, el => listener.filters.forEach(f => f(el)))
//       };
//       listeners.set(target, listener);
//     }
//     listener.filters.add(filter);
//   }
//   function removeFilter(target, filter) {
//     const listener = listeners.get(target);
//     if (!listener) return;
//     listener.filters.delete(filter);
//     if (!listener.filters.size) {
//       listener.remove();
//       listeners.delete(target);
//     }
//   }
//   function query(all, selector, parent, includeParent, curMode) {
//     switch (curMode) {
//       case 'css':
//         const checkParent = includeParent && matches.call(parent, selector);
//         if (all) {
//           const queryAll = parent.querySelectorAll(selector);
//           return checkParent ? [parent, ...queryAll] : [...queryAll];
//         }
//         return checkParent ? parent : parent.querySelector(selector);
//       case 'jquery':
//         let jNodes = $(includeParent ? parent : []);
//         jNodes = jNodes.add([...parent.querySelectorAll('*')]).filter(selector);
//         if (all) return $.map(jNodes, el => $(el));
//         return jNodes.length ? $(jNodes.get(0)) : null;
//       case 'xpath':
//         const ownerDoc = parent.ownerDocument || parent;
//         selector += '/self::*';
//         if (all) {
//           const xPathResult = ownerDoc.evaluate(selector, parent, null, 7, null);
//           const result = [];
//           for (let i = 0; i < xPathResult.snapshotLength; i++) {
//             result.push(xPathResult.snapshotItem(i));
//           }
//           return result;
//         }
//         return ownerDoc.evaluate(selector, parent, null, 9, null).singleNodeValue;
//     }
//   }
//   function isJquery(jq) {
//     return jq && jq.fn && typeof jq.fn.jquery === 'string';
//   }
//   function getOne(selector, parent, timeout) {
//     const curMode = mode;
//     return new Promise(resolve => {
//       const node = query(false, selector, parent, false, curMode);
//       if (node) return resolve(node);
//       let timer;
//       const filter = el => {
//         const node = query(false, selector, el, true, curMode);
//         if (node) {
//           removeFilter(parent, filter);
//           timer && clearTimeout(timer);
//           resolve(node);
//         }
//       };
//       addFilter(parent, filter);
//       if (timeout > 0) {
//         timer = setTimeout(() => {
//           removeFilter(parent, filter);
//           resolve(null);
//         }, timeout);
//       }
//     });
//   }
//   return {
//     get currentSelector() {
//       return mode;
//     },
//     get(selector, ...args) {
//       let parent = typeof args[0] !== 'number' && args.shift() || doc;
//       if (mode === 'jquery' && parent instanceof $) parent = parent.get(0);
//       const timeout = args[0] || 0;
//       if (Array.isArray(selector)) {
//         return Promise.all(selector.map(s => getOne(s, parent, timeout)));
//       }
//       return getOne(selector, parent, timeout);
//     },
//     each(selector, ...args) {
//       let parent = typeof args[0] !== 'function' && args.shift() || doc;
//       if (mode === 'jquery' && parent instanceof $) parent = parent.get(0);
//       const callback = args[0];
//       const curMode = mode;
//       const refs = new WeakSet();
//       for (const node of query(true, selector, parent, false, curMode)) {
//         refs.add(curMode === 'jquery' ? node.get(0) : node);
//         if (callback(node, false) === false) return;
//       }
//       const filter = el => {
//         for (const node of query(true, selector, el, true, curMode)) {
//           const _el = curMode === 'jquery' ? node.get(0) : node;
//           if (refs.has(_el)) break;
//           refs.add(_el);
//           if (callback(node, true) === false) {
//             return removeFilter(parent, filter);
//           }
//         }
//       };
//       addFilter(parent, filter);
//     },
//     create(domString, ...args) {
//       const returnList = typeof args[0] === 'boolean' && args.shift();
//       const parent = args[0];
//       const template = doc.createElement('template');
//       template.innerHTML = domString;
//       const node = template.content.firstElementChild;
//       if (!node) return null;
//       parent ? parent.appendChild(node) : node.remove();
//       if (returnList) {
//         const list = {};
//         node.querySelectorAll('[id]').forEach(el => list[el.id] = el);
//         list[0] = node;
//         return list;
//       }
//       return node;
//     },
//     selector(desc) {
//       switch (true) {
//         case isJquery(desc):
//           $ = desc;
//           return mode = 'jquery';
//         case !desc || typeof desc.toLowerCase !== 'function':
//           return mode = 'css';
//         case desc.toLowerCase() === 'jquery':
//           for (const jq of [window.jQuery, window.$, win.jQuery, win.$]) {
//             if (isJquery(jq)) {
//               $ = jq;
//               break;
//             };
//           }
//           return mode = $ ? 'jquery' : 'css';
//         case desc.toLowerCase() === 'xpath':
//           return mode = 'xpath';
//         default:
//           return mode = 'css';
//       }
//     }
//   };
// }();
