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
// addBookToLibrary("TWSA", "tls123", 3149, "read");
// addBookToLibrary("Glorious Rivals", "Jennifer Lynn Barnes", 64, "reading");

// console.log(libraryOfBooks);

// pseudocode!!
// we can have a grid container in the html
// for every book obj in the array...
// create an element populated with the book obj's info (make sure it has a class attribute)
// add this element to the DOM, appending it as a child node of the grid container
// in the css, target the element's class attribute to style it as a grid item in the grid container

function displayBooksInLibrary(library) {
    for (let i = 0; i < library.length; i++) {
        const bookNode = document.createElement("article");
        const bookNodeTitle = document.createElement("h2");
        const bookNodeAuthor = document.createElement("h3");
        const bookNodePageNum = document.createElement("p");
        const bookNodeStatus = document.createElement("p");

        bookNodeTitle.textContent = `${library[i].title}`;
        bookNodeAuthor.textContent = `${library[i].author}`;
        bookNodePageNum.textContent = `${library[i].pages}`;
        bookNodeStatus.textContent = `${library[i].status}`;

        bookNode.appendChild(bookNodeTitle);
        bookNode.appendChild(bookNodeAuthor);
        bookNode.appendChild(bookNodePageNum);
        bookNode.appendChild(bookNodeStatus);
        
        bookNode.classList.add("library-book");
    }
}