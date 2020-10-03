import { getCookie } from '@/utils/utils';

const theme = getCookie('_theme');
const primaryColor = getCookie('_color');

let styleLink: HTMLElement | null = document.getElementById('theme-style');
let body = document.getElementsByTagName('body')[0];

if (!styleLink) {
  styleLink = document.createElement('link');
  styleLink.type = 'text/css';
  styleLink.rel = 'stylesheet';
  styleLink.id = 'theme-style';

  if (document.body.append) {
    document.body.append(styleLink);
  } else {
    document.body.appendChild(styleLink);
  }
}

if (theme === 'light') {
  if (primaryColor === 'default') {
    styleLink.href = '';
    body.className = 'body-wrap-default';
  } else {
    styleLink.href = `/theme/${primaryColor}.css`;
    body.className = `body-wrap-${primaryColor}`;
  }
} else {
  styleLink.href = '';
  body.className = 'body-wrap-default';
}
