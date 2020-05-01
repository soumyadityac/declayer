import Declayer, { Component } from 'declayer';

import Todos from './Todos';
import Pane from './Pane';

const e = Declayer.createCustomElement;

class TodoApp extends Component {
  constructor(data) {
    super();
    this.handleSelectPaneItem = this.handleSelectPaneItem.bind(this);
    this.mount = this.mount.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.strike = this.strike.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.debounce = this.debounce.bind(this);
    this.addToPaneList = this.addToPaneList.bind(this);
    this.removeFromPaneList = this.removeFromPaneList.bind(this);

    this.state = { data, itemName: Object.keys(data)[0] };
  }

  mount() {
    const {
      handleSelectPaneItem,
      addToPaneList,
      removeFromPaneList,
      add,
      remove,
      strike,
      handleEdit,
      debounce,
    } = this;

    const { data, itemName } = this.state;

    return e(
      'div',
      { className: 'flex-container' },
      null,
      [
        e(
          Pane,
          { records: Object.keys(data), selectedItemName: itemName },
          {
            onSelectPaneItem: handleSelectPaneItem,
            onAddToPaneList: addToPaneList,
            onRemoveFromPaneList: removeFromPaneList,
          },
        ),
        e(
          Todos,
          { itemName, item: data[itemName] },
          {
            add, remove, strike, handleEdit, debounce,
          },
        ),
      ],
    );
  }

  handleSelectPaneItem(itemName) {
    return () => {
      this.setState({ itemName });
    };
  }

  add(itemName) {
    return (event) => {
      if (event.type !== 'click' && event.code !== 'Enter') return;
      const input = document.querySelector('.inputTask').value.trim();

      const { data } = this.state;

      if (input === '') return;
      const records = {
        ...data,
        [itemName]: {
          ...data[itemName],
          items: [input, ...data[itemName].items],
        },
      };
      document.querySelector('.inputTask').value = '';
      this.setState({ data: records });
    };
  }

  remove(itemName, pos, category) {
    return () => {
      if (category === 'items' && !confirm('Are you sure you want to delete an uncompleted task?')) return;

      const { data } = this.state;

      const records = {
        ...data,
        [itemName]: {
          ...data[itemName],
          [category]: data[itemName][category]
            .reduce((acc, item, index) => (index !== pos ? [...acc, item] : acc), []),
        },
      };

      this.setState({ data: records });
    };
  }

  strike(itemName, pos, category) {
    return () => {
      const { data } = this.state;

      const strikedItem = data[itemName][category][pos];
      const records = {
        ...data,
        [itemName]: {
          ...data[itemName],
          [category]: data[itemName][category]
            .reduce((acc, item, index) => (index !== pos ? [...acc, item] : acc), []),
        },
      };
      
      (category === 'items')
        ? records[itemName].doneItems = [...records[itemName].doneItems, strikedItem]
        : records[itemName].items = [...records[itemName].items, strikedItem];

      this.setState({ data: records });
    };
  }

  handleEdit(itemName, index, category) {
    return (event) => {
      const text = event.target.value.trim();
      if (text === '') return undefined;

      const { data } = this.state;

      const records = {
        ...data,
        [itemName]: {
          ...data[itemName],
          [category]: data[itemName][category]
            .reduce((acc, item, pos) => (pos !== index ? [...acc, item] : [...acc, text]), []),
        },
      };

      return records;
    };
  }

  debounce(func, interval) {
    let timeout;
    const that = this;
    function debouncer(...rest) {
      const context = this;
      const args = rest;
      this.style.height = 'auto';
      this.style.height = `${this.scrollHeight}px`;
      const later = () => {
        timeout = null;
        that.records = func.apply(context, args) || that.records;
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, interval);
    }
    return debouncer;
  }

  addToPaneList() {
    // eslint-disable-next-line no-alert
    let name = prompt('What would you like to name your new list', '');
    // eslint-disable-next-line no-alert
    if (name === null || name.trim() === '') { alert('Your list must have a name!'); return; }
    name = name.trim();

    const { data } = this.state;

    if (Object.keys(data).includes(name)) {
      // eslint-disable-next-line no-alert
      alert('You already have a list with the same name! Try some other name');
      return;
    }

    const records = {
      ...data,
      [name]: { items: [], doneItems: [] },
    };
    this.setState({ data: records });
  }


  removeFromPaneList(itemName) {
    return () => {
      // eslint-disable-next-line no-alert
      if (!confirm('Are you sure you want to delete the list?')) return;

      const { data } = this.state;

      const records = (() => {
        const obj = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const key in data) if (key !== itemName) obj[key] = data[key];
        return obj;
      })();

      this.setState({ data: records, itemName: Object.keys(records)[0] });
    };
  }
}

export default TodoApp;
