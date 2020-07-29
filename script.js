const 
    inputGroup = document.getElementsByTagName('input')
    add = document.querySelector('.add')
    minus = document.querySelector('.remove')
    inputBody = document.querySelector('.colors')
    preview = document.querySelector('.container')
    random = document.querySelector('.random')
    direction = document.querySelector('.direction')
    list = document.getElementsByTagName('li')
    textarea = document.querySelector('.source')

    overlay1 = document.querySelector('.overlay1')
    overlay2 = document.querySelector('.overlay2')
    overlay3 = document.querySelector('.overlay3')

    close1 = document.querySelector('.close1')
    close2 = document.querySelector('.close2')
    close3 = document.querySelector('.close3')

let code;


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

show(overlay1)


function loopStart() {
    for (val of inputGroup) {
        val.value = hex(...padHex(randomColors()))
    }
    bgColor()
}
loopStart()

function bgColor() {
    code = ''
    for (val of inputGroup) {
        if (val == inputGroup[inputGroup.length - 1] ) {
            code += val.value
        } else {code += val.value + ', '}
        
    }
    preview.style.background = `${gradientType()}(${flow} ${code})`
    textarea.textContent = `.gradient { ${preview.style.background} }`
}
bgColor()

function changeDirection(element){
    close(overlay3);
    direction.textContent = element.textContent;
    gradientType();
    bgColor()
}

function reverse () {
    for (let i = 0; i < Math.floor(inputGroup.length/2); i++) {
        let hold = inputGroup[i]
        console.log(hold)
        inputGroup[i] = inputGroup[inputGroup.length - 1 - i]
        console.log(inputGroup[inputGroup.length - 1 - i])
        inputGroup[inputGroup.length - 1 - i] = hold
    }
    bgColor()
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


function addElement() {
    let elem = document.createElement('input')
    elem.className = `color${inputGroup.length + 1}`
    elem.type = 'color'
    elem.value = hex(...padHex(randomColors()))
    elem.addEventListener('input', bgColor)
    inputBody.appendChild(elem)
    bgColor()

    if (inputGroup.length > 2) show(minus)
    if (inputGroup.length == 5) close(add)
}

function removeElement() {
    inputGroup[inputGroup.length - 1].remove()
    show(add)
    bgColor()

    if (inputGroup.length < 3) close(minus)
}

add.addEventListener('click', addElement)
minus.addEventListener('click', removeElement)
random.addEventListener('click', loopStart)
direction.addEventListener('click', ()=> show(overlay3))
preview.addEventListener('click', ()=> show(overlay2))

close1.addEventListener('click', ()=> close(overlay1))
close2.addEventListener('click', ()=> close(overlay2))
close3.addEventListener('click', ()=> close(overlay3))


for (let i = 0; i < 2; i++) {
    inputGroup[i].addEventListener('input', bgColor)
}
for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', ()=> changeDirection(list[i]));
}