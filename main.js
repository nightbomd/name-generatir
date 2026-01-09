

function generateName(name, superhero, braveryLevel, color, personality) {
    let generatedName = {
        prefix: braveryLevel,
        first: name,
        middle: superhero,
        last: personality,
        suffix: color,
    }

    if (generatedName.prefix > 5) {
        generatedName.prefix = "Audacious";
    }
    else if (generatedName.prefix <= 5 && generatedName.prefix > 2) {
        generatedName.prefix = "Eager";
    }
    else {
        generatedName.prefix = "Timid";
    }
    if (!generatedName.first.trim()) {
        alert("Please enter your name!");
        return;
    }
    switch (generatedName.middle) {
        case "batman":
            generatedName.middle = "Brooding";
            break;
        case "superman":
            generatedName.middle = "Heroic";
            break;
        case "wonderwoman":
            generatedName.middle = "Amazonian";
            break;
        case "spiderman":
            generatedName.middle = "Raffish";
            break;
    }
    if (generatedName.last === "nice") {
        generatedName.last = "Kind soldier";
    }
    else if (generatedName.last === "mean") {
        generatedName.last = "Ruthless warrior";
    }
    else {
        generatedName.last = "Neutral Party";
    }
    if (generatedName.suffix === "#ff0000") {
        generatedName.suffix = "of Flames";
    }
    else if (generatedName.suffix === "#0000ff") {
        generatedName.suffix = "of the Ocean";
    }
    else {
        generatedName.suffix = "of the Earth";
    }


    let newName = `${generatedName.prefix} ${generatedName.first} ${generatedName.middle} ${generatedName.last} ${generatedName.suffix}`;
    return newName;
}

function displayName() {
    const name =  generateName(
        document.getElementById('nameInput').value,
        document.querySelector('.superhero:checked')?.value,
        document.getElementById('braveryRange').value,
        document.getElementById('colorPicker').value,
        document.getElementById('personalitySelect').value
    );
    if (name) {
        let result =  document.getElementById('result');
        result.style.display = 'block';
        return result.innerHTML = `<div class="p-3 text-center"><span class="fw-bold fs-4 mb-5">Your Superhero Name is:</span> <h3>${name}</h3></div>`;
    }
}

document.getElementById('generateBtn').addEventListener('click', displayName);