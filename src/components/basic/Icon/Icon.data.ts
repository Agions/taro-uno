/**
 * Icon Data Configuration
 * Professional icon sets for the Icon component
 */

import type { IconSet } from './Icon.types';

/**
 * 基础UI图标 - 轮廓风格
 */
export const basicOutlinedIcons: IconSet[] = [
  {
    name: 'add',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'basic',
    tags: ['add', 'plus', 'new'],
  },
  {
    name: 'edit',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'basic',
    tags: ['edit', 'update', 'modify'],
  },
  {
    name: 'delete',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'basic',
    tags: ['delete', 'remove', 'trash'],
  },
  {
    name: 'search',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'basic',
    tags: ['search', 'find', 'lookup'],
  },
  {
    name: 'close',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'basic',
    tags: ['close', 'cancel', 'exit'],
  },
  {
    name: 'check',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'basic',
    tags: ['check', 'success', 'confirm'],
  },
  {
    name: 'info',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'basic',
    tags: ['info', 'information', 'details'],
  },
  {
    name: 'warning',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'basic',
    tags: ['warning', 'alert', 'caution'],
  },
  {
    name: 'error',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'basic',
    tags: ['error', 'fail', 'danger'],
  },
  {
    name: 'refresh',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'basic',
    tags: ['refresh', 'reload', 'update'],
  },
];

/**
 * 基础UI图标 - 填充风格
 */
export const basicFilledIcons: IconSet[] = [
  {
    name: 'add',
    data: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 11H13V5c0-.55-.45-1-1-1s-1 .45-1 1v6H5c-.55 0-1 .45-1 1s.45 1 1 1h6v6c0 .55.45 1 1 1s1-.45 1-1v-6h6c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg>',
    type: 'svg',
    theme: 'filled',
    category: 'basic',
    tags: ['add', 'plus', 'new'],
  },
  {
    name: 'edit',
    data: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>',
    type: 'svg',
    theme: 'filled',
    category: 'basic',
    tags: ['edit', 'update', 'modify'],
  },
  {
    name: 'delete',
    data: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>',
    type: 'svg',
    theme: 'filled',
    category: 'basic',
    tags: ['delete', 'remove', 'trash'],
  },
  {
    name: 'search',
    data: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>',
    type: 'svg',
    theme: 'filled',
    category: 'basic',
    tags: ['search', 'find', 'lookup'],
  },
  {
    name: 'close',
    data: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>',
    type: 'svg',
    theme: 'filled',
    category: 'basic',
    tags: ['close', 'cancel', 'exit'],
  },
  {
    name: 'check',
    data: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>',
    type: 'svg',
    theme: 'filled',
    category: 'basic',
    tags: ['check', 'success', 'confirm'],
  },
  {
    name: 'info',
    data: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>',
    type: 'svg',
    theme: 'filled',
    category: 'basic',
    tags: ['info', 'information', 'details'],
  },
  {
    name: 'warning',
    data: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>',
    type: 'svg',
    theme: 'filled',
    category: 'basic',
    tags: ['warning', 'alert', 'caution'],
  },
  {
    name: 'error',
    data: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>',
    type: 'svg',
    theme: 'filled',
    category: 'basic',
    tags: ['error', 'fail', 'danger'],
  },
  {
    name: 'refresh',
    data: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></svg>',
    type: 'svg',
    theme: 'filled',
    category: 'basic',
    tags: ['refresh', 'reload', 'update'],
  },
];

/**
 * 导航图标 - 轮廓风格
 */
export const navigationOutlinedIcons: IconSet[] = [
  {
    name: 'home',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'navigation',
    tags: ['home', 'house', 'main'],
  },
  {
    name: 'back',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'navigation',
    tags: ['back', 'return', 'previous'],
  },
  {
    name: 'forward',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'navigation',
    tags: ['forward', 'next', 'continue'],
  },
  {
    name: 'menu',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'navigation',
    tags: ['menu', 'list', 'hamburger'],
  },
  {
    name: 'menu-fold',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'navigation',
    tags: ['menu-fold', 'collapse', 'close'],
  },
  {
    name: 'menu-unfold',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'navigation',
    tags: ['menu-unfold', 'expand', 'open'],
  },
  {
    name: 'up',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'navigation',
    tags: ['up', 'arrow-up', 'top'],
  },
  {
    name: 'down',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="5 12 12 19 19 12"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'navigation',
    tags: ['down', 'arrow-down', 'bottom'],
  },
  {
    name: 'left',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'navigation',
    tags: ['left', 'arrow-left', 'backward'],
  },
  {
    name: 'right',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'navigation',
    tags: ['right', 'arrow-right', 'forward'],
  },
];

/**
 * 操作图标 - 轮廓风格
 */
export const actionOutlinedIcons: IconSet[] = [
  {
    name: 'download',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'action',
    tags: ['download', 'save', 'get'],
  },
  {
    name: 'upload',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'action',
    tags: ['upload', 'send', 'put'],
  },
  {
    name: 'share',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'action',
    tags: ['share', 'distribute', 'spread'],
  },
  {
    name: 'copy',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'action',
    tags: ['copy', 'duplicate', 'clone'],
  },
  {
    name: 'cut',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 3H5a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path><polyline points="16 21 12 17 8 21"></polyline><polyline points="12 17 12 3"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'action',
    tags: ['cut', 'trim', 'remove'],
  },
  {
    name: 'paste',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'action',
    tags: ['paste', 'insert', 'put'],
  },
  {
    name: 'print',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'action',
    tags: ['print', 'output', 'hardcopy'],
  },
  {
    name: 'save',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'action',
    tags: ['save', 'store', 'keep'],
  },
  {
    name: 'undo',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'action',
    tags: ['undo', 'revert', 'back'],
  },
  {
    name: 'redo',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 4 20 9 15 14"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path></svg>',
    type: 'svg',
    theme: 'outlined',
    category: 'action',
    tags: ['redo', 'repeat', 'forward'],
  },
];

/**
 * 状态图标 - 彩色风格
 */
export const statusColoredIcons: IconSet[] = [
  {
    name: 'success',
    data: '<svg viewBox="0 0 24 24" fill="#52c41a"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'status',
    tags: ['success', 'check', 'confirm'],
  },
  {
    name: 'error',
    data: '<svg viewBox="0 0 24 24" fill="#ff4d4f"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'status',
    tags: ['error', 'fail', 'danger'],
  },
  {
    name: 'warning',
    data: '<svg viewBox="0 0 24 24" fill="#faad14"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'status',
    tags: ['warning', 'alert', 'caution'],
  },
  {
    name: 'info',
    data: '<svg viewBox="0 0 24 24" fill="#1890ff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'status',
    tags: ['info', 'information', 'details'],
  },
  {
    name: 'loading',
    data: '<svg viewBox="0 0 24 24" fill="#1890ff"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4"></circle><path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'status',
    tags: ['loading', 'spinner', 'processing'],
  },
  {
    name: 'online',
    data: '<svg viewBox="0 0 24 24" fill="#52c41a"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'status',
    tags: ['online', 'connected', 'active'],
  },
  {
    name: 'offline',
    data: '<svg viewBox="0 0 24 24" fill="#ff4d4f"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.95 14.95L10 12l6.95-6.95L18 5.05 11.05 12 18 18.95 18.95z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'status',
    tags: ['offline', 'disconnected', 'inactive'],
  },
  {
    name: 'idle',
    data: '<svg viewBox="0 0 24 24" fill="#faad14"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'status',
    tags: ['idle', 'waiting', 'standby'],
  },
];

/**
 * 社交图标 - 彩色风格
 */
export const socialColoredIcons: IconSet[] = [
  {
    name: 'wechat',
    data: '<svg viewBox="0 0 24 24" fill="#07C160"><path d="M20.5 3H3.5C2.67 3 2 3.67 2 4.5v15c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zM8.5 18c-1.93 0-3.5-1.57-3.5-3.5S6.57 11 8.5 11s3.5 1.57 3.5 3.5S10.43 18 8.5 18zm7 0c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm1-7H7c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'social',
    tags: ['wechat', 'wx', 'messenger'],
  },
  {
    name: 'weibo',
    data: '<svg viewBox="0 0 24 24" fill="#E6162D"><path d="M18.84 8.25c-.51 0-.99.21-1.36.57-.37.36-.58.85-.58 1.36 0 1.05 1.1 1.9 2.44 1.9h.02c.51 0 .99-.21 1.36-.57.36-.36.57-.85.57-1.36 0-1.05-1.1-1.9-2.45-1.9zm-3.28 1.61c-.55.45-1.25.73-2.01.73-.76 0-1.46-.28-2.01-.73-.55-.45-.86-1.1-1.02-1.8-.16-.7-.15-1.45.03-2.15.2-.78.67-1.5 1.36-2.01.69-.51 1.55-.82 2.48-.82.93 0 1.79.31 2.48.82.69.51 1.16 1.23 1.36 2.01.18.7.19 1.45.03 2.15-.16.7-.47 1.35-1.02 1.8zM12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.23 14.03c-.5.66-1.22 1.18-2.07 1.52.21-.38.34-.81.34-1.27 0-.96-.78-1.74-1.74-1.74-.96 0-1.74.78-1.74 1.74 0 .46.13.89.34 1.27-.85-.34-1.57-.86-2.07-1.52-1.08.38-2.07 1.31-2.66 2.48-.19.41-.3 1.14-.3 1.52h16c0-.38-.11-1.11-.3-1.52-.59-1.17-1.58-2.1-2.67-2.48z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'social',
    tags: ['weibo', 'microblog', 'social'],
  },
  {
    name: 'qq',
    data: '<svg viewBox="0 0 24 24" fill="#12B7F5"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm4.5 17.5c-.3 0-.6-.05-.9-.15-.3-.1-.6-.25-.8-.45-.2-.2-.35-.5-.45-.8-.1-.3-.15-.6-.15-.9 0-.3.05-.6.15-.9.1-.3.25-.6.45-.8.2-.2.5-.35.8-.45.3-.1.6-.15.9-.15.3 0 .6.05.9.15.3.1.6.25.8.45.2.2.35.5.45.8.1.3.15.6.15.9 0 .3-.05.6-.15.9-.1.3-.25.6-.45.8-.2.2-.5.35-.8.45-.3.1-.6.15-.9.15-.3 0-.6-.05-.9-.15-.3-.1-.6-.25-.8-.45-.2-.2-.35-.5-.45-.8-.1-.3-.15-.6-.15-.9 0-.3.05-.6.15-.9.1-.3.25-.6.45-.8.2-.2.5-.35.8-.45.3-.1.6-.15.9-.15.3 0 .6.05.9.15.3.1.6.25.8.45.2.2.35.5.45.8.1.3.15.6.15.9 0 .3-.05.6-.15.9-.1.3-.25.6-.45.8-.2.2-.5.35-.8.45-.3.1-.6.15-.9.15z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'social',
    tags: ['qq', 'social', 'instant-messaging'],
  },
  {
    name: 'github',
    data: '<svg viewBox="0 0 24 24" fill="#181717"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'social',
    tags: ['github', 'code', 'repository'],
  },
  {
    name: 'twitter',
    data: '<svg viewBox="0 0 24 24" fill="#1DA1F2"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'social',
    tags: ['twitter', 'x', 'social'],
  },
  {
    name: 'instagram',
    data: '<svg viewBox="0 0 24 24" fill="#E4405F"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>',
    type: 'svg',
    theme: 'colored',
    category: 'social',
    tags: ['instagram', 'social', 'photo'],
  },
];
