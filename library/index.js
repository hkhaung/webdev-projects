const myLibrary = [];

function Book(title, author, description='') {
	this.title = title;
	this.author = author;
	this.description = description;

	// getters
	this.getTitle = function() {
		return this.title;
	}

	this.getAuthor = function() {
		return this.author;
	}

	this.getDescription = function() {
		return this.description;
	}

	// setters
	this.setTitle = function(newTitle) {
		this.title = newTitle;
	}

	this.setAuthor = function(newAuthor) {
		this.author = newAuthor;
	}

	this.setDescription = function(newDescription) {
		this.description = newDescription;
	}
}

function addBookToLibrary(title, author, description) {
	myLibrary.push(new Book(title, author, description));
}

function displayBooks() {
	for (const book of myLibrary) {
		console.log(book.getTitle());
		console.log(book.getAuthor());
		console.log(book.getDescription());
		console.log('\n');
	}
}
