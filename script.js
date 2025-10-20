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