import Declayer, { Component } from 'declayer';

import { icon } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const e = Declayer.createCustomElement;

class Todos extends Component {
  constructor(data, helpers) {
    super();

    const { itemName, item } = data;

    this.listName = itemName;
    this.record = item;
    this.helpers = helpers;


    this.mount = this.mount.bind(this);
    this.createNode = this.createNode.bind(this);
    this.createText = this.createText.bind(this);
    this.autoResize = this.autoResize.bind(this);
    this.createList = this.createList.bind(this);
  }

  mount() {
    const addEventHandler = this.helpers.add(this.listName);
    return e(
      'div',
      { className: 'main' },
      null,
      [
        e(
          'div',
          { className: 'inputDiv' },
          null,
          [
            e(
              'input',
              { className: 'form-control inputTask', type: 'text', placeholder: 'Add New Task Here...' },
              { keydown: addEventHandler },
            ),
            e(
              'button',
              { className: 'btn btn-dark', id: 'add' },
              { click: addEventHandler },
              [document.createTextNode('Add')],
            ),
          ],
        ),
        e(
          'div',
          { className: 'listDiv' },
          null,
          [
            e(
              'ul',
              { className: 'myList' },
              null,
              this.createList(),
            ),
          ],
        ),
      ],
    );
  }

  createNode(index, destItems, category) {
    return e(
      'li',
      { className: `listItem ${destItems === this.record.doneItems ? 'strike' : undefined}` },
      null,
      [
        e(
          'input',
          { type: 'checkbox', className: 'check', checked: destItems === this.record.doneItems },
          { click: this.helpers.strike(this.listName, index, category) },
        ),
        this.createText(destItems[index], index, category),
        e(
          'button',
          { id: 'delete' },
          { click: this.helpers.remove(this.listName, index, category) },
          [
            icon(faTrash).node[0],
          ],
        ),
      ],
    );
  }

  createText(textValue, index, category) {
    return e(
      'textarea',
      { className: 'itemText' },
      {
        click: (event) => { event.target.focus(); },
        input: this.helpers.debounce(this.helpers.handleEdit(this.listName, index, category), 1000),
      },
      [
        document.createTextNode(textValue),
      ],
    );
  }

  autoResize() {
    const test = document.querySelectorAll('.itemText');
    test.forEach((item) => { item.style.height = 'auto'; item.style.height = `${item.scrollHeight}px`; });
  }

  createList() {
    const items = [];
    Object.keys(this.record).forEach((itemCategory) => {
      this.record[itemCategory].forEach((_, index, collection) => {
        items.push(this.createNode(index, collection, itemCategory));
      });
    });
    this.autoResize();
    return items;
  }
}

export default Todos;
