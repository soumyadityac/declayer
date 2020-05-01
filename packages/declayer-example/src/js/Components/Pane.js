import Declayer, { Component } from 'declayer';

const e = Declayer.createCustomElement;

class Pane extends Component {
  constructor(data, helpers) {
    super();

    const { records, selectedItemName } = data;
    const { onSelectPaneItem, onAddToPaneList, onRemoveFromPaneList } = helpers;

    this.createNodePaneList = this.createNodePaneList.bind(this);
    this.createPaneList = this.createPaneList.bind(this);

    this.paneRecords = records;
    this.selectedItemName = selectedItemName;

    this.onSelectPaneItem = onSelectPaneItem;
    this.onAddToPaneList = onAddToPaneList;
    this.onRemoveFromPaneList = onRemoveFromPaneList;
  }

  createNodePaneList(name) {
    return [
      e(
        'button',
        { className: `btn btn-outline-dark paneItems ${this.selectedItemName === name ? 'selected' : undefined}` },
        { click: this.onSelectPaneItem(name) },
        [document.createTextNode(name)],
      ),
      e(
        'button',
        { className: 'btn btn-outline-danger paneDelete' },
        { click: this.onRemoveFromPaneList(name) },
        [document.createTextNode('X')],
      ),
    ];
  }

  createPaneList() {
    return e(
      'div',
      { id: 'paneButtons' },
      null,
      this.paneRecords.reduce((acc, item) => [...acc, ...this.createNodePaneList(item)], []),
    );
  }

  mount() {
    return e(
      'div',
      { className: 'pane' },
      null,
      [
        e(
          'h3',
          null,
          null,
          [document.createTextNode('To Do App')],
        ),
        e(
          'button',
          { className: 'btn btn-info', id: 'newList' },
          { click: this.onAddToPaneList },
          [document.createTextNode('New List')],
        ),
        this.createPaneList(),
      ],
    );
  }
}

export default Pane;
