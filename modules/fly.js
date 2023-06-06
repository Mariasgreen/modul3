/* eslint-disable max-len */


const fly = document.createElement('div');

fly.style.cssText = `
    position: fixed;
    width:50px;
    height:50px;
    right: 0;
    bottom: 0;
    pointer-events:none;
    background: url('./img/airplane.svg') center/contain no-repeat
    `;


const calcPos = () => {
  const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const perScroll = (window.pageYOffset * 100) / maxScroll;
  const topUp = document.documentElement.clientHeight - fly.clientHeight;


  const up = topUp * (-perScroll / 100);
  fly.style.transform = `translateY(${up}px)`;
};

window.addEventListener('scroll', calcPos);

calcPos();


window.onresize = start;
function start() {
  const width = document.documentElement.clientWidth;
  if (width < 600) {
    fly.remove();
  } else {
    document.body.append(fly);
  }
}
