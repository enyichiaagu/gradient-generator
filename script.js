const 
    color1 = document.querySelector('.color1'),
    color2 = document.querySelector('.color2'),
    preview = document.querySelector('.container'),
    random = document.querySelector('.random'),
    direction = document.querySelector('.direction'),
    overlay3 = document.querySelector('.overlay3'),
    closePattern = document.querySelector('.close-pattern'),
    list = document.getElementsByTagName('li'),
    plus = document.querySelector('.plus'),
    colorGroup = document.querySelector('.colors')


let flow = 'to right,'


const randomColors = () => [
    Math.round(Math.random()*256).toString(16),
    Math.round(Math.random()*256).toString(16),
    Math.round(Math.random()*256).toString(16)
]

const padHex = (arr) => arr.map(
    value => {
       if (value.length == 1) {
           return '0'+ value
       } else {
           return value
       }
    }
)

const hex = (r, g, b) => `#${r}${g}${b}`

function show(element) {
    element.style.display = 'block'
}

function close(element) {
    element.style.display = 'none';
}


function gradientType () {
    if (direction.textContent == list[2].textContent) {
        flow = ''
        return 'radial-gradient'
    } else if (direction.textContent == list[3].textContent) {
        flow = 'to right bottom,'
        return 'linear-gradient'
    } else if (direction.textContent == list[0].textContent) {
        flow = 'to right,'
        return `linear-gradient`
    } else {
        flow = 'to bottom,'
        return `linear-gradient`
    }
}


function print() {
    preview.style.background = `${gradientType()}(${flow} 
        ${color1.value},
        ${color2.value})`
}



function generate() {
    color1.value = hex(...padHex(randomColors()))
    color2.value = hex(...padHex(randomColors()))
    print();
}

function changeDirection(element){
    close(overlay3);
    direction.textContent = element.textContent;
    gradientType();
    print()
}

generate();

//ADDING COLOR FIELD

function add() {
    let newColor = document.createElement('input');
    newColor.type = 'color'
    newColor.value = hex(...padHex(randomColors()))
    colorGroup.appendChild(newColor)
}



//EVENT LISTENERS
random.addEventListener("click", generate);
direction.addEventListener('click', ()=> show(overlay3));
closePattern.addEventListener('click', () => close(overlay3))
color1.addEventListener('input', print)
color2.addEventListener('input', print)
plus.addEventListener('click', add)



for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', ()=> changeDirection(list[i]));
}

