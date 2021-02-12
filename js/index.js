document.addEventListener("DOMContentLoaded", function() {});

function main(){
    fetchBooks()
}

function fetchBooks(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => {
        books.forEach(function(book){
            renderBookList(book)
        })
    })
}

function renderBookList(book){
    const booksContainer = document.querySelector('#list')
    
    const li = document.createElement('li')
    li.dataset.id = book.id
    li.className = 'book-list'
    li.innerText = book.title
    li.addEventListener('click', function(e){
        if (e.target.className === 'book-list'){
            const id = e.target.dataset.id
            fetchBookDetails(id)
        }
    })
    
    booksContainer.append(li)
}

function fetchBookDetails(id){
    fetch(`http://localhost:3000/books/${id}`)
    .then(resp => resp.json())
    .then(book => {
        renderBook(book)
    })
}

function renderBook(book){
    const bookContainer = document.querySelector('#show-panel')
    bookContainer.innerHTML = " "

    const h1 = document.createElement('h1')
    h1.innerText = book.title

    const h2 = document.createElement('h2')
    h2.innerText = book.author

    const img = document.createElement('img')
    img.setAttribute('src', book.img_url)

    bookContainer.append(h1, h2, img)
}


main()
