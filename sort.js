"use strict"

let list = [];
let container = document.createElement("div");
let elements = [];
container.className = "container";
for (let i = 0; i < 10; ++i) {
    let c = document.createElement("div");
    c.className = "item";
    let r = getRandomInt(0,10);
    c.innerHTML = r;
    c.style.left = i/10*100 + "%";
    c.style.height = r/10*100 + "%"
    list.push({key: r, element: c});
    container.appendChild(c);
}
document.body.appendChild(container);

let comparisons = document.createElement("p");
comparisons.innerHTML = "Comparisons: 0";
let swaps = document.createElement("p");
swaps.innerHTML = "Swaps: 0";
let s = {state: 0, cont: true, comparisons: 0, swaps: 0}
let sortButton = document.createElement("button");
sortButton.innerHTML = "Sort";
sortButton.onclick = function () { 
    let id = setInterval(selectionStep, 150);
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

document.body.appendChild(sortButton);
document.body.appendChild(comparisons);
document.body.appendChild(swaps);


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}