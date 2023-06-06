/* eslint-disable require-jsdoc */
const timer = document.querySelector('.timer');
const deadline = timer.dataset.timerDeadline;


const time = (line) => {
  const daysSpan = timer.querySelector('.timer__count_days');
  const daynameSpan = timer.querySelector('.timer__units_days');
  const hoursSpan = timer.querySelector('.timer__count_hours');
  const hournameSpan = timer.querySelector('.timer__units_hours');
  const minutesSpan = timer.querySelector('.timer__count_minutes');
  const minnameSpan = timer.querySelector('.timer__units_minutes');

  const getTimeRemaining = () => {
    const datestop = new Date(line);
    const total = datestop - Date.now();


    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor((total / 1000 / 60 / 60 / 24));


    return {
      total,
      minutes,
      hours,
      days,
    };
  };


  const start = () => {
    const t = getTimeRemaining();
    const timeInterval = setTimeout(start, 1000);

    daysSpan.textContent = formatTime(t.days);
    daynameSpan.textContent = formatDays(t.days);

    hoursSpan.textContent = formatTime(t.hours);
    minutesSpan.textContent = formatTime(t.minutes);

    hournameSpan.textContent = formatHours(t.hours);
    minnameSpan.textContent = formatMin(t.minutes);


    if (t.total <= 0) {
      clearTimeout(timeInterval);
      const herotimer = document.querySelector('.hero__timer');
      herotimer.remove();
    }


    function formatTime(time) {
      if (time < 10) {
        time = '0' + time;
      }
      return time;
    }

    function formatMin(min) {
      let sb = '';
      const minNew = min % 100;
      const lastFigure = minNew % 10;

      if (minNew > 10 && minNew < 20) {
        sb = 'минут';
      } else if (lastFigure === 1) {
        sb = 'минута';
      } else if (lastFigure > 1 && lastFigure < 5) {
        sb = 'минуты';
      } else {
        sb = 'минут';
      }

      return sb;
    }


    function formatHours(hour) {
      let sb = '';
      const hourNew = hour % 100;
      const lastFigure = hourNew % 10;

      if (hourNew > 10 && hourNew < 20) {
        sb = 'часов';
      } else if (lastFigure === 1) {
        sb = 'час';
      } else if (lastFigure > 1 && lastFigure < 5) {
        sb = 'часа';
      } else {
        sb = 'часов';
      }

      return sb;
    }


    function formatDays(day) {
      let sb = '';
      const dayNew = day % 100;
      const lastFigure = dayNew % 10;
      if (dayNew > 10 && dayNew < 20) {
        sb = 'дней';
      } else if (lastFigure === 1) {
        sb = 'день';
      } else if (lastFigure > 1 && lastFigure < 5) {
        sb = 'дня';
      } else {
        sb = 'дней';
      }
      return sb;
    }
  };


  start();
};


export default {
  deadline,
  time,
};
