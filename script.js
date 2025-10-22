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

displayBooksInLibrary(libraryOfBooks);