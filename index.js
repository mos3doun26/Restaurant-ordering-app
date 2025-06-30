// importing data
import { menuArray } from './data.js'

let orderListItems = []

// Event listeners
document.addEventListener('DOMContentLoaded', render)
document.getElementById('complete-order-btn').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'flex'
})
document.getElementById('pay-btn').addEventListener('click', paymentProcess)

document.addEventListener('click', function (e) {
    if (e.target.id === 'add-item-btn') {
        addItem(Number(e.target.dataset.itemId))
    } else if (e.target.id === 'remove-item-btn') {
        removeItem(Number(e.target.dataset.itemId))
    } else if (e.target.id === 'modal') {
        closeModal()
    }
})

// add item to order list
function addItem(itemId) {
    const targetItem = menuArray.filter((item) => item.id === itemId)[0]
    if (!orderListItems.includes(targetItem)) {
        orderListItems.push(targetItem)
        renderOrder()
    }
}

// remove item for order list
function removeItem(itemId) {
    const targetItem = orderListItems.filter((item) => item.id === itemId)[0]
    if (targetItem) {
        orderListItems = orderListItems.filter((item) => item.id !== itemId)
    }
    renderOrder()
}

// get the total price
function getTotalPrice() {
    return orderListItems.reduce(function (total, currentItem) {
        return total + currentItem.price
    }, 0)
}

// payment processing
function paymentProcess() {
    const name = validName()
    const cardNumber = validCardNumber()
    const cvv = validCvv()

    if (name && cardNumber && cvv) {
        closeModal()
        const orderConatainer = document.getElementById('order-container')
        orderConatainer.innerHTML = `<p>Thanks, ${name}! Your order is on its way!</p>`
        orderConatainer.classList.add('order-done')
    }
}

// validate on name
function validName() {
    const name = document.getElementById('name').value
    if (name.length >= 3) {
        return name
    }
    return window.alert("Name: Should be more than 3 characters!!")
}

// validate on card number
function validCardNumber() {
    const cardNumber = document.getElementById('card-number').value
    if (cardNumber.length === 16) {
        return cardNumber
    }
    return window.alert("Card Number: Should be 16 number!!")
}

// validate on cvv
function validCvv() {
    const cvv = document.getElementById('cvv').value
    if (cvv.length === 3) {
        return cvv
    }
    return window.alert("CVV: Should be 3 numbers!!")
}
// get order html
function getOrderItemsListHtml() {
    return orderListItems.map(function (item) {
        return `<div class="order">
                    <h2 class="item-name">${item.name}</h2>
                    <button class="remove-item-btn" id="remove-item-btn" data-item-id="${item.id}">remove</button>
                    <h3 class="order-item-price">$${item.price}</h3>
                </div>`
    }).join('')
}

// render order
function renderOrder() {
    if (orderListItems.length !== 0) {
        document.getElementById('order-container').style.display = 'flex'
        document.getElementById('order-list').innerHTML = getOrderItemsListHtml()
        document.getElementById('total-price').textContent = `$${getTotalPrice()}`
    } else {
        document.getElementById('order-container').style.display = 'none'
    }
}

// closing the modal
function closeModal() {
    document.getElementById('modal').style.display = 'none'
}


// get the html of the items list
function getItemsListHtml() {
    return menuArray.map(function (item) {
        return `<section class="item" id="${item.id}">
                    <p class="item-emoji">${item.emoji}</p>
                    <div class="info">
                        <h2 class="item-name">${item.name}</h2>
                        <p class="gredients">${item.ingredients.join(', ')}</p>
                        <h3 class="item-price">$${item.price}</h3>
                    </div>
                    <div class="add-icon">
                        <i class="fa-solid fa-plus" id="add-item-btn" data-item-id="${item.id}"></i>
                    </div>
                </section>
                `
    }).join('')
}

// render items
function render() {
    document.getElementById('list-items').innerHTML = getItemsListHtml()
}



// inputs criteria restrictions
document.getElementById('name').addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z ]/g, '')
})

document.getElementById('card-number').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '')
})

document.getElementById('cvv').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '')
})