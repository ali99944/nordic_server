const data = [
    { fixedByIdentifier: 'PN176', name: 'Object 1' },
    { fixedByIdentifier: 'PN177', name: 'Object 2' },
    { fixedByIdentifier: 'PN176', name: 'Object 3' },
    { fixedByIdentifier: 'PN178', name: 'Object 4' },
    { fixedByIdentifier: 'PN177', name: 'Object 5' },
  ];
  
  const groupedData = data.reduce((result, item) => {
    const key = item.fixedByIdentifier;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {});
  
  console.log(groupedData);