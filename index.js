let selectedItem;
const wrap = document.getElementById('wrapper');
const buttons = document.getElementById('buttons');
const leftContainer = document.getElementById('leftContainer');
const rightContainer = document.getElementById('rightContainer');

const highlight = (item) => {
    if (selectedItem) {
        selectedItem.classList.remove('active');
    }
    selectedItem = item;
    selectedItem.classList.add('active');
};

const clearSelectedItem = () => {
    selectedItem.classList.remove("active");
    selectedItem = null;
}

const replaceItem = (item) => {
    if(item.parentElement === leftContainer) {
        rightContainer.appendChild(leftContainer.removeChild(item));
    } else if(item.parentElement === rightContainer) {
        leftContainer.appendChild(rightContainer.removeChild(item));
    }
    clearSelectedItem();
}

const replaceAllItems = (startContainer, endContainer) => {
    Array.from(startContainer.querySelectorAll('.item')).forEach((item) => {
        endContainer.appendChild(startContainer.removeChild(item));
        item.classList.remove("active");
    });
}

wrap.addEventListener('click', (event) => {
    const target = event.target;
    const isItem = Array.from(target.classList).some((item) => item === 'item');
    if (!isItem) {
        return;
    }
    highlight(target);
});

wrap.addEventListener('dblclick', (event) => {
    const target = event.target;
    if (target.classList.contains("item")) {
        replaceItem(target);
    }
})

wrap.addEventListener('mousedown', (event) => event.preventDefault());

buttons.addEventListener('click', (event) => {
    const target = event.target;
    switch (target.value) {
        case '>':
        case '<':
            if (selectedItem) {
                replaceItem(selectedItem);
            }
            break;
        case '>>':
            replaceAllItems(leftContainer, rightContainer);
            break;
        case '<<':
            replaceAllItems(rightContainer, leftContainer);
            break;
    }
    
});
