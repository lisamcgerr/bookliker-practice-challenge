document.addEventListener("DOMContentLoaded", function() {
  fetchBooks()
  likeBook()
});

const myUser = {"id":1, "username":"pouros"}

function fetchBooks(){
  fetch ("http://localhost:3000/books")
  .then(resp => resp.json())
  .then(books => books.forEach(function(book){
      renderBook(book)
  }))
}

function renderBook(book){
  const div = document.querySelector("#list-panel")
  const li = document.createElement("li")

  li.addEventListener('click', function(event){
      event.preventDefault
      fetchBookDetails(event.target.dataset.id)
  })
  li.dataset.id = book.id
  li.innerText = book.title
  div.append(li)
}

function fetchBookDetails(id){
  fetch (`http://localhost:3000/books/${id}`)
  .then(resp => resp.json())
  .then(book => renderBookDetails(book))
}

function renderBookDetails(book){
  const div = document.querySelector('#show-panel')
  const p = document.createElement("p")
  const p2 = document.createElement("p")
  const p3 = document.createElement("p")
  const button = document.createElement("button")
  const img = document.createElement("img")

  div.innerHTML= (" ")
  p.innerText = book.title
  p2.innerText = book.author
  p3.innerText = book.description
  img.src = book.img_url
  button.setAttribute('class', 'like-button')
  button.dataset.id = book.id
  button.innerText = "LIKE"
  const ul = document.createElement("ul")
  ul.id = "like-panel"


  div.append(img, p, p2, p3, ul)
 book.users.forEach(user => renderUserList(user))
 div.append(button)



}

function renderUserList(user){

  const ul = document.querySelector('#like-panel')
  const li = document.createElement("li")
      li.dataset.id = user.id
       li.innerHTML = user.username

       ul.append(li)
}

function likeBook(){

  const div = document.querySelector("#show-panel")
  div.addEventListener("click", function(event){
      event.preventDefault

      if (event.target.className === "like-button"){
          const usersList = event.target.previousElementSibling

          const id = event.target.dataset.id

        const children = Array.from(usersList.children)
          const currentUsers = []

         children.forEach(function(userLi){
             const user = {id: userLi.dataset.id, username: userLi.innerText}
             currentUsers.push(user)
        
          const reqObj = {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  "users": [...currentUsers, myUser]
                } )
          }

              fetch(`http://localhost:3000/books/${id}`, reqObj)
              .then(resp => resp.json())
              .then(updatedList => {
                  const li = document.createElement("li")
                  li.innerText = myUser.username
                  usersList.append(li)
                  // changeButton()
              })



          }

      }

      )}