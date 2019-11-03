document.addEventListener("DOMContentLoaded", () => {
    // assign elements to vars
    const newMonsterForm = document.getElementById("create-monster")
    const monsterContainer = document.getElementById("monster-container")
    const nextButton = document.getElementById("forward")
    const backButton = document.getElementById("back")
    let counter = 1

    // Above your list of monsters, you should have a form to create a new monster. 
    // You should have fields for name, age, and description, and a 'Create Monster Button'. 
    let form = document.createElement("form")
    form.method = 'POST'
    form.action = 'submit'

    let nameInput = document.createElement('input')
    let nameLabel = document.createElement('label')
    nameLabel.textContent = 'Name: '
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('name', 'name')

    let ageLabel = document.createElement('label')
    ageLabel.textContent = 'Age: '
    let ageInput = document.createElement('input')
    ageInput.setAttribute('type', 'text')
    ageInput.setAttribute('name', 'age')

    let descLabel = document.createElement('label')
    descLabel.textContent = 'Description: '
    let descInput = document.createElement('TEXTAREA')
    descInput.setAttribute('type', 'text')
    descInput.setAttribute('name', 'description')

    let submitButton = document.createElement('button')
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('name', 'submit')
    submitButton.textContent = 'Create Monster'

    form.appendChild(nameLabel)
    form.appendChild(nameInput)
    form.appendChild(ageLabel)
    form.appendChild(ageInput)
    form.appendChild(descLabel)
    form.appendChild(descInput)
    form.appendChild(submitButton)
    newMonsterForm.appendChild(form)

    // When you click the button, the monster should be added to the list and saved in the API.
    form.addEventListener('submit', (event) => {
        event.preventDefault()

        let formValues = {
            name: event.target.name.value,
            age: event.target.age.value,
            description: event.target.description.value
        }

        let configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(formValues)
        }
        const postMonster = async () => {
            let response = await fetch ("http://localhost:3000/monsters", configObj)
            let newMonster = await response.json()
            appendMonster(newMonster)
        }
        postMonster()
    })

    // When the page loads, show the first 50 monsters.
    // Each monster's name, age, and description should be shown.
    const getMonsters = async () => {
        let response = await fetch("http://localhost:3000/monsters/?_limit=50")
        let monsters = await response.json()
        monsters.forEach(monster => {
            appendMonster(monster)
        })
    }

    // At the end of the list of monsters, show a button. 
    // When clicked, the button should load the next 50 monsters and show them.
    const nextFiftyMonsters = async (num) => {
        let response = await fetch("http://localhost:3000/monsters/?_limit=50&_page=" + num)
        let moreMonsters = await response.json()
        moreMonsters.forEach(monster => {
            appendMonster(monster)
        })
    }

    function appendMonster(monster) {
        let monsterLi = document.createElement("div")
        let monsterNameHeader = document.createElement("h2")
        let monsterName = document.createTextNode(monster.name)
        monsterNameHeader.appendChild(monsterName)
        let monsterAge = document.createTextNode("Age: " + monster.age)
        let monsterDescP = document.createElement("p")
        let monsterDesc = document.createTextNode(monster.description)
        monsterDescP.appendChild(monsterDesc)
        monsterLi.appendChild(monsterNameHeader)
        monsterLi.appendChild(monsterAge)
        monsterLi.appendChild(monsterDescP)
        monsterContainer.appendChild(monsterLi)
    }

    getMonsters()

    nextButton.addEventListener("click", ()=>{
        counter += 1
        nextFiftyMonsters(counter)
    })

})