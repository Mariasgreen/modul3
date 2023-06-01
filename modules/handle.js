import {renderHeadlines, renderSearchResults} from './render.js'
import {images, fetchData } from '/main.js'

let index = 0;

const handleImageError = (imageElement) => {
    imageElement.onerror = null;
  
    imageElement.src = images[index];
  
    index = (index + 1) % images.length;
  };
  
  
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value;
    const countrySelect = document.getElementById('countrySelect');
    const selectedCountry = countrySelect.value;
  
    if (searchQuery === '') {
      return;
    }
  
    try {
      const [searchResults, headlines] = await Promise.all([
        fetchData(`https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=8`),
        fetchData(`https://newsapi.org/v2/top-headlines?country=${selectedCountry}&pageSize=4`)
      ]);
  
      renderSearchResults(searchResults.articles);
      renderHeadlines(headlines.articles);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const loadHeadlines = async () => {
    try {
      const countrySelect = document.getElementById('countrySelect');
      const selectedCountry = countrySelect.value;
      const searchResultsContainer = document.getElementById('searchResultsContainer');
      const headlinesContainer = document.getElementById('headlinesContainer');
  
      searchResultsContainer.innerHTML = ''; 
      headlinesContainer.innerHTML = ''; 
  
      const headlines = await fetchData(
        `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&pageSize=8`
      );
      renderHeadlines(headlines.articles);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  export{handleFormSubmit,handleImageError,loadHeadlines}