document.addEventListener('DOMContentLoaded', function () {
    const submit = document.getElementById('form');
    submit.addEventListener('submit', function (event) {
        addBooks();
        event.preventDefault() 
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

const bookArray = [];
const BOOK_RENDER = 'render-books';

function addBooks () {
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value
    const bookYear = document.getElementById('year').value;

    const idBook = generatingId();
    const bookObject = generatingBookObject(idBook, bookTitle, bookAuthor, bookYear, false);
    bookArray.push(bookObject);

    document.dispatchEvent(new Event(BOOK_RENDER));
    simpanData();
}

function generatingId () {
    return +new Date();
}

function generatingBookObject (id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

function makeReadingList (bookObject) {
    const {id, title, author, year, isComplete} = bookObject;

    const image = document.createElement('img');
    image.setAttribute('src', 'asset/study.png')
    image.classList.add('image-css');

    const newTitle = document.createElement('p');
    newTitle.innerText = `Judul Buku : ${title}`;
    newTitle.classList.add('book-data-css');

    const newAuthor = document.createElement('p');
    newAuthor.innerText = `Penulis Buku : ${author}`;
    newAuthor.classList.add('book-data-css');

    const newYear = document.createElement('p');
    newYear.innerText = `Tahun Terbit : ${year}`;
    newYear.classList.add('book-data-css');

    const containerObject = document.createElement('div');
    containerObject.append (image, newTitle, newAuthor, newYear);
    containerObject.classList.add('container-object-css')

    const container =  document.createElement('div');
    container.classList.add('container-css');
    container.append(containerObject);

    if (isComplete) {
        const checklistBtn = document.createElement('button');
        checklistBtn.classList.add('checklist-css2');
        checklistBtn.innerText = 'Belum selesai dibaca';

        checklistBtn.addEventListener('click', function() {
            cancleThis(id);
        });

        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-css2');
        trashBtn.innerText = 'Hapus Buku'
        
        trashBtn.addEventListener('click', function () {
            deletedThis(id);
        });

        const containerFungsi = document.createElement('div');
        containerFungsi.classList.add('container-fungsi-css');

        containerFungsi.append(checklistBtn, trashBtn);
        container.append(containerFungsi);
    } else {
        const checklistBtn = document.createElement('button');
        checklistBtn.classList.add('checklist-css');
        checklistBtn.innerText = 'Selesai dibaca';

        checklistBtn.addEventListener('click', function() {
            completeThis(id);
        });

        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-css');
        trashBtn.innerText = 'Hapus Buku'
        
        trashBtn.addEventListener('click', function () {
            deletedThis(id);
        });

        const containerFungsi = document.createElement('div');
        containerFungsi.classList.add('container-fungsi-css1');

        containerFungsi.append(checklistBtn, trashBtn);
        container.append(containerFungsi);
    }
    return container;
}
function deletedThis(bookId) {
    const target = findBook(bookId);

    if(target === -1 ) return;

    bookArray.splice(target, 1);
    document.dispatchEvent(new Event(BOOK_RENDER));
    simpanData();
}
function cancleThis (bookId) {
    const target = findBook(bookId);
    if (target == null) return;

    target.isComplete = false;
    document.dispatchEvent(new Event(BOOK_RENDER));
    simpanData();
}

function findBook(bookId) {
    for (const array of bookArray) {
        if (array.id === bookId) {
            return array;
        }
    }
    return null;
}

function completeThis(bookId) {
    const booktarget = findBook(bookId);
    if (booktarget == null) return;

    booktarget.isComplete = true; 
    document.dispatchEvent(new Event(BOOK_RENDER));
    simpanData();
}

function simpanData() {
    if (isStorageExist) {
        const parsed = JSON.stringify(bookArray);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(BOOK_STORAGE))
    }
}

const STORAGE_KEY = 'books-list';
const BOOK_STORAGE = 'books-detail';

function isStorageExist () {
    if(typeof (Storage) === undefined) {
        alert('browser lu tidak support local storage bro');
        return false;
    }
    return true;
}
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const arrayx of data) {
        bookArray.push(arrayx);
      }
    }
   
    document.dispatchEvent(new Event(BOOK_RENDER));
  }

document.addEventListener(BOOK_STORAGE, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
  });

document.addEventListener(BOOK_RENDER, function () {
    const notCompleteBook = document.getElementById('output');
    notCompleteBook.innerHTML = '';
    const completedBook = document.getElementById('output2');
    completedBook.innerHTML = '';

    console.log(bookArray);

    for (const array of bookArray) {
        const books = makeReadingList(array);
        if (array.isComplete) { 
            completedBook.append(books);
        } else {  
            notCompleteBook.append(books);
        }
    }
});


// side bar js

function sideBar () {
    const element = document.getElementById('nav2');
    element.style.visibility = 'visible';
    const exit = document.getElementById('exit');
    exit.style.visibility = 'visible';


}

function exit () {
    const element = document.getElementById('nav2');
    element.style.visibility = 'hidden';
    element.style.transition = '0.5s';
    const exit = document.getElementById('exit');
    exit.style.visibility = 'hidden';
}
function hideSidebar () {
    const element = document.getElementById('nav2');
    element.style.visibility = 'hidden';
    const exit = document.getElementById('exit');
    exit.style.visibility = 'hidden';
}

function loading () {
    alert('selamat datang di list baca online by Tofik Hidayat')
    const element = document.getElementById('nav2');
    element.style.visibility = 'hidden';
}
