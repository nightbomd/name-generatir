const userNameInput = document.getElementById('nameInput');
const superheroes = document.querySelectorAll('.superhero');
const bravery = document.getElementById('braveryRange');
const color = document.getElementById('colorPicker');
const personalitySelect = document.getElementById('personalitySelect');

function generateName(name, superhero, braveryLevel, color, personality) {
    let generatedName = {
        prefix: braveryLevel,
        first: name,
        middle: superhero,
        last: personality,
        suffix: color,
    }

    if (generatedName.prefix > 5) {
        generatedName.prefix = "audacious";
    }
    else if (generatedName.prefix <= 5 && generatedName.prefix > 2) {
        generatedName.prefix = "eager";
    }
    else {
        generatedName.prefix = "timid";
    }
    
    return generatedName;
}

function displayName() {

}