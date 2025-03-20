document.querySelector('.buttons-category').addEventListener('click', (event) => {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => localStorage.setItem(event.target.id, data[event.target.id].sort(() => Math.random() - 0.5).slice(0, 5)))
        .catch(error => console.error('Error:', error));
});