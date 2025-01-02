/* Hamburger menu */

const hamburgericon = document.querySelector(".hamburgericon");
const menu = document.getElementById("hambmenu");
const menuLink = document.querySelectorAll(".menuItem");

hamburgericon.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

menuLink.forEach((link) => {
    link.addEventListener("click", () => {
        menu.style.display = "none";
    });
});

/* Contact form validation */

document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let errors = [];

    let username = document.getElementById('contactFormName').value;
    let usermail = document.getElementById('contactFormEmail').value;
    let userphone = document.getElementById('contactFormPhone').value;
    let usermessage = document.getElementById('contactFormMessage').value;
    let useterms = document.getElementById('contactFormTerms').checked;

    if (username === '') {
        errors.push('Vous devez saisir un Nom valide.');
    }

    if (usermail === '') {
        errors.push('Vous devez saisir un email valide.');
    }

    if (userphone === '') {
        errors.push('Vous devez saisir un numéro de téléphone valide.');
    }

    if (usermessage === '') {
        errors.push('Vous devez saisir un message.');
    }

    if (errors.length > 0) {
        document.getElementById('errorForm').innerHTML = '<p class="errormessage">' + errors.join('<br>') + '</p>';
    } else {
        // Send form to server
        fetch('./contact.php', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                usermail: usermail,
                userphone: userphone,
                usermessage: usermessage,
                useterms: useterms
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Reset form
                document.getElementById('contactFormName').value = '';
                document.getElementById('contactFormEmail').value = '';
                document.getElementById('contactFormPhone').value = '';
                document.getElementById('contactFormMessage').value = '';
                document.getElementById('contactFormTerms').checked = false;

                document.getElementById('errorForm').innerHTML = '<p>Votre message a bien été envoyé</p>';
                return response.text();
            })
            .catch(error => {
                document.getElementById('errorForm').innerHTML = '<p class="errormessage">Un problème est survenu, nous n\'avons pas pu envoyer votre message. Veuillez réessayer plus tard.</p>';
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
});
