const INCOMPLETE_BOOKS_LIST = "incompleteBookshelfList";
const COMPLETE_BOOKS_LIST = "completeBookshelfList";
const BOOK_ID = "itemId";

function createBook(bookTitle, bookAuthor, bookYear, isComplete) {
  const outputTitle = document.createElement("h3");
  outputTitle.innerText = bookTitle;

  const outputAuthor = document.createElement("p");
  outputAuthor.innerText = "Penulis: " + bookAuthor;

  const outputYear = document.createElement("p");
  outputYear.innerText = "Tahun: " + bookYear;

  const textContainer = document.createElement("ARTICLE");
  textContainer.setAttribute("class", "book_item");
  textContainer.append(outputTitle, outputAuthor, outputYear);

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "action");

  if (isComplete) {
    buttonContainer.append(
      createButtonUnfinished("Unfinish"),
      createButtonDelete("Delete")
    );
  } else {
    buttonContainer.append(
      createButtonFinish("Finish reading"),
      createButtonDelete("Delete")
    );
  }

  textContainer.append(buttonContainer);

  return textContainer;
}

function addbook() {
  const incompleteBooksList = document.getElementById(INCOMPLETE_BOOKS_LIST);
  const completeBooksList = document.getElementById(COMPLETE_BOOKS_LIST);

  const titleBook = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const checkboxValue = document.querySelector("#inputBookIsComplete").checked;

  const bookCreated = createBook(
    titleBook,
    bookAuthor,
    bookYear,
    checkboxValue
  );
  const bookObject = composeObject(
    titleBook,
    bookAuthor,
    bookYear,
    checkboxValue
  );
  bookCreated[BOOK_ID] = bookObject.id;
  books.push(bookObject);

  if (checkboxValue) {
    completeBooksList.append(bookCreated);
    updateBooksData();
  } else {
    incompleteBooksList.append(bookCreated);
    updateBooksData();
  }

  console.log(books);
}

function addBookToFinish(book) {
  const title = book.querySelector(".book_item > h3").innerText;
  const author = book.querySelectorAll(".book_item > p")[0].innerText.slice(8);
  const year = book.querySelectorAll(".book_item > p")[1].innerText.slice(7);

  const newBook = createBook(title, author, year, true);
  const bookFound = findBook(book[BOOK_ID]);
  bookFound.isComplete = true;
  newBook[BOOK_ID] = bookFound.id;

  const completeBooksList = document.getElementById(COMPLETE_BOOKS_LIST);
  completeBooksList.append(newBook);
  book.remove();

  updateBooksData();
}

function addBookToUnfinish(book) {
  const title = book.querySelector(".book_item > h3").innerText;
  const author = book.querySelectorAll(".book_item > p")[0].innerText.slice(8);
  const year = book.querySelectorAll(".book_item > p")[1].innerText.slice(7);

  const newBook = createBook(title, author, year, false);
  const bookFound = findBook(book[BOOK_ID]);
  bookFound.isComplete = false;
  newBook[BOOK_ID] = bookFound.id;

  const incompleteBooksList = document.getElementById(INCOMPLETE_BOOKS_LIST);
  incompleteBooksList.append(newBook);
  book.remove();
  updateBooksData();
}

function remove(book) {
  const bookIndex = findBookIndex(book[BOOK_ID]);
  books.splice(bookIndex, 1);
  book.remove();
  updateBooksData();
}

function createButton(buttonTypeClass, eventListener, text) {
  const button = document.createElement("button");
  button.innerText = text;
  button.setAttribute("class", buttonTypeClass);

  button.addEventListener("click", (element) => {
    eventListener(element);
  });

  return button;
}

function createButtonUnfinished(text) {
  return createButton(
    "unfinished",
    (e) => {
      addBookToUnfinish(e.target.parentElement.parentElement);
    },
    text
  );
}

function createButtonFinish(text) {
  return createButton(
    "unfinished",
    (e) => {
      addBookToFinish(e.target.parentElement.parentElement);
    },
    text
  );
}

function createButtonDelete(text) {
  return createButton(
    "delete",
    (e) => {
      const message = confirm("Are You Sure Want to Delete the Books?");
      if (message) {
        remove(e.target.parentElement.parentElement);
      }
    },
    text
  );
}

function searchBooks() {
  const searchInput = document.getElementById("searchBookTitle").value;
  const incompleteBooksList = document.getElementById(INCOMPLETE_BOOKS_LIST);
  const completeBooksList = document.getElementById(COMPLETE_BOOKS_LIST);
  const items = document.querySelectorAll(".book_item");

  if (searchInput) {
    for (previousBook of items) {
      previousBook.remove();
    }

    const filteredBooks = books.filter((book) =>
      book.bookTitle.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (filteredBooks.length <= 0) {
      alert("Book Not Found");
    } else {
      for (book of filteredBooks) {
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
  } else {
    for (previousBook of items) {
      previousBook.remove();
    }
    loadBooksData();
  }

  return books;
}
