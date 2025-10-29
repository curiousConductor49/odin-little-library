// assign dom elements to variables
const newBookFormContainer = document.querySelector(".new-book-form-container");
const newBookForm = document.querySelector(".new-book-form");
const submitBtn = document.querySelector(".submit-btn");
const newBookBtn = document.querySelector(".new-book-btn");
const libraryContainer = document.querySelector(".library-container");
const emptyInputNotif = document.createElement("p");

// set default text of library
libraryContainer.textContent = "No books here!";

// REFACTOR this to create the notif for an empty input(s) inside createNewBookFromUser
// append to the dialog element and each time an empty input's detected, check the dialog element's children to see if it already has the notif child and only create one if it doesn't (use Element.children)...prevents multiple from being made while also ensuring the notif's contained within the function instead of being an unnecessary global variable
emptyInputNotif.setAttribute("class", "empty-input-notif");
newBookForm.appendChild(emptyInputNotif);

// initialize empty array for books, create constructor function and prototype method for toggling read status
const libraryOfBooks = [];

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.toggleReadStatus = function() {
    this.status = this.status === "read" ? "unread" : "read";   
}

// uses constructor function to add books to library
function addBookToLibrary(title, author, pages, status) {
    const newBookItem = new Book(title, author, pages, status);
    libraryOfBooks.push(newBookItem);
}

// RENAME to createBookForLibrary
function createNewBookFromUser(event) {
    // assign form inputs to variables
    const authorInput = document.getElementById("book-author");
    const titleInput = document.getElementById("book-title");
    const pagesInput = document.getElementById("book-page-count");
    const statusInput = document.getElementById("book-status");
    // store whitespace-trimmed input values in an array
    const formInputArr = [titleInput.value, authorInput.value,pagesInput.value, statusInput.value].map((input) => input.trim());
    // to be refactored to include a notif for empty input(s)
    if (formInputArr.some(val => val === "" || val.trim() === "")) {
        emptyInputNotif.textContent = "Please fill out all fields to add a new book!";
        event.preventDefault();
    } else {
        const formInputString = formInputArr.toString();

        event.preventDefault();
        newBookFormContainer.close(formInputString);
        // clear form control values upon form submission
        titleInput.value = null;
        authorInput.value = null;
        pagesInput.value = null;
        statusInput.value = null;
        emptyInputNotif.textContent = "";
    }
}

// removes a book from library based on book id
function removeBookFromLibrary(bookId) {
    libraryOfBooks.map((book, index) => {
        if (book.id === bookId) {
            libraryOfBooks.splice(index, 1);
        }
    });
}

// iterates over library array and creates a display in the DOM for each book based on their properties
function displayBooksInLibrary(library) {
    if (libraryOfBooks.length > 0) {
        libraryContainer.textContent = "";

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
                        const bookNodeStatus = document.createElement("button");
                        bookNodeStatus.textContent = `Status: ${library[i].status}`;
                        bookNode.appendChild(bookNodeStatus);
                        bookNodeStatus.classList.add("book-status");
                        // listen for a click and toggle read status accordingly
                        bookNodeStatus.addEventListener("click", (e) => {
                            library[i].toggleReadStatus();
                            bookNodeStatus.textContent = `Status: ${library[i].status}`;
                        });

                        break;
                    }
                }
            // create and append a button for each book to remove it when clicked
            const removeBookBtn = document.createElement("button");
            removeBookBtn.textContent = "Remove book";
            removeBookBtn.classList.add("remove-book-btn");
            bookNode.appendChild(removeBookBtn);

            removeBookBtn.addEventListener("click", (e) => {
                removeBookFromLibrary(removeBookBtn.parentElement.getAttribute("data-id"));
                displayBooksInLibrary(libraryOfBooks);
                // console.log(libraryOfBooks);
            });
            
            // give each book element a data-attribute whose value is the book's unique id
            bookNode.setAttribute("data-id", `${library[i].id}`);
    
            bookNode.classList.add("library-book");
            libraryContainer.appendChild(bookNode);
        }
    } else {
        // reset the library's text if no books are in the library
        libraryContainer.textContent = "No books here!";
    }
}

// attach event listeners to add a new book: open dialog, submit form and close dialog
newBookBtn.addEventListener("click", () => {newBookFormContainer.showModal()});
submitBtn.addEventListener("click", createNewBookFromUser);
newBookFormContainer.addEventListener("close", (e) => {
    // store the return value of the closed dialog i.e. the form's inputs and pass it as indexed array values to add a new book
    const inputArray = newBookFormContainer.returnValue.split(",");
    addBookToLibrary(inputArray[0], inputArray[1], inputArray[2], inputArray[3]);
    displayBooksInLibrary(libraryOfBooks);
    // console.log(libraryOfBooks);
})