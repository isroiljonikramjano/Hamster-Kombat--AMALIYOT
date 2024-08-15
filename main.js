// Function to add three to coin_energy
function addThree() {
    let myspan = document.querySelector("#coin_energy");
    let currentValue = Number(myspan.innerText);

    if (currentValue < 6498) {
        myspan.innerText = currentValue + 3;
    } else if (currentValue === 6498 || currentValue === 6499) {
        myspan.innerText = 6500;
    }

    // Update localStorage with new value and timestamp
    localStorage.setItem("coin_energy", JSON.stringify(myspan.innerText));
    localStorage.setItem("lastUpdate", JSON.stringify(new Date().getTime()));
}

// Function to handle the tap event
function tap() {
    let totapDiv = document.querySelector(".totap");
    let myspan1 = document.querySelector("#coin_energy");
    let myCoins = document.querySelector("#coins");

    if (Number(myspan1.innerText) > 10) {
        myspan1.innerText = Number(myspan1.innerText) - 11;
        myCoins.innerText = Number(myCoins.innerText) + 11;
    }
}

// Function to earn coins per second
function earn() {
    let mySumSpan = document.querySelector("#earn_per_hour");
    let sum_per_hour = Number(mySumSpan.innerText) * 1000;
    let sum_per_sec = Math.floor(sum_per_hour / 3600);
    let myCoins = document.querySelector("#coins");

    myCoins.innerText = Number(myCoins.innerText) + sum_per_sec;

    // Update localStorage with new value and timestamp
    localStorage.setItem('collected_coins', JSON.stringify(myCoins.innerText));
    localStorage.setItem("lastUpdate", JSON.stringify(new Date().getTime()));
}

// Function to check if 3 hours have passed
function checkElapsedTime() {
    let lastUpdate = JSON.parse(localStorage.getItem("lastUpdate"));
    if (lastUpdate) {
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - lastUpdate;

        // If more than 3 hours have passed (10800000 ms)
        if (elapsedTime > 10800000) {
            localStorage.removeItem("coin_energy");
            localStorage.removeItem("collected_coins");
            localStorage.removeItem("lastUpdate");
            // Optionally reset values on the page
            document.querySelector("#coin_energy").innerText = 10;  // default value
            document.querySelector("#coins").innerText = 240702957;  // default value
        }
    }
}

window.onload = () => {
    let savedCoins = JSON.parse(localStorage.getItem('collected_coins'));
    let savedEnergy = JSON.parse(localStorage.getItem('coin_energy'));

    if (savedCoins) {
        document.querySelector("#coins").innerText = savedCoins;
    }

    if (savedEnergy) {
        document.querySelector("#coin_energy").innerText = savedEnergy;
    }

    checkElapsedTime();
}

setInterval(addThree, 1000);
setInterval(earn, 1000);

let totapDiv = document.querySelector('.totap');
totapDiv.addEventListener('click', (event) => {
    let x = event.clientX;
    let y = event.clientY;

    let myappeareSpan = document.createElement('span');
    totapDiv.appendChild(myappeareSpan);
    myappeareSpan.innerText = "+11";
    myappeareSpan.id = 'up';
    setTimeout(() => {
        myappeareSpan.remove();
    }, 500);
});

