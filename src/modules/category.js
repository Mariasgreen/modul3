export const fetchCategories = async () => {
  const categoriesResponse = await fetch('http://localhost:3000/api/category', {
    method: 'GET'
  });

  if (categoriesResponse.ok) {
    const categories = await categoriesResponse.json();
    
    const categoryInput = document.getElementById('categoryId');
    const categoryInput2 = document.getElementById('category');
    
    if (categoryInput) {
      const datalist = document.createElement('datalist');
      datalist.id = 'category-list-id';
      
      categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        datalist.appendChild(option);
      });
      
      categoryInput.appendChild(datalist);
    }
    
    if (categoryInput2) {
      const datalist2 = document.createElement('datalist');
      datalist2.id = 'category-list';
      
      categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        datalist2.appendChild(option);
      });
      
      categoryInput2.setAttribute('list', 'category-list');
      categoryInput2.appendChild(datalist2);
    }
  }
};
