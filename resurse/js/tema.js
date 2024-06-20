document.addEventListener('DOMContentLoaded', function() {
    const darkButton = document.getElementsByClassName('dark-button')[0];
    const lightButton = document.getElementsByClassName('light-button')[0];
    const redButton = document.getElementsByClassName('red-button')[0];

    const lightButtonFunc = () => {
        document.body.classList.remove('dark', 'red');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');
    };

    const darkButtonFunc = () => {
        document.body.classList.remove('light', 'red');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    };

    const redButtonFunc = () => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add('red');
        localStorage.setItem('theme', 'red');
    };

    const initialTheme = localStorage.getItem('theme');
    switch (initialTheme) {
        case 'dark':
            darkButton.checked = true;
            darkButtonFunc();
            break;
        case 'light':
            lightButton.checked = true;
            lightButtonFunc();
            break;
        case 'red':
            redButton.checked = true;
            redButtonFunc();
            break;
        default:
            lightButton.checked = true; 
            lightButtonFunc();
    }

    lightButton.addEventListener('click', lightButtonFunc);
    darkButton.addEventListener('click', darkButtonFunc);
    redButton.addEventListener('click', redButtonFunc);
});