function getSavedData() {
  if (!('notFirstLoad' in localStorage)) {
    const record = {
      'List 1': { items: ['Build the ToDo App'], doneItems: ['Learn Design Patterns'] },
      'List 2': { items: ['Optimize the ToDo App'], doneItems: ['Learn Flexbox'] },
    };
    localStorage.setItem('notFirstLoad', true);
    localStorage.setItem('saved', JSON.stringify(record));
  }
  return JSON.parse(localStorage.getItem('saved'));
}

export default {
  getSavedData,
};
