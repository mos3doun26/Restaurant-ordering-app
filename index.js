// importing data
import { menuArray } from './data.js'

let orderListItems = []

// Event listeners
document.addEventListener('DOMContentLoaded', render)
document.getElementById('complete-order-btn').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'flex'
    document.getElementById('name').focus()
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
function paymentProcess(e) {
    e.preventDefault()

    // fiels values
    const result = inputsPatterns.map((inputObj) => {
        return validInput(inputObj.input, inputObj.regex)
    })

    if (result.includes(false)) {
        document.getElementById('pay-btn').disabled = true
    } else {
        document.getElementById('pay-btn').disabled = false
        closeModal()

        document.getElementById('order-container').innerHTML = `<div class='order-done'>
            <p>Thanks, ${inputsPatterns[0].input.value}! Your order is on its way!</p>
        </div>`

    }

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


// return array of object each object have the input element and acceptance value pattern(regex)
function getInputsPatternsArr() {
    const patterns = [/^[a-zA-Z ]{3,20}$/, /^\d{16}$/, /^\d{3}$/]
    const inputs = [...document.getElementsByTagName('input')] // turn html collection into array

    return inputs.map((inputEl, index) => {
        return {
            input: inputEl,
            regex: patterns[index]
        }
    })
}

// validation of input
function validInput(inputEl, pattern) {
    return pattern.test(inputEl.value)
}

// show input status
function showInputStatus(inputEl, pattern, touched) {
    inputEl.className = 'normal'
    let helpEl = inputEl.parentElement.querySelector('.help')

    if (touched) {
        const inputClass = validInput(inputEl, pattern) ? 'input-success' : 'input-error'

        inputEl.classList.replace(inputEl.className, inputClass)

        if (validInput(inputEl, pattern)) {
            helpEl.classList.remove('help-error')
            helpEl.classList.add('help-success')
        } else {
            helpEl.classList.remove('help-success')
            helpEl.classList.add('help-error')
        }

    }
}

// array of inputs with their regex
const inputsPatterns = getInputsPatternsArr()

// event listener for each input while entering the values of inputs
inputsPatterns.forEach((inputObj) => {
    inputObj.input.addEventListener('input', () => {
        // console.log(validInput(inputObj.input, inputObj.regex))
        // here will show the status of input if the user click on the feild(touched = true)
        const touched = document.activeElement === inputObj.input
        showInputStatus(inputObj.input, inputObj.regex, touched)
    })
})