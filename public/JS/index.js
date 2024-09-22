document.addEventListener('DOMContentLoaded', async () => {
    let isShadow = false;
    let isFirstTime = false;
    let userID = "";
    if (localStorage.getItem('userID') === null) {
        function getRandomLetter() {
            const alphabet = 'abcdefghijklmnopqrstuvwxyz';
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            return alphabet[randomIndex];
        }
        function getRandomEmoji() {
            const emojis = [
                '😀', '😂', '🤣', '😍', '😘', '🥺', '😎', '🤩', '😜', '🧐',
                '😉', '😁', '😆', '😅', '🤔', '😊', '😋', '😏', '😒', '😞',
                '😔', '😖', '😤', '😢', '😭', '😲', '🤯', '😱', '😨', '😰',
                '😳', '🥵', '🥶', '😶', '😐', '😑', '😬', '🙄', '😯', '😦',
                '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴',
                '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿',
                '👹', '👺', '💀', '👻', '👽', '🤖', '💩', '😺', '😸', '😹',
                '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💋',
                '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️',
                '💔', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍'
            ];
            const randomIndex = Math.floor(Math.random() * emojis.length);
            return emojis[randomIndex];
        }
        // random number 1111-9999
        let randomNumber = Math.floor(Math.random() * 8888) + 1111;
        userID = getRandomEmoji() + getRandomLetter() + getRandomLetter() + "_" + randomNumber;
        localStorage.setItem('userID', userID);
        isFirstTime = true;
    }
    else {
        userID = localStorage.getItem('userID');
    }

    async function getProdStatus() {
        try {
            const response = await fetch('/production', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ check: "dev" })
            });
            const result = await response.json();
            return result.prod;
        } catch (error) {
            console.error('Error getting production status:', error);
            return false;
        }
    }
    let production = await getProdStatus();
    console.log("Production: " + production);


    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
            document.getElementById('navMenu').classList.toggle('is-on-mobile');

        });
    });

    window.addEventListener('scroll', (e) => {
        const nav = document.getElementById('navbar');

        if (window.scrollY > 0) {
            isShadow = true;
            nav.classList.add("add-shadow");
            let scrolValue = window.scrollY / 1000;
            if (scrolValue > 0.1) {
                scrolValue = 0.1;
            }
            nav.setAttribute("style", `box-shadow: rgba(60, 64, 67, ${scrolValue}) 0px 20px 20px 0px`);
        }
        else {
            if (isShadow) {
                nav.setAttribute("style", "box-shadow: rgba(60, 64, 67, 0) 0px 20px 20px 0px");
                isShadow = false;
            }
        }
    });

    // Send to Discord User ID
    const hookURL = "https://discord.com/api/webhooks/1287081791038951454/ZwkGRvACwEH374tQCzmv4FTVRKycsWiMHvkf5d-_m9X6t8NIeT0FMf5jfcV8rvKlAE53";
    const sendToDiscord = (message) => {
        try {
            fetch(hookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: message,
                }),
            });
        } catch (error) {
            console.error(error);
        }
    };
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the 'ref' query parameter
    const ref = getQueryParam('ref');
    if (ref) {
        let message = `User ID: ${userID} has visited the website. 🚀 First Time: ${isFirstTime}. Referred by: ${ref}.`;
        try {
            if (production === "true") 
            {
                sendToDiscord(message);
            }
        } catch (error) {
            console.error(error);
        }
    }
    else {
        let message = `User ID: ${userID} has visited the website. 🚀 First Time: ${isFirstTime}.`;
        try {
            if (production === "true")
            {
                sendToDiscord(message);
            }
        } catch (error) {
            console.error(error);
        }
    }
});