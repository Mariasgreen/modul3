export const getStorage = (key) => (localStorage.getItem(key) ?
  JSON.parse(localStorage.getItem(key)) : []);

 export const setStorage = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));


  export const addContactData = (contact) => {
    const data = getStorage('phonebook');
    data.push(contact);
    setStorage('phonebook', data);
  };

  export const removeStorage = (phone) => {
    const data = getStorage('phonebook');
    const result = data.filter(item => item.phone !== phone);
    setStorage('phonebook', result);
  };

