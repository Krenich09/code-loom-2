document.addEventListener('DOMContentLoaded', async () => {
    const genButton = document.getElementById('gen-button');
    const genButtonContent = document.getElementById('gen-button-content');
    var hasClicked = false;
    const selection_drop = document.getElementById('selection_drop');
    const drop1 = document.getElementById('drop1');
    const drop2 = document.getElementById('drop2');
    const drop3 = document.getElementById('drop3');
    const copyBtn = document.getElementById('copyBtn');
    const saveBtn = document.getElementById('saveBtn');
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);


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
    let isProduction = await getProdStatus();
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

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow_night");
    editor.session.setMode("ace/mode/javascript");
    editor.setOptions({
        autoScrollEditorIntoView: true,
    });
    editor.setShowPrintMargin(false);
    editor.setOptions({
        fontSize: "12pt",

        highlightActiveLine: false,
        highlightGutterLine: false,
        highlightSelectedWord: false,
        // Scroll more than the screen width
        scrollPastEnd: 0.2,
        selectionStyle: "line",

    });
    editor.session.setUseWorker(false);
    var dropSelection = 2;
    genButton.addEventListener('click',async () => {
        if (hasClicked) return;
        if(isProduction === "false") return;
        genButton.classList.add('is-loading');
        genButtonContent.classList.add('is-invisible');
        hasClicked = true;
        var code = editor.getValue();
        try {    
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: code, selection: dropSelection })
            });
            if(!response.ok) {
                editor.setValue('Failed to generate code.. Try again later');
                console.error('Error generating code (Bad response):', error);
            }
            const result = await response.json();
            editor.setValue(result.code);
        } catch (error) {
            editor.setValue('Failed to generate code.. Try again later');
            console.error('Error generating code:', error);
        }
        genButton.classList.remove('is-loading');
        genButtonContent.classList.remove('is-invisible');
        hasClicked = false;
    });
    selection_drop.addEventListener('click', () => {
        selection_drop.classList.toggle('is-active');
    });

    

    drop1.addEventListener('click', () => {
        dropSelection = 1;
        drop1.classList.add('is-active');
        drop2.classList.remove('is-active');
        drop3.classList.remove('is-active');
    });
    drop2.addEventListener('click', () => {
        dropSelection = 2;
        drop2.classList.add('is-active');
        drop1.classList.remove('is-active');
        drop3.classList.remove('is-active');
    });
    drop3.addEventListener('click', () => {
        dropSelection = 3;
        drop3.classList.add('is-active');
        drop1.classList.remove('is-active');
        drop2.classList.remove('is-active');
    });
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(editor.getValue());
    });
    saveBtn.addEventListener('click', () => {
        const value = editor.getValue();
        const blob = new Blob([value], { type: "text/plain" });

        // Create a download link and simulate a click event
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "code.txt"; // Set desired file name
        downloadLink.click();
    });

});