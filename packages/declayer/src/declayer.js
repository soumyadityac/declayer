/* eslint-disable no-undef */
const getKey = (Tag, properties) => `${Tag}-${JSON.stringify(properties)}`;

const appCache = {};
const mountedObjectCache = {};

export function Component() {
}

export function createCustomElement(Tag, properties, eventListeners, children = []) {
  if (Object.getPrototypeOf(Tag) === Component) {
    const uniqKey = getKey(Tag, properties);
    if (!mountedObjectCache[uniqKey]) {
      mountedObjectCache[uniqKey] = new Tag(properties, eventListeners, children);
    }
    return mountedObjectCache[uniqKey].mount();
  }

  const ele = document.createElement(Tag);
  Object.assign(ele, properties);
  if (eventListeners) {
    Object.keys(eventListeners).forEach((key) => {
      ele.addEventListener(key, eventListeners[key]);
    });
  }
  if (children.length) {
    children.forEach((element) => {
      if (typeof element === 'string') element = document.createTextNode(element);
      ele.appendChild(element);
    });
  }
  return ele;
}

export function attachAppToDOM({ domNode, element, properties }) {
  if (!appCache.attachToDomProps) {
    appCache.attachToDomProps = { domNode, element, properties };
  }
  domNode.innerHTML = ''; // eslint-disable-line no-param-reassign
  domNode.appendChild(createCustomElement(element, properties));
}

// eslint-disable-next-line func-names
Component.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
  attachAppToDOM(appCache.attachToDomProps);
};

export function getRootElementState() {
  const { element, properties } = appCache.attachToDomProps;
  const key = getKey(element, properties);
  const mountedObject = mountedObjectCache[key] || {};
  return mountedObject.state;
}
