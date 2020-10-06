const theme = localStorage.getItem('theme') || 'light';
const primaryColor = localStorage.getItem('color') || 'default';

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
  if (primaryColor === 'default') {
    styleLink.href = '/theme/dark.css';
    body.className = 'body-wrap-dark';
  } else {
    styleLink.href = `/theme/dark-${primaryColor}.css`;
    body.className = `body-wrap-dark-${primaryColor}`;
  }
}
