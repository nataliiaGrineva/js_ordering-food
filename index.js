import {store, actions} from './store.js'
console.log('store', store.getState());

const {foodList, current} = store.getState();

const clickHandler = (e) => {
  const matches = [...document.querySelectorAll('LI')];

    if(e.target.tagName !== 'BUTTON') {
      matches.forEach(item => {
        item.classList.remove('selected');
    });
    }

    if (e.target.tagName === 'LI') {
      e.target.classList.add('selected');
      store.dispatch(actions.select(e.target.innerText));
    }

    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'LI') {
      downBtnDisabled();
      upBtnDisabled();
      store.dispatch(actions.select(null));
    }

    console.log(store.getState());
}

const list = document.createElement('ul');
document.body.append(list);
document.addEventListener('click', clickHandler);

const updateList = (elements, selectedItem) => {
  list.innerHTML='';

  elements.forEach((item, index) => {

    const li = document.createElement('li');
    li.innerText = item;

    if (index === selectedItem) {
      li.classList.add('selected');
    }
    list.append(li);
  })
}
store.subscribe(() => updateList(store.getState().foodList, store.getState().current));

//#region  disabled buttons
const upBtnDisabled = () => {
  upBtn.disabled = store.getState().current === 0
    || store.getState().current === null;
}
store.subscribe(() =>upBtnDisabled());

const downBtnDisabled = () => {
  downBtn.disabled = store.getState().current === store.getState().foodList.length - 1
    || store.getState().current === null;
}
store.subscribe(() =>downBtnDisabled());
//#endregion

const moveUp = () => {
  store.dispatch(actions.up);
  console.log(store.getState());
};

const moveDown = () => {
  store.dispatch(actions.down);
};

//#region create buttons
const upBtn = document.createElement('button');
upBtn.innerText = 'up';
upBtn.addEventListener('click', moveUp);
document.body.append(upBtn);

const downBtn = document.createElement('button');
downBtn.innerText = 'down';
downBtn.addEventListener('click', moveDown);
document.body.append(downBtn);
//#endregion


updateList(foodList, null);
downBtnDisabled();
upBtnDisabled();
