// CUSTOM OBJECT


Object.defineProperty(String.prototype, 'capitalize', {
    // Capitalize a string
    value: function () {
        let lowercased = this.toLowerCase();
        return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
    },
    enumerable: false
});


let LOADED_IMAGE;






// UTILS


function downloadCanvasAsImage(canvas) {

    canvas.toBlob((blob) => {

        const link = document.createElement('a');
        link.download = canvas.dataset.fileName;
        link.href = URL.createObjectURL(blob);
        link.click();

        // Release the object URL after download
        URL.revokeObjectURL(link.href);
    }, 'image/jpeg', 0.95);
}


function resetCanvas() {

    const canvas = document.getElementById('canvas');
    const secondCanvas = document.getElementById('second-canvas');

    resetAll(canvas, secondCanvas);
}


function updateCanvas(data) {

    const canvas = document.getElementById('canvas');
    const secondCanvas = document.getElementById('second-canvas');

    if (data.picture) {
        withPic(canvas, data);
    } else {
        noPic(canvas, data);
    }
    defaultSecond(secondCanvas);

    canvas.dataset.fileName = 'Les Géants - ' + data.firstName.capitalize() + ' ' + data.lastName.capitalize() + '.jpg';
    secondCanvas.dataset.fileName = 'Les Géants - Event.jpg'

    return [canvas, secondCanvas]
}


function loadImageFromFileInput(event) {

    // Update input's file name
    const fileNameElement = document.querySelector('.custom-file-upload .file-name');
    fileNameElement.textContent = event.target.files[0].name;
    fileNameElement.classList.remove('empty');

    const inputTextElement = document.querySelector('.custom-file-upload .input-text > p');
    inputTextElement.textContent = "Remplacer l'image"

    // Return the actual image file
    return window.URL.createObjectURL(event.target.files[0])
}


function getFormData(event) {

    // Get the form element
    const form = event.currentTarget;

    // Access input values
    const data = {
        'firstName': form.elements['first-name'].value.toUpperCase(),
        'lastName': form.elements['last-name'].value.toUpperCase(),
        'nationality': form.elements['nationality'].value,
        'picture': form.elements['user-image'].value,
        'distance': form.elements['distance'].value
    }

    return data
}





// MAIN FUNCTIONS


function update(event) {

    const downloadButton = document.querySelector('.generator form button[type="submit"]');
    const data = getFormData(event);

    // Check if required info are given
    if (data.firstName == "" || data.lastName == "") {
        downloadButton.disabled = true;
        return
    }

    updateCanvas(data);
    downloadButton.disabled = false;
}

function closePreview() {

    const previews = document.querySelector('.generator-viewer .previews');
    previews.classList.remove('popuped');
    const backgroundOverlay = document.querySelector('.background-overlay');
    backgroundOverlay.classList.remove('active');
    // Allow scrolling on main page
    document.querySelector('body').style.overflow = 'inherit';

}

function preview() {

    const previews = document.querySelector('.generator-viewer .previews');
    previews.classList.add('popuped');
    const backgroundOverlay = document.querySelector('.background-overlay');
    backgroundOverlay.classList.add('active');
    // Block scrolling on main page
    document.querySelector('body').style.overflow = 'hidden';

}


function download(event) {

    const data = getFormData(event);
    const [canvas, secondCanvas] = updateCanvas(data);
    
    downloadCanvasAsImage(canvas);
    downloadCanvasAsImage(secondCanvas)
}



// ON DOM LOADED

function handleInputChange(event) {
    if (event.target.matches('input, select')) {

        if (event.target.matches('#user-image')) {
            LOADED_IMAGE = loadImageFromFileInput(event);
            update(event);
        } else {
            update(event);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector('.generator form');
    const is_mobile = (window.screen.width < 800);

    resetCanvas();

    form.addEventListener('change', handleInputChange);
    form.addEventListener('blur', handleInputChange, true);

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        if (is_mobile) {
            preview();
        }
        else {
            download(event);
        }
    });

    if (is_mobile) {

        document.querySelector('.background-overlay').addEventListener('click', () => {
            closePreview();
        });

        document.querySelectorAll('.mobile-download').forEach(function(button) {
            button.addEventListener('click', function() {
                const canvasContainer = this.parentElement;
                const canvas = canvasContainer.querySelector('canvas');
                downloadCanvasAsImage(canvas);
            });
        });
    }
});