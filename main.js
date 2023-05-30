

const apiKey = '610762ad26a24ab79a9ab01cbbf8f7a2';


 const fetchData = async (url) =>{
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
}


const images = [
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
  ];


  let index = 0;

  const handleImageError = (imageElement) =>  {
    imageElement.onerror = null;
  
    imageElement.src = images[index];
  
    
    index = (index + 1) % images.length;
  }

  /*
function handleImageError(imageElement) {
    imageElement.onerror = null; 
    const randomIndex = Math.floor(Math.random() * images.length);
    imageElement.src = images[randomIndex];
  }*/

  
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
}

const renderSearchResults = (results) =>{
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
}


  const handleFormSubmit = async(event)=> {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();

    if (searchQuery === '') {
        return;
    }

    try {
      
        const [searchResults, headlines] = await Promise.all([
            fetchData(`https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=8`),
            fetchData('https://newsapi.org/v2/top-headlines?country=ru&pageSize=4')
        ]);

        renderSearchResults(searchResults.articles);
        renderHeadlines(headlines.articles);
    } catch (error) {
        console.error('Error:', error);
    }
}


const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', handleFormSubmit);

const loadHeadlines = async()=> {
    try {
        const headlines = await fetchData('https://newsapi.org/v2/top-headlines?country=ru&pageSize=8');
        renderHeadlines(headlines.articles);
    } catch (error) {
        console.error('Error:', error);
    }
}

loadHeadlines();