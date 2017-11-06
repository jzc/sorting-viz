"use strict"

const stepInterval = 150;
let list = [];
let container = document.createElement("div");
container.className = "container";
for (let i = 0; i < 10; ++i) {
    let c = document.createElement("div");
    c.className = "item";
    container.appendChild(c);
}
document.body.appendChild(container);

let s = {};
let comparisons = document.createElement("p");
let swaps = document.createElement("p");
reset();

let randomizeButton = document.createElement("button");
randomizeButton.innerHTML = "Randomize";
randomizeButton.onclick = reset;

let sortButton = document.createElement("button");
sortButton.innerHTML = "Sort";
sortButton.onclick = selectionSort;

document.body.appendChild(randomizeButton);
document.body.appendChild(sortButton);
document.body.appendChild(comparisons);
document.body.appendChild(swaps);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function reset() {
    list = [];
    for (let i = 0; i < 10; ++i) {
        let r = getRandomInt(0,10);
        container.children[i].innerHTML = r;
        container.children[i].style.left = i/10*100 + "%";
        container.children[i].style.height = r/10*100 + "%"
        container.children[i].style.backgroundColor = "white";
        list.push({key: r, element: container.children[i]});
    }
    s = {state: 0, cont: true, comparisons: 0, swaps: 0};
    comparisons.innerHTML = "Comparisons: 0";
    swaps.innerHTML = "Swaps: 0";
}

function selectionSort() { 
    let id = setInterval(selectionStep, stepInterval);
    function selectionStep() {
        while (s.cont) {
            switch(s.state) {
                case 0:
                    s.i = 0;
                    s.state = 1;
                    break;
                case 1:
                    s.minIndex = s.i;
                    list[s.i].element.style.backgroundColor = "green";
                    s.j = s.i+1;
                    s.state = 2;
                    s.cont = false;
                    break;
                case 2:
                    if (list[s.j-1].element.style.backgroundColor != "green") {
                        list[s.j-1].element.style.backgroundColor = "white";
                    }
                    if (s.j == list.length) {
                        s.state = 5;
                        break;
                    }
                    list[s.j].element.style.backgroundColor = "red";
                    comparisons.innerHTML = "Comparisons: " + ++s.comparisons;
                    if (list[s.j].key < list[s.minIndex].key) {
                        s.state = 3;
                        s.cont = false;
                        break; 
                    }
                    s.state = 4;
                    break;
                case 3:
                    list[s.minIndex].element.style.backgroundColor = "white";
                    s.minIndex = s.j;
                    list[s.minIndex].element.style.backgroundColor = "green";
                    s.state = 4;
                    break;
                case 4:
                    s.j++;
                    s.cont = false;
                    s.state = 2;
                    break;
                case 5:
                    if (s.i != s.minIndex) {
                        list[s.minIndex].element.style.backgroundColor = "blue";
                        swaps.innerHTML = "Swaps: " + ++s.swaps;
                        let tmp = list[s.i];
                        list[s.i] = list[s.minIndex];
                        list[s.minIndex] = tmp;

                        tmp = list[s.i].element.style.left;
                        list[s.i].element.style.left = list[s.minIndex].element.style.left
                        list[s.minIndex].element.style.left = tmp;

                    } else {
                        list[s.minIndex].element.style.backgroundColor = "blue";
                    }
                    s.state = 1;
                    s.i++;
                    if (s.i == list.length) {
                        s.state = 6;
                    }
                    s.cont = false;
                    break;
                case 6:
                    clearInterval(id);
                    s.cont = false;
                    break;
            }
        }
        s.cont = true;
    }
}