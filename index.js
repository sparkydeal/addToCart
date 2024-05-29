

import {c,cc,add} from "../functions.js"

import {initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://realtime-database-45b7b-default-rtdb.firebaseio.com/"
    
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,'shoppingList')

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
let shoppingList = document.getElementById('shopping-list')
let messageEl = document.getElementById('message')
let list = ''

addButtonEl.addEventListener("click", function() {
    c('in addButtonEl')
    if (inputFieldEl.value === '') {
        messageEl.textContent = `input can't be blank` 
    } else {
        let inputValue = inputFieldEl.value
        push(shoppingListInDB, inputValue)
        
        list = `<li>${inputValue}</li>`
        
        render(list)
        resetInputField()
        message(`${inputValue} added to database`)
    }
    
    
})
//************************************************
//      addEventListener for input field         *
//************************************************
inputFieldEl.addEventListener('keyup', function (e) {
    
    
   
    if ((e.key === 'Enter' || e.keyCode === 13)) {
        let inputValue = inputFieldEl.value
        push(shoppingListInDB, inputValue)
        list = `${inputValue}`
        resetInputField()
        message(`${inputValue} added to database`)
        } 
})

function resetInputField() {
    // c('function clear input Field')
    inputFieldEl.value = ''
}

//************************************************
//             onValue                           *
//************************************************
let shoppingListArr = []
onValue(shoppingListInDB, function(snapshot) {
    c('function onValue')
    
    if (snapshot.exists()) {
        
        // c('if snapshot exists')
        shoppingListArr = Object.entries(snapshot.val())
        // c('shoppingListArr.length =>',shoppingListArr.length)
        // c(shoppingListArr)
        messageEl.textContent = `${shoppingListArr.length} items in basket`
        // c(messageEl.textContent)
    
        
        clearShoppingList()
        for (let i = 0; i< shoppingListArr.length;i++) {
            let currentItem = shoppingListArr[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            // c(currentItemId)
            // c(currentItem,currentItemId,currentItemValue)
            render(currentItem)
        }
        } else  {
            messageEl.textContent = 'basket is empty'
            // c('basket is empty')
            clearShoppingList()
            
            shoppingListArr = ''

        }
    
    
    
})
//************************************************
//             appendItem  add item to list      *
//************************************************
function render(item) {
    // c('function render','shoppingList =>',shoppingList)
    // c('item =>',item)
    
    // shoppingList.innerHTML += `<li>${list}</li>`
    let newEl = document.createElement('li')
    let itemId = item[0]
    let itemValue = item[1]
    // c('itemValue',itemValue)
    newEl.textContent = itemValue
    // c(shoppingList,'before add')
    
    // c('newEl.textContent',newEl.textContent)
   
    // c(`shopping list = ${shoppingList}`)
    // c(`newel = ${newEl}`)

    newEl.addEventListener('dblclick',function() {
        // c(newEl.textContent)
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemId}`)
        remove(exactLocationOfItemInDB)
        // c(exactLocationOfItemInDB)
        
    })

    shoppingList.append(newEl)
    c(shoppingList,'after add')
    messageEl.textContent += ' ' + newEl.innerHTML
}

function message(what) {
    // c(what)
}

function clearShoppingList() {
    // c('function clear shoppingList')
    shoppingList.innerHTML = '';
}






// let scrimbaUsers = {
//     "00": "sindre@scrimba.com",
//     "01": "per@scrimba.com",
//     "02": "frode@scrimba.com"
// }

// let sEmails = Object.values(scrimbaUsers)
// let sIds = Object.keys(scrimbaUsers)
// let sEntries = Object.entries(scrimbaUsers)
// cc('sEmails',sEmails)
// cc('sIds',sIds)
// cc('sEntries',sEntries)


