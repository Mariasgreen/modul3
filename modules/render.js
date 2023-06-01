
import {handleImageError}  from './handle.js'



const renderHeadlines = (headlines) => {
    const headlinesContainer = document.getElementById('headlinesContainer');
    headlinesContainer.innerHTML = '';
  
    headlines.forEach((headline) => {
      const { title, url, description, publishedAt, author, urlToImage } = headline;
  
      const card = document.createElement('div');
      card.classList.add('card');
  
      const image = document.createElement('img');
      image.src = urlToImage;
      image.onerror = () => handleImageError(image);
      card.appendChild(image);
  
      const titleLink = document.createElement('a');
      titleLink.href = url;
      titleLink.target = '_blank';
      titleLink.textContent = title;
      card.appendChild(titleLink);
  
      const descriptionPara = document.createElement('p');
      descriptionPara.textContent = description;
      card.appendChild(descriptionPara);
  
      const publishedAtPara = document.createElement('p');
      publishedAtPara.textContent = `Published at: ${publishedAt}`;
      card.appendChild(publishedAtPara);
  
      const authorPara = document.createElement('p');
      authorPara.textContent = `Author: ${author}`;
      card.appendChild(authorPara);
  
      headlinesContainer.appendChild(card);
    });
  };
  

  const renderSearchResults = (results) => {
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    searchResultsContainer.innerHTML = '';
  
    results.forEach((result) => {
      const { title, url, description, publishedAt, author, urlToImage } = result;
  
      const card = document.createElement('div');
      card.classList.add('card');
  
      const image = document.createElement('img');
      image.src = urlToImage;
      card.appendChild(image);
  
      const titleLink = document.createElement('a');
      titleLink.href = url;
      titleLink.target = '_blank';
      titleLink.textContent = title;
      card.appendChild(titleLink);
  
      const descriptionPara = document.createElement('p');
      descriptionPara.textContent = description;
      card.appendChild(descriptionPara);
  
      const publishedAtPara = document.createElement('p');
      publishedAtPara.textContent = `Published at: ${publishedAt}`;
      card.appendChild(publishedAtPara);
  
      const authorPara = document.createElement('p');
      authorPara.textContent = `Author: ${author}`;
      card.appendChild(authorPara);
  
      searchResultsContainer.appendChild(card);
    });
  };

  export{renderHeadlines, renderSearchResults}