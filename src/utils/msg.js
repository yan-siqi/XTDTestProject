import Vue from "vue"
import {Message} from 'element-ui'

const defDuration = 2000;

/**
 * 错误信息提示
 * @param message
 * @param duration
 * @returns {*}
 */
export function errorMsg(message, duration) {
  return Message({
    message: message || '',
    type: 'error',
    duration: duration || defDuration
  })
}

/**
 * 成功信息提示
 * @param message
 * @param duration
 * @returns {*}
 */
export function successMsg(message, duration) {
  return Message({
    message: message || '',
    type: 'success',
    duration: duration || defDuration
  })
}

/**
 * 警告信息提示
 * @param message
 * @param duration
 * @returns {*}
 */
export function warningMsg(message, duration) {
  return Message({
    message: message || '',
    type: 'warning',
    duration: duration || defDuration
  })
}

/**
 * 提示信息提示
 * @param message
 * @param duration
 * @returns {*}
 */
export function infoMsg(message, duration) {
  return Message({
    message: message || '',
    type: 'info',
    duration: duration || defDuration
  })
}

/**
 * 异常信息错误提示
 * @param data  msg：错误信息；detail：错误详情
 * @param duration 显示时间
 * @returns {*}
 */
export function errorMsgDetail(data, duration) {
  const vm = new Vue()
  const h = vm.$createElement;
  return Message({
    type: 'status-error',
    duration: duration || defDuration,
    message: h('div', {
      style: {
        display: "block",
        width: "100%"
      }
    }, [
      h('button', {
        attrs: {
          id: "status-error-icon"
        },
        style: {
          position: "absolute",
          right: "10px",
          top: "8px",
          color: "#f56c6c"
        },
        on: {
          click: () => {
            clickHandler(data.detail)
          }
        }
      }, '详细信息'),
      h('i', {
        style: {
          color: "#f56c6c",
          marginRight: "6px"
        },
        attrs: {
          class: "el-icon-error"
        }
      }, ''),
      h('span', {style: 'color: #f56c6c'}, data.msg),
      h('div', {
        style: {display: "none"},
        attrs: {
          id: 'status-error-content'
        },
      }, [
        h('textarea', {
          attrs: {
            readonly: true,
            id: 'status-error-detail'
          },
          style: {
            margin: "10px 0",
            padding: '8px 10px',
            fontSize: '15px',
            height: "100px",
            overflowY: "auto",
            width: "100%",
            resize: "none",
            backgroundColor: "white"
          }
        }, ""),
        h('button', {
          style: {
            float: "right",
            padding: "0 2px"
          },
          on: {
            click: () => {
              copyDocument()
            }
          }
        }, "复制")
      ])
    ])
  });
}

//  显示||隐藏错误的详细信息
function clickHandler(msg) {
  if (document.getElementById('status-error-content').style.display === 'block') {
    document.getElementById('status-error-content').style.display = 'none';
  } else {
    document.getElementById('status-error-content').style.display = 'block';
  }

  document.getElementById('status-error-detail').innerHTML = msg
}

// 复制错误信息
function copyDocument() {
  var Url2 = document.getElementById("status-error-detail");
  Url2.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
}

