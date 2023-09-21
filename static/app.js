
    // Get the modal and close button elements
    const modal = document.getElementById('login-modal');
    const closeButton = document.getElementById('close-login-modal');
    const loginButton = document.getElementById('login-button');

    // Show the login modal when the login button is clicked
    loginButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close the login modal when the close button or outside the modal is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
