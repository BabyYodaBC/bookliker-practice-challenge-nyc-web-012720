document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
    addUser()
});

function fetchBooks() {
    fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(json => json.forEach(book => {
        renderBook(book)
        
    }))
}

function renderBook(book) {
    const list = document.getElementById("list")
    const li = document.createElement("li")
    li.dataset.id = book.id
    li.innerHTML = `
        <li data-id="${book.id}"> ${book.title}</li>
    `
    list.appendChild(li)

    let bookShow = document.getElementById("show-panel")

    li.addEventListener("click", function(event) { 
        bookShow.innerHTML = `
            <img src=${book.img_url}>
            <p>${book.description}</p>
            <ul id="users"> </ul>
            <button data-id="${book.id}" class="like-btn">Read</button>
        `
        book.users.forEach(user => {
            const ul = document.getElementById("users")
            const li =document.createElement("li")
            li.className = "user"
            li.innerText = `${user.username}`
            li.dataset.id = user.id
            ul.appendChild(li)
        })
    })
}

function addUser() {
    document.addEventListener("click", function (event){
    if (event.target.className === "like-btn"){
    const userList = Array.from(document.getElementsByClassName("user"))
    const arrObj = userList.map(function (line) {
        return {
        id: line.dataset.id,
        username: line.innerText
        }
    })
    const us = {
        "id": 1,
        "username": "haltin"
    }
    arrObj.push(us)

    console.log(userList)
    fetch(`http://localhost:3000/books/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            users: arrObj
        })
        })
    const newLi =document.createElement("li")
    const newUl = document.getElementById("users")
    newLi.innerText= `${us.username}`
    newLi.className= "user"
    newUl.appendChild(newLi)
   
}})
}

        
       