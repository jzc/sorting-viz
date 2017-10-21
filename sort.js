function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function newList() {
    var l = []
    for (var i = 0; i < 10; ++i) { l.push(getRandomInt(0,10)) }
    return l
}

function updateList() {
    for (var i = 0; i < listElements.children.length; ++i) {
        listElements.children[i].innerHTML = list[i]
    } 
}

var list = newList()
var listElements = document.createElement("div");
listElements.className = "container"
for (var i = 0; i < list.length; ++i) {
    var c = document.createElement("div")
    c.className = "item"
    c.innerHTML = list[i]
    listElements.appendChild(c)
}
document.body.appendChild(listElements)

var selectionSort = document.createElement("button")
selectionSort.innerHTML = "Sort"
selectionSort.onclick = function() {
    for (var i = 0; i < list.length; ++i) {
        var minIndex = i
        for (var j = i+1; j !== list.length; ++j) {
            if (list[j] < list[minIndex]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {
            var temp = list[i]
            list[i] = list[minIndex]
            list[minIndex] = temp
        }
    }
    updateList()
}
document.body.appendChild(selectionSort)

var randomize = document.createElement("button")
randomize.innerHTML = "New list"
randomize.onclick= function() {
    list = newList()
    updateList()
}
document.body.appendChild(randomize)