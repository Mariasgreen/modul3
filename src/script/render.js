import create from  './create.mjs';
const {
  createImageLogo,
  createHeader,
  createFooter,
  createLogo,
  createFooterText,
  createMain,
  createTable,
  createButtonsGroup,
  createForm,
  createRow,} = create;

export const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const imageLogo = createImageLogo()
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'add',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'delete',
      },
    ]);


    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter();
    const footerText = createFooterText(title);

    header.headerContainer.append(imageLogo, logo);
    footer.footerContainer.append(footerText);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      bthDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };





  export const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  