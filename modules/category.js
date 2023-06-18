export const fetchCategories = async () => {
    const categoriesResponse = await fetch('http://localhost:3000/api/category', {
      method: 'GET'
    });
  
    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json();
      const categoryInput = document.getElementById('category');
      const datalist = document.createElement('datalist');
      datalist.id = 'category-list';
  
      categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        datalist.appendChild(option);
      });
  
      categoryInput.setAttribute('list', 'category-list');
      categoryInput.appendChild(datalist);
    }
  };
  

  