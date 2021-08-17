const { createStore } = window.Redux;

const food = ['Apple','Bread','Carrot','Dumplings','Eggs','Fish','Garlic','Honey','Ice cream','Jam'];
const UP = 'UP';
const DOWN = 'DOWN';
const SELECT = 'SELECT';

export const actions = {
  up : { type: UP },
  down: { type: DOWN },
  select: payload => ({ type: SELECT, payload}),
};

const initialState = {
  foodList: [...food],
  current: null,
}

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

switch (type) {
  case SELECT:
    return {
      ...state,
      current: payload? state.foodList.indexOf(payload) : payload,
    };
  case UP:
    {
      const newFoodList = [...state.foodList];
      const tmp = newFoodList[state.current];
   
      newFoodList[state.current] = newFoodList[state.current - 1];
      newFoodList[state.current - 1] = tmp;

      return {
        ...state,
        foodList: newFoodList,
        current: state.current - 1,
      }
    }

    case DOWN:
      {
        const newFoodList = [...state.foodList];
        const tmp = newFoodList[state.current];
     
        newFoodList[state.current] = newFoodList[state.current + 1];
        newFoodList[state.current + 1] = tmp;
  
        return {
          ...state,
          foodList: newFoodList,
          current: state.current + 1,
        }
      }

      default:
        return state;
}
};

export const store = createStore(reducer);
