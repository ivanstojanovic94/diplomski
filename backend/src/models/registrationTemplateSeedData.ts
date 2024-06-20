const seedData = [
    {
      value: 'ime',
      name: 'ime',
      label: 'ime',
      inputType: 'text',
      type: 'input',
      required: true,
      options: null
    },
    {
      value: 'prezime',
      name: 'prezime',
      label: 'prezime',
      inputType: 'text',
      type: 'input',
      required: false,
      options: null
    },
    {
      value: 'tip',
      name: 'tip',
      label: 'Drzava',
      inputType: 'text',
      type: 'select',
      required: false,
      options: [{key: 'srbija', value: 'Srbija'}, {key: 'cg', value: 'Crna Gora'}]
    }
  ];
  

export default seedData;