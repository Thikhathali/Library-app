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

Book.prototype.addPagesRead = function() { 
  if(this.pagesRead == this.pages) return;
  return ++this.pagesRead;
}

Book.prototype.subtractPagesRead = function() { 
  if(this.pagesRead <= 0) return;
  return --this.pagesRead;
}

const validateFields = () => {
  let hasData = null;

  if(elInput[0].value == "" || elInput[1].value == "" || elInput[2].value == "" 
  || elInput[3].value == "") {
    elInput.forEach((input) => {
      if(input.value == ""){
        input.classList.add("error-msg");
      }else {
        input.classList.remove("error-msg");
      }
    });
    hasData = false;
  }
  else if(Number.parseInt(elInput[2].value) < Number.parseInt(elInput[3].value)) {
    console.log('pages read must be less than the pages!');
    elInput[3].classList.add("error-read-pages");
    hasData = false;
  }
  else {
    elInput.forEach(input => input.classList.remove("error-read-pages"));
    hasData = true;
  }
  return hasData;
}

const addBooks = (e) => {
    if(validateFields()){
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
    } else {
      return;
    }
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

const removeBook = (e) => {
  if(e.target.className !== 'btnRemove') return;
  
  const card = e.target.parentNode;
  library.splice(card.id, 1);
  elWrapper.removeChild(card);
  console.log(library);
}

elAddBtn.addEventListener("click", () => {
  elDialog.show();
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

elWrapper.addEventListener("click", removeBook, { capture: true });

elWrapper.addEventListener('click', (e) => {
  let card = e.target;
  let cardAtIndex = card.parentNode.parentNode.parentNode.id;
  
  (card.className !== 'add-pages') ?
    log(library.at(Number.parseInt(cardAtIndex)).subtractPagesRead()) : 
    log(library.at(Number.parseInt(cardAtIndex)).addPagesRead());

}, { capture : true });

