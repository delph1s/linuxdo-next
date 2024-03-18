import '@assets/scss/index.scss';

import styles from '@assets/scss/vars.module.scss';
import type { LeveltrustRequireData } from '@components/dialog/leveltrust-dialog';
// import { obsChildListSubtree } from '@core/observe';
import { qsAll, qsOne } from '@core/utils';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

if (window.location.hostname === 'linux.do') {
  const appendLinuxDoNext = () => {
    const app = document.createElement('div');
    app.setAttribute('id', styles.pluginContainer);
    document.body.append(app);
    return app;
  };

  ReactDOM.createRoot(appendLinuxDoNext()).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

if (window.location.hostname === 'connect.linux.do') {
  const tableTr = qsAll('table tr td');
  const tableData: string[] = [];
  tableTr.forEach(value => {
    tableData.push(value.textContent || '');
  });
  const tableDataClear: LeveltrustRequireData = {
    visitCount: tableData[1],
    visitCountRequire: tableData[2],
    repliedTopic: tableData[4],
    repliedTopicRequire: tableData[5],
    viewedTopic: tableData[7],
    viewedTopicRequire: tableData[8],
    viewedTopicAll: tableData[10],
    viewedTopicAllRequire: tableData[11],
    viewedPost: tableData[13],
    viewedPostRequire: tableData[14],
    viewedPostAll: tableData[16],
    viewedPostAllRequire: tableData[17],
    reportedPost: tableData[19],
    reportedPostRequire: tableData[20],
    reportedUser: tableData[22],
    reportedUserRequire: tableData[23],
    likes: tableData[25],
    likesRequire: tableData[26],
    liked: tableData[28],
    likedRequire: tableData[29],
    likedTopSingleDay: tableData[31],
    likedTopSingleDayRequire: tableData[32],
    likedUser: tableData[34],
    likedUserRequire: tableData[35],
    postBanned: tableData[37],
    postBannedRequire: tableData[38],
    allBannedUser: tableData[37],
    allBannedUserRequire: tableData[38],
  };
  window.parent.postMessage(tableDataClear, { targetOrigin: 'https://linux.do/' });
}

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
