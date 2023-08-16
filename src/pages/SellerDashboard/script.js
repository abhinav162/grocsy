const addProModal = document.getElementsByClassName('add-product-modal')[0];
const addProBtn = document.getElementsByClassName('add-product-btn')[0];
const closeBtn = document.getElementsByClassName('close-modal-btn')[0];

addProBtn.onclick = () => {
    addProModal.style.display = 'block';
}

closeBtn.onclick = () => {
    addProModal.style.display = 'none';
}

window.onclick = (e) => {
    if (e.target === addProModal) {
        addProModal.style.display = 'none';
    }
}