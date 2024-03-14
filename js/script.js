const log = console.log;

const elDialog = document.querySelector(".modal");
const elAddBtn = document.querySelector(".btn-add");
const elCloseBtn = document.querySelector(".close-modal");
const elAddBook = document.querySelector(".btn-add-book");
const elWrapper = document.querySelector(".wrapper");
const elInput = document.querySelectorAll("input");
let library = [];

function Book(author, title, pages, pagesRead){
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.pagesRead = pagesRead;
}

const addBooks = (e) => {
    library.push(
      new Book(
        elInput[0].value,
        elInput[1].value,
        elInput[2].value,
        elInput[3].value,
        )
      );
    elInput.forEach((input) => input.value = "");
    elCloseBtn.click();
    log(library);
}


elAddBtn.addEventListener("click", () => {
  elDialog.show();
  if(library.length > 0) log(library[0].constructor === Book);
});

elCloseBtn.addEventListener("click", () => {
  elDialog.classList.add(".hide");
  elInput.forEach((input) => {
    input.value = "";
    input.classList.remove('error-msg');
  });
  elDialog.close();
});

elAddBook.addEventListener("click", addBooks);

