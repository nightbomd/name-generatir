
import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';
const title = document.querySelector('.title');
const spaceCanvas = document.getElementById('space');
const ctx = spaceCanvas.getContext('2d');

const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

spaceCanvas.width = window.innerWidth;
spaceCanvas.height = window.innerHeight;

let stars = []
for (let i = 0; i < 400; i++) {
    stars.push({
        x: Math.random() * spaceCanvas.width,
        y: Math.random() * spaceCanvas.height,
        radius: Math.random() * 4 + 3,
        speed: Math.random() * 1 + 0.5,
    })
}

function drawStars() {
    ctx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    stars.forEach(star => {
        ctx.shadowColor = "white";
        ctx.shadowBlur = star.radius * 2;
        ctx.fillRect(star.x, star.y, star.radius, star.radius);

    });

}
const lastPos = { x: mouse.x, y: mouse.y };

function animate() {
    ctx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    stars.forEach(star => {
        star.y += star.speed;
        star.x += star.speed * Math.sin(star.y * 0.005);

        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
            star.x -= dx / (distance * 6) * Math.sin(star.y * 180);
            star.y -= dy / distance * 6;
            
        }

        if (star.y > spaceCanvas.height) star.y = 0;
        if (star.x > spaceCanvas.width) star.x = 0;
        if (star.x < 0) star.x = spaceCanvas.width;



        ctx.fillStyle = `hsl(${(star.y / spaceCanvas.height) * 360}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(
            lastPos.x + Math.sin(Date.now() * 0.01) * 4, 
            lastPos.y + Math.cos(Date.now() * 0.01) * 4 
        );
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `hsl(${(star.y / spaceCanvas.height) * 360}, 100%, 50%)`;
        ctx.shadowColor = `hsl(${(star.y / spaceCanvas.height) * 360}, 100%, 50%)`;
        ctx.lineWidth = 15;
        ctx.shadowBlur = 30;
        ctx.stroke();

        lastPos.x = mouse.x;
        lastPos.y = mouse.y;
        ctx.fillRect(star.x, star.y, star.radius, star.radius);
    });

    requestAnimationFrame(animate);
}

const text = title.textContent;
title.innerHTML = text.split('').map(char =>
    `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
).join('');

anime({
    targets: '.char',
    translateY: [
        { value: -44, duration: 600, easing: 'easeOutExpo' },
        { value: 0, duration: 800, delay: 100, easing: 'easeOutBounce' }
    ],
    rotate: {
        value: '-1turn',
        duration: 600,
        easing: 'easeOutExpo'
    },
    opacity: [0, 1],
    delay: anime.stagger(50), // Use anime.stagger
    loop: true,
    loopDelay: 1000
});

function generateName(name, superhero, braveryLevel, colorInput, personality) {
    let generatedName = {
        prefix: braveryLevel,
        first: name,
        middle: superhero,
        last: personality,
        suffix: colorInput,
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
    const color = tinycolor(generatedName.suffix).toRgb();
    if (color.r >= color.g && color.r >= color.b) {
        generatedName.suffix = "of Flames";
    }
    else if (color.r <= color.g && color.g >= color.b) {
        generatedName.suffix = "of the Forest";
    }
    else {
        generatedName.suffix = "of the Ocean";
    }

    let newName = `${generatedName.prefix} ${generatedName.first}, ${generatedName.middle} ${generatedName.last}, ${generatedName.suffix}`;
    return newName;
}

function displayName() {
    const name = generateName(
        document.getElementById('nameInput').value,
        document.querySelector('.superhero:checked')?.value,
        document.getElementById('braveryRange').value,
        document.getElementById('colorPicker').value,
        document.getElementById('personalitySelect').value
    );
    if (name) {
        let result = document.getElementById('result');
        result.style.display = 'block';
        result.innerHTML = `<div class="p-3 text-center"><span class="fw-bold fs-4 mb-5">Your Superhero Name is:</span> <h3 class="text-center">${name}</h3></div>`;

        anime.timeline()
            .add({
                targets: '#result span',  // animate the "Your Superhero Name is:" text
                translateY: [-20, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            })
            .add({
                targets: '#result h3',    // animate the name
                scale: [0, 1.2],
                rotate: ['-960deg', '0deg'],
                opacity: [0, 1],
                duration: 1200,
                delay: 500,
                easing: 'easeOutElastic(1, .8)'
            })
            .add({
                targets: '#result h3',
                scale: 1,
                duration: 500,
                easing: 'easeOutExpo'
            });
        result.scrollIntoView({ behavior: 'smooth', block: 'start' });


    }
}


document.getElementById('generateBtn').addEventListener('click', displayName);
drawStars();
animate();