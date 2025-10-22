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

// test calls and logs
addBookToLibrary("TWSA", "tls123", 3149, "read");
addBookToLibrary("Glorious Rivals", "Jennifer Lynn Barnes", 64, "reading");

// console.log(libraryOfBooks);

// pseudocode!!
// we can have a grid container in the html
// for every book obj in the array...
// create an element populated with the book obj's info (make sure it has a class attribute)
// add this element to the DOM, appending it as a child node of the grid container
// in the css, target the element's class attribute to style it as a grid item in the grid container

function displayBooksInLibrary(library) {
    const libraryContainer = document.querySelector(".library-container");

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

displayBooksInLibrary(libraryOfBooks);