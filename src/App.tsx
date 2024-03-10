import React, { useEffect, useState } from 'react';
import styles from '@assets/scss/vars.module.scss';

function ActiveButton() {
  return (<li className="header-dropdown-toggle">测试</li>);
}

function Modal(props: { setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="modal-container">
      <div
        id="ember628"
        className="ember-view modal d-modal create-invite-modal"
        data-keyboard="false"
        aria-modal="true"
        role="dialog"
        aria-labelledby="discourse-modal-title"
      >
        <div className="d-modal__container">
          <div className="d-modal__header">
            <div className="d-modal__title">
              <h3 id="discourse-modal-title" className="d-modal__title-text">
                创建邀请
              </h3>
            </div>

            <button
              className="btn no-text btn-icon btn-transparent modal-close"
              title="关闭"
              type="button"
              onClick={() => props.setModalVisible(false)}
            >
              <svg
                className="fa d-icon d-icon-times svg-icon svg-string"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#times" />
              </svg>
            </button>
          </div>

          <div className="d-modal__body" tabIndex={-1}>
            <form>
              <div className="input-group input-email">
                <label htmlFor="invite-email">
                  <svg
                    className="fa d-icon d-icon-envelope svg-icon svg-string"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#envelope" />
                  </svg>
                  限制为
                </label>
                <div className="invite-email-container">
                  <input
                    id="invite-email"
                    className="ember-text-field ember-view"
                    placeholder="name@example.com 或者 example.com"
                    type="text"
                  />
                </div>
              </div>

              <div className="input-group invite-max-redemptions">
                <label htmlFor="invite-max-redemptions">
                  <svg
                    className="fa d-icon d-icon-users svg-icon svg-string"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#users"/>
                  </svg>
                  最大使用次数
                </label>
                <input
                  id="invite-max-redemptions"
                  className="ember-text-field ember-view"
                  min="1"
                  max="10"
                  type="number"
                />
              </div>

              <div className="input-group input-expires-at">
                <label>
                  <svg
                    className="fa d-icon d-icon-far-clock svg-icon svg-string"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#far-clock"/>
                  </svg>
                  于 3 天过期
                </label>
              </div>
            </form>
          </div>

          <div className="d-modal__footer">
            <button className="btn btn-icon-text btn-primary save-invite" type="button">
              <svg
                className="fa d-icon d-icon-link svg-icon svg-string"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#link"/>
              </svg>
              <span className="d-button-label">保存邀请</span>
            </button>

            <button
              className="btn btn-icon-text btn-primary send-invite"
              disabled={false}
              title="限制只允许电子邮件邀请并发送邀请电子邮件"
              type="button"
            >
              <svg
                className="fa d-icon d-icon-envelope svg-icon svg-string"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#envelope"/>
              </svg>
              <span className="d-button-label">保存并发送电子邮件</span>
            </button>
          </div>
        </div>
      </div>
      <div className="d-modal__backdrop"/>
    </div>
  );
}

function App() {
  const [logModalVisible, setLogModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const containerSelector = 'header.d-header div.contents div.panel ul';
    const container = document.querySelector(containerSelector);
    const activeButton = document.createElement('li');
    // container.append(<ActiveButton />);
  }, []);

  return (
    <div className={styles.functionButton}>
      <button
        className="btn btn-default create reply-to-post no-text btn-icon"
        title="开始进行自动点赞"
        type="button"
        onClick={() => setLogModalVisible(true)}
      >
        <svg
          className="fa d-icon d-icon-paper-plane svg-icon prefix-icon svg-string"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use href="#paper-plane"/>
        </svg>
      </button>
      {logModalVisible && <Modal setModalVisible={setLogModalVisible} />}
    </div>
  );
}

export default App;

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
