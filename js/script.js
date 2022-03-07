document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addbook();
  });

  if (isStorage()) {
    loadBooksData();
  }

  const submitSearch = document.getElementById("searchBook");

  submitSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    searchBooks();
  });
});

document.addEventListener("onsaved", () => {
  console.log("Book saved");
});

document.addEventListener("load", () => {
  refreshBookData();
});
