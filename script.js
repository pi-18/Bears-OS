// TOP BAR- time and date function
function updateTime() {
        var currentTime = new Date().toLocaleString();
        var timeText = document.querySelector("#timeElement");
        timeText.innerHTML = currentTime
    }
    setInterval(updateTime, 1000);
    
// Dragging windows

// didnt include drag for cave notes because it was interfering with the note writing 

// Step 1: Initialize the draggable behavior on your element
dragElement(document.querySelector("#welcome"));
dragElement(document.querySelector("#galleryWindow"));
dragElement(document.querySelector("#calculatorWindow"));
dragElement(document.querySelector("#bearAlarmWindow"));


function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: Drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: Drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    
    // Step 8: Set up event listeners for mouse movement and release.
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag; // FIXED: Changed from dragElement to elementDrag
  }

  // Step 9: Calculate the new position of the element based on mouse movement.
  function elementDrag(e) { 
    e = e || window.event;
    e.preventDefault();
    
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    
    // Step 11: Update the element's new position.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Stop tracking mouse movement when the mouse button is released.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}



// closing and opening the window
var welcomeScreen = document.querySelector("#welcome")

function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "flex"
}

var welcomeOpen = document.querySelector("#openButton")
var welcomeClose = document.querySelector("#closeButton")

welcomeClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});



// app selection

var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined

}

function handleIconTap(element, screen) {

    if (screen.style.display === "flex") {
        closeWindow(screen);
        deselectIcon(element);
    } 

    else {
        if (selectedIcon) {
            deselectIcon(selectedIcon);
        }

        selectIcon(element);
        openWindow(screen);
    }

}

 // common code for all apps being clicked 

function initializeIcon(name) {
  var icon = document.querySelector("#" + name + "AppIcon")
  var screen = document.querySelector("#" + name + "Window")

  icon.addEventListener("click", () => handleIconTap(icon, screen));
}

initializeIcon("caveNotes");
initializeIcon("gallery");
initializeIcon("calculator");
initializeIcon("bearAlarm");

//close cave notes

var caveNotesAppScreen = document.querySelector("#caveNotesWindow")
var caveNotesAppScreenClose = document.querySelector("#notesclosebutton")
caveNotesAppScreenClose.addEventListener("click", () => closeWindow(caveNotesAppScreen));

// close gallery

var galleryAppScreen = document.querySelector("#galleryWindow")
var galleryAppScreenClose = document.querySelector("#galleryclosebutton")
galleryAppScreenClose.addEventListener("click", () => closeWindow(galleryAppScreen));

// close bear tube

var bearAlarmAppScreen = document.querySelector("#bearAlarmWindow")
var bearAlarmAppScreenClose = document.querySelector("#bearalarmclosebutton")
bearAlarmAppScreenClose.addEventListener("click", () => closeWindow(bearAlarmAppScreen));

// close calculator

var calculatorAppScreen = document.querySelector("#calculatorWindow")
var calculatorAppScreenClose = document.querySelector("#calculatorclosebutton")
calculatorAppScreenClose.addEventListener("click", () => closeWindow(calculatorAppScreen));




// making window rise to the top

var biggestIndex = 1;

function addWindowTapHandling(element) {

  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}
addWindowTapHandling(welcomeScreen);
addWindowTapHandling(caveNotesAppScreen);
addWindowTapHandling(galleryAppScreen);
addWindowTapHandling(calculatorAppScreen);
addWindowTapHandling(bearAlarmAppScreen);


function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}

var topBar = document.querySelector("#top")

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

// calculator

var calculatorDisplay = document.querySelector("#calculatorDisplay");
var calculatorButtons = document.querySelectorAll("#calculatorButtons button");

var currentValue = "0";
var firstValue = null;
var operator = null;
var waitingForSecondValue = false;


// Update what appears on the calculator
function updateDisplay() {
    calculatorDisplay.textContent = currentValue;
}


// Listen for button clicks
calculatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        var value = button.getAttribute("data-value");

        // Clear button
        if (value === "C") {
            currentValue = "0";
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
            updateDisplay();
            return;
        }

        // Number buttons
        if (!isNaN(value)) {

            if (waitingForSecondValue) {
                currentValue = value;
                waitingForSecondValue = false;
            } else {
                currentValue = currentValue === "0"
                    ? value
                    : currentValue + value;
            }

            updateDisplay();
            return;
        }

        // Equals button
        if (value === "=") {

            if (operator === null || waitingForSecondValue) return;

            var secondValue = Number(currentValue);
            var result;

            if (operator === "+") {
                result = firstValue + secondValue;
            } else if (operator === "-") {
                result = firstValue - secondValue;
            } else if (operator === "*") {
                result = firstValue * secondValue;
            } else if (operator === "/") {
                if (secondValue === 0) {
                    currentValue = "Error";
                    firstValue = null;
                    operator = null;
                    waitingForSecondValue = true;
                    updateDisplay();
                    return;
                }

                result = firstValue / secondValue;
            }

            currentValue = String(result);
            firstValue = null;
            operator = null;
            waitingForSecondValue = true;

            updateDisplay();
            return;
        }

        // Operator buttons
        if (value === "+" || value === "-" || value === "*" || value === "/") {

            var inputValue = Number(currentValue);

            if (firstValue === null) {
                firstValue = inputValue;
            } else if (operator !== null && !waitingForSecondValue) {

                if (operator === "+") firstValue += inputValue;
                if (operator === "-") firstValue -= inputValue;
                if (operator === "*") firstValue *= inputValue;
                if (operator === "/") firstValue /= inputValue;

                currentValue = String(firstValue);
                updateDisplay();
            }

            operator = value;
            waitingForSecondValue = true;
        }

    });

});
// alarm creation

var alarmTime = document.querySelector("#alarmTime");
var setAlarm = document.querySelector("#setAlarm");
var stopAlarm = document.querySelector("#stopAlarm");
var alarmStatus = document.querySelector("#alarmStatus");

var alarmInterval;
var selectedAlarm;

setAlarm.addEventListener("click", function() {

    selectedAlarm = alarmTime.value;

    if (selectedAlarm === "") {
        alarmStatus.innerHTML = "Please select a time!";
        return;
    }

    alarmStatus.innerHTML = "Alarm set for " + selectedAlarm;

});


clearInterval(alarmInterval);
alarmInterval = setInterval(checkAlarm, 1000);

// search button 

var openSearch = document.querySelector("#openSearch");
var searchInput = document.querySelector("#searchInput");

openSearch.addEventListener("click", function() {

    searchInput.style.display = "block";

});

// search button activity listening 

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        var searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === "gallery") {
            openWindow(document.querySelector("#galleryWindow"));
        }

        else if (searchTerm === "calculator") {
            openWindow(document.querySelector("#calculatorWindow"));
        }

        else if (searchTerm === "cave notes") {
            openWindow(document.querySelector("#caveNotesWindow"));
        }

        else if (searchTerm === "bear alarm") {
            openWindow(document.querySelector("#bearAlarmWindow"));
        }

        else {
            alert("No app found!");
        }

    }

});