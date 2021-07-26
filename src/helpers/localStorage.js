const saveData = (key, data) => {
  try {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem(key, dataJSON);
  } catch (e) {
    throw new Error('Please, enable your local storage!');
  }
};

const getData = (key) => {
  try {
    const dataJSON = localStorage.getItem(key);
    return JSON.parse(dataJSON);
  } catch (e) {
    throw new Error('Please, enable your local storage!');
  }
};

export { saveData, getData };
