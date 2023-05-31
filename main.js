import {handleFormSubmit,loadHeadlines}  from './modules/handle.js'


const apiKey = '610762ad26a24ab79a9ab01cbbf8f7a2';

const fetchData = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': apiKey
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const images = [
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg'
];





const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', handleFormSubmit);


const countrySelect = document.getElementById('countrySelect');
countrySelect.addEventListener('change', loadHeadlines);

loadHeadlines();


export{ apiKey, images, fetchData, searchForm, countrySelect }