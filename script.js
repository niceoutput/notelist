const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const items = itemList.querySelectorAll("li");

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) =>  addItemToDOM(item));
  checkUi();
}

const onAddItemSubmit = e => {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate input
  if (newItem === '') {
    alert('Please fill the form');
    return;
  }

  // Create new item DOM element
  addItemToDOM(newItem);

  // Add item to localStorage
  addItemToStorage(newItem);

  checkUi();

  itemInput.value = '';
}

const addItemToDOM = (item) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add li to the dom
  itemList.appendChild(li);
}

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon)
  return button;
}

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

const addItemToStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  // Add new items to the array
  itemsFromStorage.push(item);

  // Convert to JSON string and store in localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

const getItemsFromStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure you want to remove?')) {
      e.target.parentElement.parentElement.remove();

      checkUi();
    }
  }
}

const clearItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUi();
}

const filterItems = (e) => {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  console.log(text)

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });

}

const checkUi = () => {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearButton.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    itemFilter.style.display = 'block';
  }
  console.log('checking');
};

// Initialize application
const init = () => {
  //Event listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', removeItem);
  clearButton.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUi();
}

init();
