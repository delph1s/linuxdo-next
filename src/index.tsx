import '@assets/scss/index.scss';

import styles from '@assets/scss/vars.module.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const appendLinuxDoNext = () => {
  const app = document.createElement('div');
  app.setAttribute('id', styles.pluginContainer);
  document.body.append(app);
  return app;
};

ReactDOM.createRoot(appendLinuxDoNext()).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // 目标容器的选择器
// const containerSelector = 'header.d-header div.contents div.panel ul';
//
// // 当页面加载完成后执行
// window.onload = () => {
//   const container = document.querySelector(containerSelector);
//
//   // 检查容器是否存在
//   if (container) {
//     // 监视容器内的变化
//     const observer = new MutationObserver((mutationsList, observer) => {
//       const topRightButtonList = document.querySelector(
//         '#ember5 > header > div > div > div.panel > ul'
//       );
//       if (topRightButtonList) {
//         // 执行所需的DOM操作
//         appendAndRender(topRightButtonList);
//         observer.disconnect(); // 停止观察
//       }
//     });
//
//     // 开始观察容器内的变化
//     observer.observe(container, { childList: true, subtree: true, attributes: false, characterData: false });
//   } else {
//     console.error('指定的容器不存在！');
//   }
// };
//
// const appendAndRender = (parentElement: Element) => {
//   const app = document.createElement('li');
//   app.setAttribute('class', 'header-dropdown-toggle');
//   parentElement.prepend(app);
//
//   ReactDOM.createRoot(app).render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// };
