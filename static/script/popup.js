const popup = document.getElementById("popup");
const btnClose = document.getElementById("btnClose");

function openPopup(desc) {
    const descPopup = document.getElementById('desc-popup')
    descPopup.innerHTML = desc
    popup.classList.add("open-popup");
    document.getElementById('btnEnhancement').disabled = true;
    document.getElementById('btnUploadImage').disabled = true;
    document.getElementById('clear').disabled = true;
    document.getElementById('btnCalculate').disabled = true;
    document.getElementById('container-popup-2').classList.add('container-popup-2');
}

function closePopup() {
    popup.classList.remove("open-popup");
    document.getElementById('container-popup-2').classList.remove('container-popup-2');
}

btnClose.addEventListener('click', () => {
    closePopup()
    location.reload(true); /* The page will refresh and force a resource retrieval from the server */
})