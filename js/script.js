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
    renderBook();
    readStatus(library);
    elInput.forEach((input) => input.value = "");
    elCloseBtn.click();
    log(library);
}

const renderBook = () => {
  const elWrapper = document.querySelector(".wrapper");
  elWrapper.innerHTML = library.map((book, i) => `<div class="card" id="${i}">
          <div class="status">
          </div>
          <div class="card-body">
          <div class="pro-pic">p.p</div>
            <div class="contents">
              <h3> ${book.title} </h3>
              <p>  ${book.author} </p>
              <button class="minus-pages"> - </button>
              <em> ${book.pagesRead} /
                 ${book.pages} </em>
              <button class="add-pages"> + </button>
            </div>
          </div>
          <div class="btnRemove">r e m o v e 
          </div>
        </div>
    `
    ).join(' ')
}

const readStatus = (array) => {
  const elStatus = document.querySelectorAll(".status");
  const elStats = document.querySelector(".header").lastChild.previousSibling;
  
  let completedTot =  0;
  
  array.map((book, i) => {
    if(book.pages == book.pagesRead){
      elStatus[i].style.backgroundColor = "greenyellow";
      completedTot++;
    }  
    else if ((book.pages * 0.5) > book.pagesRead){
      elStatus[i].style.backgroundColor = "indianred";
    } 
    else if((book.pages * 0.5) <= book.pagesRead) {
      elStatus[i].style.backgroundColor = "orange";
    }
  });
  // Update books completed 
  (array.length <= 0) ? elStats :
  elStats.innerHTML = '<span>completed</span>' + '<br>' + completedTot  + '/' + array.length;
  
  const allReadPages = array.map(read => read.pagesRead);
  
  const sumReadPages = allReadPages.reduce((prev, curr) => prev + curr);
  
  // console.log(allReadPages.join(' ') + '\n' + sumReadPages);
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

