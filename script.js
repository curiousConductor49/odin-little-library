const newBookFormContainer = document.querySelector(".new-book-form-container");
const newBookForm = document.querySelector(".new-book-form");
const submitBtn = document.querySelector(".submit-btn");
const newBookBtn = document.querySelector(".new-book-btn");
const libraryContainer = document.querySelector(".library-container");
const emptyInputNotif = document.createElement("p");
const removeBookBtn = document.createElement("button");

libraryContainer.textContent = "No books here!";

emptyInputNotif.setAttribute("class", "empty-input-notif");
newBookForm.appendChild(emptyInputNotif);

removeBookBtn.textContent = "Remove book";
removeBookBtn.classList.add("remove-book-btn");


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
    if (libraryOfBooks.length > 0) {
        libraryContainer.textContent = "";
    }

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
        
        bookNode.appendChild(removeBookBtn);

        bookNode.setAttribute("data-id", `${library[i].id}`);

        bookNode.classList.add("library-book");
        libraryContainer.appendChild(bookNode);
        
        // console.log(bookNode.getAttribute("data-id"));
    }
}

function createNewBookFromUser(event) {
    const authorInput = document.getElementById("book-author");
    const titleInput = document.getElementById("book-title");
    const pagesInput = document.getElementById("book-page-count");
    const statusInput = document.getElementById("book-status");

    const formInputArr = [titleInput.value, authorInput.value,pagesInput.value, statusInput.value].map((input) => input.trim());

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

function removeBookFromLibrary(bookId) {
    libraryOfBooks.map((book, index) => {
        if (book.id === bookId) {
            libraryOfBooks.splice(index, 1);
        }
    });
}

newBookBtn.addEventListener("click", () => {newBookFormContainer.showModal()});
submitBtn.addEventListener("click", createNewBookFromUser);
newBookFormContainer.addEventListener("close", (e) => {
    const inputArray = newBookFormContainer.returnValue.split(",");
    addBookToLibrary(inputArray[0], inputArray[1], inputArray[2], inputArray[3]);
    displayBooksInLibrary(libraryOfBooks);
    console.log(libraryOfBooks);
})

removeBookBtn.addEventListener("click", () => {
    // console.log(removeBookBtn.parentElement.getAttribute("data-id"));
    removeBookFromLibrary(removeBookBtn.parentElement.getAttribute("data-id"));
    displayBooksInLibrary(libraryOfBooks);
    console.log(libraryOfBooks);
});

// test calls and logs
// addBookToLibrary("TWSA", "tls123", 3149, "read");
// addBookToLibrary("Glorious Rivals", "Jennifer Lynn Barnes", 64, "reading");
// console.log(libraryOfBooks);
// displayBooksInLibrary(libraryOfBooks);

// pseudocode!!
// give each dom book element:
    // a remove button
    // a data attribute for their unique id
// attach event listener to remove-button: callback function should identify the right book in the library array w/ the id, remove it, and call the display books array