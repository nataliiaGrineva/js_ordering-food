const list = ['Apple', 'Bread', 'Carrot', 'Dumplings',
             'Eggs','Fish','Garlic','Honey','Ice cream','Jam'];
const nodes = list.map((item) => `<span>${item}</span>`);

let initialState = {
  items: list,
  nodes: nodes,
  up: true,
  down: true
}

function reducer(state, action) {
  let up = false;
  let down = false;
  
  switch (action.type) {
    case 'select':
        if (action.index === 0) {
          up = true;
        } else if (action.index === state.items.length-1) {
          down = true;
        }
      return {
        ...state,
        nodes: state.items.map((item, index) => {
          if (index === action.index) {
            item = `<span class='active'>${item}</span>`;
          } else {
            item = `<span>${item}</span>`;
          }
          return item
        }),
        up: up,
        down: down
      }
    case 'unselect': 
      return {
        ...state,
        nodes: state.items.map(item => `<span>${item}</span>`),
        up: true,
        down: true
      }
    case 'moveUp':
      return move(state, action);
    case 'moveDown':
      return move(state, action);
    default:
      return state;
  } 
}

function move(state, action) {
  const newItems = [...state.items];
  const itemToMove = newItems.splice(action.index, 1);
  const newNodes = [...state.nodes];
  const active = newNodes.splice(action.index, 1);
  let up;
  let down;

  if (action.index === 1) {
    up = true;
  } else if (action.index === state.items.length-2) {
    down = true;
  }
  if (action.type === 'moveDown') {
    newItems.splice(action.index + 1, 0, itemToMove);
    newNodes.splice(action.index + 1, 0, active);
  } else {
    newItems.splice(action.index - 1, 0, itemToMove);
    newNodes.splice(action.index - 1, 0, active);
  }
  
  return {
    ...state,
    items: newItems,
    nodes: newNodes,
    up: up,
    down: down
  }
}

const store = Redux.createStore(reducer, initialState);
render(store.getState().nodes);

store.subscribe(() => render(store.getState().nodes));

document.addEventListener('click', () => {
  if (event.target.tagName !== 'SPAN' && event.target.tagName !== 'BUTTON') {
    store.dispatch({
      type: 'unselect'
    });
  }
});

document.querySelector('.up').addEventListener('click', () => {
  const items = document.querySelectorAll('span');
  let index;
  for(let i = 0; i < items.length; i++) {
    if(items[i].classList.contains('active')) {
      index =  i;
      break;
    }
  }

  if (index === 0) {
    return;
  }
  
  store.dispatch({
    type: 'moveUp',
    index: index
  });
});

document.querySelector('.down').addEventListener('click', () => {
  const items = document.querySelectorAll('span');
  let index;
  for(let i = 0; i < items.length; i++) {
    if(items[i].classList.contains('active')) {
      index =  i;
      break;
    }
  }
  
  store.dispatch({
    type: 'moveDown',
    index: index
  });
});

function render(storeItems) {
  const upButton = document.querySelector('.up');
  const downButton = document.querySelector('.down');

  upButton.disabled = store.getState().up;
  downButton.disabled = store.getState().down;

  const list = document.querySelector('.list');
  list.innerHTML = '';
  for (let item of storeItems) {
    const li = document.createElement('li');
    li.insertAdjacentHTML('beforeend', item);
    list.append(li);
    const span = li.querySelector('span');
    span.addEventListener('click', () =>  {
      store.dispatch({
        type: 'select',
        index: storeItems.indexOf(item)
      });
    });
  }
}
