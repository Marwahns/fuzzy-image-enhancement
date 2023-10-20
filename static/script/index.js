// Get references to the elements
const btnUploadImage = document.getElementById('btnUploadImage');
const hiddenInput = document.getElementById('hidden-input');
const loadImage = document.getElementById('load-image');

const btnEnhancement = document.getElementById('btnEnhancement')
const loadingOverlay = document.getElementById('loading-overlay')

const cardImageEnhancement = document.getElementById('card-image-enhancement')
const imageEnhancement = document.querySelectorAll('.image-enhancement')
const btnInformation = document.getElementById('btnInformation')
const btnCalculate = document.getElementById('btnCalculate')

function showLoadingOverlay() {
    loadingOverlay.classList.remove('hidden');
}

function hideLoadingOverlay() {
    loadingOverlay.classList.add('hidden');
}

btnUploadImage.addEventListener('click', () => {
    hiddenInput.click();
});

// Listen for changes in the file input
hiddenInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Get the selected file (first file if multiple allowed)

    // Check if a file is selected
    if (file) {
        const reader = new FileReader();

        // Read the file as a data URL and set the src attribute of the loadImage element
        reader.addEventListener('load', function () {
            loadImage.src = reader.result;
        });

        reader.readAsDataURL(file); // Read the file as data URL

        // Display the file name and size in the loadImage element
        loadImage.alt = file.name; // Set the alt attribute to the file name
        loadImage.title = `File Name: ${file.name}\nFile Size: ${formatFileSize(
            file.size
        )}`; // Set the title attribute to include file name and size
    }

    btnEnhancement.classList.remove('hidden');
    btnUploadImage.classList.add('hidden')
});

// Helper function to format file size
function formatFileSize(size) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let index = 0;
    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }
    return `${size.toFixed(2)} ${units[index]}`;
}

document.getElementById('clear').onclick = (event) => {
    event.preventDefault(); // Prevent the default form submission

    loadImage.src = 'https://via.placeholder.com/290x373'; // Reset the src attribute to clear the image
    loadImage.alt = ''; // Clear the alt attribute
    loadImage.title = ''; // Clear the title attribute

    // Clear the file input value
    hiddenInput.value = null;

    cardImageEnhancement.classList.add('hidden')
    imageEnhancement.forEach((element) => {
        element.innerHTML = '';
    });

    btnUploadImage.classList.remove('hidden')
    btnEnhancement.classList.add('hidden')
    btnInformation.classList.add('hidden')
    btnCalculate.classList.add('hidden')

    document.querySelectorAll('.pnsr').forEach((element) => {
        element.classList.add('hidden');
    });
};

btnCalculate.onclick = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Calculate PNSR
    document.querySelectorAll('.value-pnsr').forEach((element) => {
        element.classList.remove('hidden');
    });

    btnInformation.classList.remove('hidden')
};

function handleSuccess(response) {
    // Hide the loading overlay when the form processing is completed
    hideLoadingOverlay();

    // The rest of your code to handle the response
    // Enhancement
    const histogramEnhancement = response.data.histogram_enhancement;
    const mamdaniEnhancement = response.data.mamdani_enhancement;
    const sugenoEnhancement = response.data.sugeno_enhancement;
    const tsukamotoEnhancement = response.data.tsukamoto_enhancement;

    // Clahe
    const claheEnhancement = response.data.clahe_enhancement;

    // Combine Enhancement
    const histogramCombined = response.data.histogram_encoded_image;
    const mamdaniCombined = response.data.encoded_image;
    const sugenoCombined = response.data.sugeno_encoded_image;
    const tsukamotoCombined = response.data.tsukamoto_encoded_image;

    // console.log(response.data.clahe_pnsr);

    document.getElementById('card-image-enhancement').classList.remove('hidden');

    document.getElementById('combined-image-mamdani').src = mamdaniCombined
    document.getElementById('combined-image-sugeno').src = sugenoCombined
    document.getElementById('combined-image-tsukamoto').src = tsukamotoCombined

    document.querySelector('.combined-histogram-pnsr').textContent = response.data.combine_histogram_pnsr.toFixed(4);
    document.querySelectorAll('.combined-mamdani-pnsr').forEach((element) => {
        element.textContent = response.data.combine_mamdani_pnsr.toFixed(4)
    })

    document.querySelectorAll('.combined-sugeno-pnsr').forEach((element) => {
        element.textContent = response.data.combine_sugeno_pnsr.toFixed(4)
    })

    document.querySelectorAll('.combined-tsukamoto-pnsr').forEach((element) => {
        element.textContent = response.data.combine_tsukamoto_pnsr.toFixed(4)
    })

    document.querySelectorAll('.value-pnsr-clahe').forEach((element) => {
        element.textContent = response.data.clahe_pnsr.toFixed(4)
    })

    document.querySelector('.value-pnsr-histogram').textContent = response.data.histogram_pnsr.toFixed(4);
    document.querySelector('.value-pnsr-mamdani').textContent = response.data.mamdani_pnsr.toFixed(4);
    document.querySelector('.value-pnsr-sugeno').textContent = response.data.sugeno_pnsr.toFixed(4);
    document.querySelector('.value-pnsr-tsukamoto').textContent = response.data.tsukamoto_pnsr.toFixed(4);

    document.querySelectorAll('.image-clahe').forEach((element) => {
        element.src = claheEnhancement
    })

    document.getElementById('image-histogram').src = histogramEnhancement;
    document.getElementById('image-mamdani').src = mamdaniEnhancement;
    document.getElementById('image-sugeno').src = sugenoEnhancement;
    document.getElementById('image-tsukamoto').src = tsukamotoEnhancement;
    document.getElementById('image-combine-histogram').src = histogramCombined;
    document.getElementById('image-combine-sugeno').src = sugenoCombined;
    document.getElementById('image-combine-mamdani').src = mamdaniCombined;
    document.getElementById('image-combine-tsukamoto').src = tsukamotoCombined;

    document.getElementById('btnCalculate').classList.remove('hidden');
    document.getElementById('btnEnhancement').classList.add('hidden');
}

function postDataToServer(data) {
    // axios.post('http://127.0.0.1:5000/api/process_image', data)
    axios.post("https://martz.pythonanywhere.com/api/process_image", data)
        .then((response) => {
            // Hide the loading overlay when the form processing is completed
            hideLoadingOverlay();
            handleSuccess(response);
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

// Handle the form submission
document.getElementById('form-image-upload').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
    showLoadingOverlay(); // Show the loading overlay when the form is submitted

    // Create a new FormData object and append the file input data
    const formData = new FormData();
    formData.append('file-image', hiddenInput.files[0]);

    try {
        await postDataToServer(formData);
    } catch (error) {
        // handleError(error.message);
        console.log('Error: ', error.message);
    }
});

// Disable going back using browser history
history.pushState(null, null, location.href);
window.onpopstate = (event) => {
    history.go(1);
};