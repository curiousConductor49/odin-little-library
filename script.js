const newBookFormContainer = document.querySelector(".new-book-form-container");
const newBookForm = document.querySelector(".new-book-form");
const submitBtn = document.querySelector(".submit-btn");
const newBookBtn = document.querySelector(".new-book-btn");
const libraryContainer = document.querySelector(".library-container");
const emptyInputNotif = document.createElement("p");

libraryContainer.textContent = "No books here!";

emptyInputNotif.setAttribute("class", "empty-input-notif");
newBookForm.appendChild(emptyInputNotif);

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
                        const bookNodeStatus = document.createElement("p");
                        bookNodeStatus.textContent = `Status: ${library[i].status}`;
                        bookNode.appendChild(bookNodeStatus);
                        bookNodeStatus.classList.add("book-status");
                        break;
                    }
                }
            
            const removeBookBtn = document.createElement("button");
            removeBookBtn.textContent = "Remove book";
            removeBookBtn.classList.add("remove-book-btn");
            bookNode.appendChild(removeBookBtn);

            removeBookBtn.addEventListener("click", (e) => {
                removeBookFromLibrary(removeBookBtn.parentElement.getAttribute("data-id"));
                displayBooksInLibrary(libraryOfBooks);
                // console.log(libraryOfBooks);
            });
    
            bookNode.setAttribute("data-id", `${library[i].id}`);
    
            bookNode.classList.add("library-book");
            libraryContainer.appendChild(bookNode);
        }
    } else {
        libraryContainer.textContent = "No books here!";
    }
}

newBookBtn.addEventListener("click", () => {newBookFormContainer.showModal()});
submitBtn.addEventListener("click", createNewBookFromUser);
newBookFormContainer.addEventListener("close", (e) => {
    const inputArray = newBookFormContainer.returnValue.split(",");
    addBookToLibrary(inputArray[0], inputArray[1], inputArray[2], inputArray[3]);
    displayBooksInLibrary(libraryOfBooks);
    // console.log(libraryOfBooks);
})

// pseudocode!!