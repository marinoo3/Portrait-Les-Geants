function withPic(canvas, data) {

    const ctx = canvas.getContext('2d');

    const backgroundFiles = {
        '300': 'story-300-1.jpg',
        '400': 'story-400-1.jpg',
        '700': 'story-700-1.jpg'
    }

    const colors = {
        '300': '#ff6c06',
        '400': '#6a4d2f',
        '700': '#cf4819'
    }

    const img = new Image();
    img.src = 'Resources/' + backgroundFiles[data.distance];

    img.onload = function() {

        // Set background image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const pic = new Image();
        pic.src = LOADED_IMAGE; // Use the global variable for the loaded image

        pic.onload = function() {

            // Set rect offset and size variables
            const rectOffsetX = 463;
            const rectOffsetY = 302;
            const rectWidth = 514;
            const rectHeight = 628;

            // Set aspect ratio variables
            const rectAspect = rectWidth / rectHeight;
            const picAspect = pic.width / pic.height;

            // Set image offset and size variables
            let drawWidth, drawHeight, drawX, drawY;
            if (picAspect > rectAspect) {
                // Image is wider than the rectangle
                drawHeight = rectHeight;
                drawWidth = pic.width * (rectHeight / pic.height);
                drawX = rectOffsetX - ( (drawWidth - rectOffsetX) / 2);
                drawY = rectOffsetY;
            } else {
                // Image is taller (or equal ratio) than the rectangle
                drawWidth = rectWidth;
                drawHeight = pic.height * (rectWidth / pic.width);
                drawX = rectOffsetX;
                drawY = rectOffsetY - ( (drawHeight - rectHeight) / 2);
            }

            // Start clipping
            ctx.save();
            ctx.rect(rectOffsetX, rectOffsetY, rectWidth, rectHeight);
            ctx.clip();

            // Draw image
            ctx.drawImage(pic, drawX, drawY, drawWidth, drawHeight);
            
            // Stop clipping
            ctx.restore();

            // Compute first name and last name width
            ctx.font = '48px ITC Avant Garde Gothic Std';
            const firstNameText = data.firstName.split("").join(String.fromCharCode(8201));
            const firstNameWidth = ctx.measureText(firstNameText).width;
            ctx.font = '32px ITC Avant Garde Gothic Std';
            const lastNameText = data.lastName.split("").join(String.fromCharCode(8201));
            const lastNameWidth = ctx.measureText(lastNameText).width;
            // Save max width between the two text, minimum 200px
            contentWidth = Math.max(...[130, lastNameWidth, firstNameWidth]) + 70;

            // Draw rectangle
            ctx.fillStyle = colors[data.distance];
            ctx.fillRect(1008-contentWidth, 852, contentWidth, 185);

            // Set default text settings
            ctx.textAlign = 'right';
            ctx.fillStyle = "#fff";

            // Draw text
            ctx.font = '48px ITC Avant Garde Gothic Std';
            ctx.fillText(firstNameText, 972, 916);
            ctx.font = '32px ITC Avant Garde Gothic Std';
            ctx.fillText(lastNameText, 972, 958);

            // Draw nationality
            ctx.font = '51px ITC Avant Garde Gothic Std';
            ctx.fillText(data.nationality, 972, 1008);
        }
    };
}

function noPic(canvas, data) {

    const ctx = canvas.getContext('2d');

    const backgroundFiles = {
        '300': 'story-300-2.jpg',
        '400': 'story-400-2.jpg',
        '700': 'story-700-2.jpg'
    }

    const img = new Image();
    img.src = 'Resources/' + backgroundFiles[data.distance];

    img.onload = function() {

        // Set background image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Set default text settings
        ctx.textAlign = 'center';

        // Draw text
        ctx.font = '48px ITC Avant Garde Gothic Std';
        let text = data.firstName.split("").join(String.fromCharCode(8201))
        ctx.fillText(text, 540, 512);
        ctx.font = '32px ITC Avant Garde Gothic Std';
        text = data.lastName.split("").join(String.fromCharCode(8201))
        ctx.fillText(text, 540, 552);

        // Draw nationality
        ctx.font = '51px ITC Avant Garde Gothic Std';
        ctx.fillText(data.nationality, 540, 611);
    };
}

function defaultSecond(canvas) {

    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = 'Resources/story-default.jpg';

    img.onload = function() {
        // Set background image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

function resetAll(canvas, secondCanvas) {

    for (c of [canvas, secondCanvas]) {

        const ctx = c.getContext('2d');

        const img = new Image();
        img.src = 'Resources/missing-info.jpg';

        img.onload = function() {
            // Set background image (missing info img)
            ctx.drawImage(img, 0, 0, c.width, c.height);
        };
    }
}