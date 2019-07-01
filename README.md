https://gitkurmax.github.io/js_ordering-food/

# Ordering food

Here are 10 items of food: 

- Apple
- Bread
- Carrot
- Dumplings
- Eggs
- Fish
- Garlic
- Honey
- Ice cream
- Jam

Make an app that would allow sorting them in an arbitrary order. It should work as follows:

1. There are two buttons, "Move Up" and "Move Down". They are initially disabled.
2. The user selects one of the food items by clicking on it. The buttons become enabled.
3. By clicking "Move Up", the user moves the selected item one position up, and by clicking "Move Down", the user moves the item one position down. The item should not loose selection when moving. Once it’s become the topmost in the list, disable the "Move Up" button again. Similarly, when the last item on the list is selected, the "Move Down" button must become disabled. In other words, make buttons enabled if and only if clicking on them would have an effect.
4. The user can then select and start moving a different item.
5. When the user clicks outside the list, the active item must become unselected.

Create your project as a simple HTML page that uses Redux (link to [redux.min.js](redux.min.js)).

First decide what will be stored in your state, what types of actions you will use and what exact data the actions will include, if any. Then implement a reducer. After all that is done you can move on to writing the rest of the code.
