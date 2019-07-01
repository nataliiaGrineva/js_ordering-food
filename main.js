const list = ['Apple', 'Bread', 'Carrot', 'Dumplings',
             'Eggs','Fish','Garlic','Honey','Ice cream','Jam'];
const nodes = list.map((item) => `<span>${item}</span>`);
const MOVE_UP = {
  type: 'moveUp',
  index: null,
};
const UNSELECT = {
  type: 'unselect',
}
const buttonUp = document.querySelector('.up');
const buttonDown = document.querySelector('.down'); 

const initialState = {
  items: list,
  nodes: nodes,
  selected: null,
  up: true,
  down: true
}

function reducer(state, action) {
  let up = false;
  let down = false;
  let selected = state.selected;
  
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
            if (action.index !== state.selected) {
              selected = action.index;
              item = `<span class='active'>${item}</span>`;
            } else {
              selected = null;
              item = `<span>${item}</span>`;
              up = true;
              down = true;
            }
          } else {
            item = `<span>${item}</span>`;
          }
          return item
        }),
        selected: selected,
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
      selected -= 1;
      return move(state, action, selected);
    case 'moveDown':
      selected += 1;
      return move(state, action, selected);
    default:
      return state;
  } 
}

function move(state, action, selected) {
  const newItems = [...state.items];
  const itemToMove = newItems.splice(action.index, 1);
  const newNodes = [...state.nodes];
  const active = newNodes.splice(action.index, 1);
  let up;
  let down;

  if (selected === 0) {
    up = true;
  } else if (selected === state.items.length - 1) {
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
    selected: selected,
    up: up,
    down: down
  }
}

const store = Redux.createStore(reducer, initialState);
render(store.getState().nodes);

store.subscribe(() => render(store.getState().nodes));

document.addEventListener('click', () => {
  if (event.target.tagName !== 'SPAN' && event.target.tagName !== 'BUTTON') {
    store.dispatch(UNSELECT);
  }
});

buttonUp.addEventListener('click', () => {
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
  
  MOVE_UP.index = index;
  store.dispatch(MOVE_UP);
});

buttonDown.addEventListener('click', () => {
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
  buttonUp.disabled = store.getState().up;
  buttonDown.disabled = store.getState().down;

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
