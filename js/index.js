document.addEventListener("DOMContentLoaded", function() {});

function main(){
    fetchBooks()
    createLikeListener()
    createDeleteListener()
}


function fetchBooks(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books =>{
        console.log(books)
        books.forEach(function(book){
            renderBook(book)
        })
    })
}
const div = document.querySelector('#show-panel')
 function renderBook(book) {
     
     let bookDiv = document.createElement('div')
     bookDiv.dataset.id = book.id

     const img = document.createElement('img')
     img.setAttribute('src', book.img_url)

     const h2 = document.createElement('h2')
     h2.innerText = book.title

     const deleteBtn = document.createElement('button')
     deleteBtn.className = 'delete-btn'
     deleteBtn.dataset.id = book.id
     deleteBtn.innerText = 'delete'

     const h3 = document.createElement('h3')
     h3.innerText = book.author

     const h4 = document.createElement('h4')
     h4.innerText = book.subtitle
      
     const pTag = document.createElement('p')
     pTag.innerText = `${book.likes} likes`

     const likeBtn = document.createElement('button')
     likeBtn.className = 'like-btn'
     likeBtn.setAttribute('id', book.id)
     likeBtn.innerText = "like"

     bookDiv.append(img, h2, deleteBtn, h3, h4, likeBtn, pTag)
     div.append(bookDiv)

 }


function createLikeListener(){
    const div = document.querySelector('#show-panel')
    div.addEventListener('click', function(e){
        //console.log(e.target)
        if (e.target.className === 'like-btn'){
            likeBook(e)
        }
    })
}

function likeBook(e){
    console.log(e.target.id)
    const id = e.target.id
    const pTag = e.target.nextElementSibling
    let likes = parseInt(pTag.innerText)

    const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            likes: likes + 1
        })
    }

    fetch(`http://localhost:3000/books/${id}`, reqObj)
    .then(resp => resp.json())
    .then(book =>{
        pTag.innerText = likes + 1
    })

}

function createDeleteListener(){
    const div = document.querySelector('#show-panel')
    div.addEventListener('click', function(e){
       // e.preventDefault()

        if (e.target.className = 'delete-btn') {
           
            const id = e.target.dataset.id

            const reqObj = {
                method: 'DELETE'
            }

            fetch(`http://localhost:3000/books/${id}`, reqObj) 
            .then(resp => resp.json())
            .then(book => {
                console.log(e.target)
                e.target.parentNode.remove()

                //the parent node of likes button is the div
            })
        }
    })

}

main()