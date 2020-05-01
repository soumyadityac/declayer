import Declayer from 'declayer';

import util from './todoUtils';
import TodoApp from './Components/TodoFrame';

import '../css/style.css';

window.onload = () => {
  const savedData = util.getSavedData();
  Declayer.attachAppToDOM({
    domNode: document.getElementById('app'),
    element: TodoApp,
    properties: savedData,
  });
};

window.onunload = () => {
  const { data } = Declayer.getRootElementState();
  localStorage.setItem('saved', JSON.stringify(data));
};
