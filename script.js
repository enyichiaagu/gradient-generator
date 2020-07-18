const 
    color1 = document.querySelector('.color1'),
    color2 = document.querySelector('.color2'),


    preview = document.querySelector('.container'),
    random = document.querySelector('.random'),
    textarea = document.querySelector('.source')
    direction = document.querySelector('.direction'),


    overlay1 = document.querySelector('.overlay1'),
    overlay2 = document.querySelector('.overlay2'),
    overlay3 = document.querySelector('.overlay3'),


    close1 = document.querySelector('.close-pattern'),
    close2 = document.querySelector('.close2'),
    close3 = document.querySelector('.close3'),


    list = document.getElementsByTagName('li'),
    colorGroup = document.querySelector('.colors'),
    inputGroup = document.getElementsByTagName('input')


let 
    flow = 'to right,',
    others = '',
    minus,
    array,
    code


const randomColors = () => [
    Math.round(Math.random()*256).toString(16),
    Math.round(Math.random()*256).toString(16),
    Math.round(Math.random()*256).toString(16)
]

const padHex = (arr) => arr.map(
    value => {
       if (value.length < 2) {
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
    } else if (direction.textContent == list[0].textContent) {
        flow = 'to right,'
    } else {
        flow = 'to bottom,'
    }
    return `linear-gradient`
}


function print() {
    preview.style.background = `${gradientType()}(${flow} 
        ${color1.value},
        ${color2.value})`
    code = preview.style.background
    textarea.innerHTML = `.gradient { ${code} }`
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


//ON PAGE LOAD
show(overlay1)
generate()

//EVENT LISTENERS
random.addEventListener("click", generate);
direction.addEventListener('click', ()=> show(overlay3))
color1.addEventListener('input', print)
color2.addEventListener('input', print)
preview.addEventListener('click', () => show(overlay2))

close1.addEventListener('click', () => close(overlay3))

close2.addEventListener('click', () => close(overlay1))
close3.addEventListener('click', () => {
    close(overlay2)
    textarea.innerText = preview.style.background
})



for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', ()=> changeDirection(list[i]));
}