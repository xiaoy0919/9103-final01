let img1, img2; 
let numSegments = 300; 
let showSecondImage = false; // Track whether the second image screen is displayed
let isBlackScreen = false; // Track whether the lock screen (black screen) is displayed
let scaleFactor, displayWidth, displayHeight, offsetX, offsetY;

function preload() {   
    img1 = loadImage('assets/1.jpg');   
    img2 = loadImage('assets/2.png'); // Load the second image
}

function setup() {   
    createCanvas(windowWidth, windowHeight);   
    noLoop(); 
}

function draw() {   
    background(255);   
    
    // Calculate scale factor and dimensions based on img1
    scaleFactor = min(width / img1.width, height / img1.height);   
    displayWidth = img1.width * scaleFactor;   
    displayHeight = img1.height * scaleFactor;   
    offsetX = (width - displayWidth) / 2;   
    offsetY = (height - displayHeight) / 2;   

    // Display either the image or lock screen
    if (isBlackScreen) {     
        // Draw black lock screen covering the image area
        fill(0);     
        noStroke();     
        rect(offsetX, offsetY, displayWidth, displayHeight);   
    } else {     
        // Show img1 or img2 based on selection, simulating the image screens
        let img = showSecondImage ? img2 : img1;     
        drawImageWithSegments(img);   
    }   

    // Draw the silver border around the image area
    stroke(205);   
    strokeWeight(100 * scaleFactor);   
    noFill();   
    rect(offsetX - 10 * scaleFactor, offsetY - 10 * scaleFactor, displayWidth + 20 * scaleFactor, displayHeight + 20 * scaleFactor);   

    // Draw white circle as return button on the right side of the border
    stroke(255, 182, 193);   
    strokeWeight(2 * scaleFactor);   
    fill(255);   
    let circleX = offsetX + displayWidth + 10 * scaleFactor;   
    let circleY = offsetY + displayHeight / 2;   
    let circleDiameter = displayWidth * 0.025;   
    ellipse(circleX, circleY, circleDiameter, circleDiameter);   

    // Draw gray rectangle as iPad lock screen button, moving it 200 pixels up
    fill(150);   
    noStroke();   
    let buttonWidth = (displayWidth * 0.02) / 2;    
    let buttonHeight = (displayHeight * 0.15) / 2;    
    let buttonX = offsetX - 15 * scaleFactor - buttonWidth - 25;   
    let buttonY = offsetY + displayHeight / 2 - buttonHeight / 2 - 200; // Move up by 200
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 5 * scaleFactor);   
}

// Draw segmented image function for img1 or img2
function drawImageWithSegments(img) {   
    let segmentWidth = displayWidth / numSegments;   
    let segmentHeight = displayHeight / numSegments;   
    for (let segYPos = 0; segYPos < displayHeight; segYPos += segmentHeight) {     
        for (let segXPos = 0; segXPos < displayWidth; segXPos += segmentWidth) {       
            let colorToUse = img.get(segXPos / scaleFactor, segYPos / scaleFactor);       
            fill(colorToUse);       
            noStroke();       
            rect(offsetX + segXPos, offsetY + segYPos, segmentWidth, segmentHeight);     
        }   
    } 
}

// Handle click events for switching between screens and lock screen activation
function mousePressed() {   
    // Check if clicked inside the white circle (return button) to switch images
    let circleX = offsetX + displayWidth + 10 * scaleFactor;   
    let circleY = offsetY + displayHeight / 2;   
    let circleDiameter = displayWidth * 0.025;    

    if (dist(mouseX, mouseY, circleX, circleY) < circleDiameter / 2) {     
        showSecondImage = !showSecondImage; // Toggle between img1 and img2 (screens)    
        isBlackScreen = false; // Exit lock screen     
        redraw(); // Redraw canvas     
        return;   
    }    

    // Check if clicked inside the gray lock screen button to activate lock screen
    let buttonWidth = (displayWidth * 0.02) / 2;    
    let buttonHeight = (displayHeight * 0.15) / 2;    
    let buttonX = offsetX - 15 * scaleFactor - buttonWidth - 25;   
    let buttonY = offsetY + displayHeight / 2 - buttonHeight / 2 - 200; // Position updated

    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {     
        isBlackScreen = true; // Activate lock screen     
        redraw(); // Immediately update canvas     
        return;   
    }   
}

function windowResized() {   
    resizeCanvas(windowWidth, windowHeight);   
    redraw(); 
}
