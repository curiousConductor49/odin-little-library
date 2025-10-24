const newBookFormContainer = document.querySelector(".new-book-form-container");
const newBookForm = document.querySelector(".new-book-form");
const submitBtn = document.querySelector(".submit-btn");
const newBookBtn = document.querySelector(".new-book-btn");

const libraryOfBooks = [];

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    const newBookItem = new Book(title, author, pages, status);
    libraryOfBooks.push(newBookItem);
}

function displayBooksInLibrary(library) {
    const libraryContainer = document.querySelector(".library-container");

    if (library.length === 0) {
        const placeholder = document.createElement("p");
        placeholder.textContent = "No books here!"
        placeholder.classList.add("placeholder-text");
        libraryContainer.appendChild(placeholder);
    } else {
        for (let i = 0; i < library.length; i++) {
            const bookNode = document.createElement("article");
    
            for (const property in library[i]) {
                switch (property) {
                    case "title":
                        const bookNodeTitle = document.createElement("h2");
                        bookNodeTitle.textContent = `${library[i].title}`;
                        bookNode.appendChild(bookNodeTitle);
                        bookNodeTitle.classList.add("book-title");
                        break;
                    case "author":
                        const bookNodeAuthor = document.createElement("h3");
                        bookNodeAuthor.textContent = `${library[i].author}`;
                        bookNode.appendChild(bookNodeAuthor);
                        bookNodeAuthor.classList.add("book-author");
                        break;
                    case "pages":
                        const bookNodePageCount = document.createElement("p");
                        bookNodePageCount.textContent = `${library[i].pages} pages`;
                        bookNode.appendChild(bookNodePageCount);
                        bookNodePageCount.classList.add("book-pages");
                        break;
                    case "status":
                        const bookNodeStatus = document.createElement("p");
                        bookNodeStatus.textContent = `Status: ${library[i].status}`;
                        bookNode.appendChild(bookNodeStatus);
                        bookNodeStatus.classList.add("book-status");
                        break;
                }
            }
        
            bookNode.classList.add("library-book");
            libraryContainer.append(bookNode);
        }
    }
}

function createNewBookFromUser(event) {
    const authorInput = document.getElementById("book-author");
    const titleInput = document.getElementById("book-title");
    const pagesInput = document.getElementById("book-page-count");
    const statusInput = document.getElementById("book-status");

    const formInputString = [titleInput.value, authorInput.value,pagesInput.value, statusInput.value].toString();

    event.preventDefault();
    newBookFormContainer.close(formInputString);
}

newBookBtn.addEventListener("click", () => {newBookFormContainer.showModal()});
submitBtn.addEventListener("click", createNewBookFromUser);
newBookFormContainer.addEventListener("close", (e) => {
    const inputArray = newBookFormContainer.returnValue.split(",");
    console.log(inputArray);
    addBookToLibrary(inputArray[0], inputArray[1], parseInt(inputArray[2]), inputArray[3]);
    // console.log(libraryOfBooks);
})

// test calls and logs
// addBookToLibrary("TWSA", "tls123", 3149, "read");
// addBookToLibrary("Glorious Rivals", "Jennifer Lynn Barnes", 64, "reading");
// console.log(libraryOfBooks);
displayBooksInLibrary(libraryOfBooks);

// pseudocode!!
// create an html form (text inputs for author, title, status; number input for page count; button to submit) inside a dialog, and save their DOM nodes to variables for later access
// set the dialog to be opened by a button once clicked (aka showModal() inside the event listener's function)
// set the dialog to be closed when the form button is clicked; use event.preventDefault() to prevent form submission, and "manually" close the dialog via close()
// ISSUE: need to figure out how to update displayBooksInLibrary() after the form is submitted, for some reason neither it nor library are updated
// ISSUE: form controls aren't cleared each time the dialog is opened, need to reset them each time
// might want to add a button to cancel the dialog if no book is intended to be added + make sure blank inputs aren't allowed