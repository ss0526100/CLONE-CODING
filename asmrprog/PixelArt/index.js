let container = document.querySelector(".container");
let submitGridBtn = document.getElementById("submit-grid");
let clearGridBtn = document.getElementById("clear-grid");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthRangeInput = document.getElementById("width-range");
let heightRangeInput = document.getElementById("height-range");
let colorInput = document.getElementById("color-input");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};
let deviceType = "";

let isDrawn = false;
let isErasing = false;

const IS_TOUCH_DEVICE = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
}

IS_TOUCH_DEVICE();
submitGridBtn.addEventListener("click", () => {
    container.innerHTML = "";
    let cnt = 0;
    for (let i = 0; i < heightRangeInput.value; i++) {
        cnt += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");
        for (let j = 0; j < widthRangeInput.value; j++) {
            cnt += 2;
            let col = document.createElement("div");
            col.id = `gridCol${cnt}`;
            col.classList.add("gridCol");
            col.addEventListener(events[deviceType].down, () => {
                isDrawn = true;
                if (isErasing) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorInput.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                let elementID = document.elementFromPoint(!IS_TOUCH_DEVICE() ? e.clientX : e.touches[0].clientX, !IS_TOUCH_DEVICE() ? e.clientY : e.touches[0].clientY).id;
                checker(elementID);
            })
            col.addEventListener(events[deviceType].up, () => {
                isDrawn = false;
            });
            col.style.border = "0.5px gray solid";

            div.appendChild(col);
        }
        container.appendChild(div);
    }
})

function checker(elementID) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((e) => {
        if (elementID == e.id) {
            if (isDrawn && !isErasing) e.style.backgroundColor = colorInput.value;
            else if (isDrawn && erase) e.style.backgroundColor = "transparent";
        }
    });
}

clearGridBtn.addEventListener(events[deviceType].up, () => {
    container.innerHTML = "";
});

eraseBtn.addEventListener(events[deviceType].up, () => {
    isErasing = true;
});

paintBtn.addEventListener(events[deviceType].up, () => {
    isErasing = false;
});

widthRangeInput.addEventListener("input", () => {
    widthValue.innerHTML = widthRangeInput.value < 9 ? `0${widthRangeInput.value}` : widthRangeInput.value + "";
})
heightRangeInput.addEventListener("input", () => {
    heightValue.innerHTML = heightRangeInput.value < 9 ? `0${heightRangeInput.value}` : heightRangeInput.value + "";
})

window.onload = () => {
    widthRangeInput.value = 0;
    heightRangeInput.value = 0;
}