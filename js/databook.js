const STORAGE_KEY = "BOOK_APPS";
let books = [];

const isStorage = () => {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
};

function composeObject(bookTitle, bookAuthor, bookYear, isComplete) {
  return {
    id: +new Date(),
    bookTitle: bookTitle,
    bookAuthor: bookAuthor,
    bookYear: bookYear,
    isComplete: isComplete,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;
    index++;
  }

  return -1;
}

function saveBooksData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("onsaved"));
}

function loadBooksData() {
  const getBooks = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(getBooks);

  if (data !== null) {
    books = data;
  }

  document.dispatchEvent(new Event("load"));
}

function updateBooksData() {
  if (isStorage()) {
    saveBooksData();
  }
}

function refreshBookData() {
  const incompleteBooksList = document.getElementById(INCOMPLETE_BOOKS_LIST);
  const completeBooksList = document.getElementById(COMPLETE_BOOKS_LIST);

  for (book of books) {
    const newBook = createBook(
      book.bookTitle,
      book.bookAuthor,
      book.bookYear,
      book.isComplete
    );
    newBook[BOOK_ID] = book.id;

    if (book.isComplete) {
      completeBooksList.append(newBook);
    } else {
      incompleteBooksList.append(newBook);
    }
  }
}
