function updateClock() {
    const now = new Date();
    
    const options = {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };
    
    document.getElementById("clock").textContent = now.toLocaleDateString("en-US", options);
}

let hightestZ = 1000;

function focusWindow(windowElement) {
    hightestZ++;
    windowElement.style.zIndex = hightestZ;
}

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "block";
    focusWindow(element)
}

// window system

document.querySelectorAll(".tab").forEach((tab) =>{
    const titlebar = tab.querySelector(".titlebar");
    const closeBtn = tab.querySelector(".tabclose");
    
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    tab.addEventListener("mousedown", () => {
        focusWindow(tab);
    });

    titlebar.addEventListener("mousedown", (e) => {
        dragging = true;;

        offsetX = e.clientX - tab.offsetLeft;
        offsetY = e.clientY - tab.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        tab.style.left = `${e.clientX - offsetX}px`;
        tab.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
    });

    closeBtn.addEventListener("click", () => {
        closeWindow(tab);
    });

});

// icon selector

let selectedIcon;

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}

function handleIconTap(element) {
    if(element.classList.contains("selected")) {
        deselectIcon(element);
    } else {
        if (selectedIcon) {
            deselectIcon(selectedIcon);
        }
        selectIcon(element);
    }
}

// app icon

const slimeIcon = document.getElementById("slimeIcon");
const aboutIcon = document.getElementById("aboutIcon");
const characterIcon = document.getElementById("characterIcon");

const slimeWindow = document.getElementById("tab-home");
const aboutWindow = document.getElementById("tab-about");
const characterWindow = document.getElementById("tab-characters");


slimeIcon.addEventListener("click", () => {
    handleIconTap(slimeIcon);
});

slimeIcon.addEventListener("dblclick", () => {
    openWindow(slimeWindow);
});

aboutIcon.addEventListener("click", () => {
    handleIconTap(aboutIcon);
});

aboutIcon.addEventListener("dblclick", () => {
    openWindow(aboutWindow);
});

characterIcon.addEventListener("click", () => {
    handleIconTap(characterIcon);
});

characterIcon.addEventListener("dblclick", () => {
    openWindow(characterWindow);
});




updateClock();
setInterval(updateClock, 1000);