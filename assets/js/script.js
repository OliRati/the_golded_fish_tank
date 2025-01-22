/* Global variables */

let loggedIn = false;

/* General functions */

function errorMessage(message) {
    return '<p class="errormessage">' + message + '</p>';
}

/* Hamburger menu */

const hamburgericon = document.getElementById("hamburgericon");
const menu = document.getElementById("hambmenu");
const menuLink = document.querySelectorAll(".menuItem");

hamburgericon.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
    if (menu.style.display === "block") {
        hamburgericon.style.animation = "rotateRight 0.5s forwards";
    }
    else {
        hamburgericon.style.animation = "rotateLeft 0.5s forwards";
    }

});

menuLink.forEach((link) => {
    link.addEventListener("click", () => {
        menu.style.display = "none";

        hamburgericon.style.animation = "rotateLeft 0.5s forwards";
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
        document.getElementById('errorForm').innerHTML = errorMessage(errors.join('<br>'));
    } else {
        // Send form to server
        fetch('./php/contact.php', {
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
                document.getElementById('errorForm').innerHTML = errorMessage('Un problème est survenu, nous n\'avons pas pu envoyer votre message. Veuillez réessayer plus tard.');
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
});

/* Json database functions */

let database = {};

let reviewsStartIndex = 0;
let forumStartIndex = 0;

function displayReviewData() {
    let reviews = database.reviews;
    let reviewsList = document.getElementById('reviewItemList');
    let added = 0;

    for (let i = reviewsStartIndex; i < Math.min(reviews.length, reviewsStartIndex + 3); i++) {
        let reviewItem = document.createElement('div');
        reviewItem.classList.add('article');
        reviewItem.classList.add('colorlightgray');
        reviewItem.innerHTML = '<div class="horodatage">Avis du ' + reviews[i].date + ' de ' + reviews[i].name + '</div><hr><div class="question">' + reviews[i].message + '</div><div class="response">' + reviews[i].response + '</div>';
        reviewsList.appendChild(reviewItem);
        added++;
    }

    reviewsStartIndex += added;

    if (reviewsStartIndex >= reviews.length) {
        moreReviews.style.display = 'none';
    }
}

const moreReviews = document.getElementById('moreReviews');
moreReviews.addEventListener('click', () => {
    displayReviewData();
});

function displayForumData() {
    let forum = database.forum;
    let forumList = document.getElementById('forumItemList');
    let added = 0;

    for (let i = forumStartIndex; i < Math.min(forum.length, forumStartIndex + 3); i++) {
        let forumItem = document.createElement('div');
        forumItem.classList.add('article');
        forumItem.classList.add('colorlightgray');
        forumItem.innerHTML = '<div class="horodatage">Demande du ' + forum[i].date + ' de ' + forum[i].name + '</div><hr><div class="question">' + forum[i].message + '</div><div class="response">' + forum[i].response + '</div>';
        forumList.appendChild(forumItem);
        added++;
    }

    forumStartIndex += added;

    if (forumStartIndex >= forum.length) {
        moreForum.style.display = 'none';
    }
}

const moreForum = document.getElementById('moreForum');
moreForum.addEventListener('click', () => {
    displayForumData();
});

function getJsonData() {
    fetch('./assets/json/database.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            database = data;
            displayReviewData();
            displayForumData();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

getJsonData();

/* Taking care of Forum and Review usage */

const loginFrame = document.getElementById("loginFrame");

function moveInLoginFrame() {
    loginFrame.style.display = "block";
    loginFrame.style.animation = "moveIn 0.5s forwards";
}

function moveOutLoginFrame() {
    loginFrame.style.animation = "moveOut 0.5s forwards";

    setTimeout(() => {
        loginFrame.style.display = "none";
        loginFrame.style.animation = "";
    }, 500);
}

function requestLogin() {
    const loginForm = document.getElementById("loginForm");
    const loginError = document.getElementById("loginError");
    loginError.innerHTML = "";

    moveInLoginFrame();

    loginForm.addEventListener('reset', () => {
        moveOutLoginFrame();
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!loggedIn) {
            loginError.innerHTML = errorMessage('Nom d\'utilisateur et / ou mot de passe incorrecte !');
        }
        else {
            moveOutLoginFrame();
        }
    });
}

const addForum = document.getElementById('addForum');
addForum.addEventListener('click', () => {
    if (!loggedIn)
        requestLogin();
});

const addReview = document.getElementById("addReview");
addReview.addEventListener('click', () => {
    if (!loggedIn)
        requestLogin();
});

/* Create new user functions */

const newUserFrame = document.getElementById("newUserFrame");
const createUserForm = document.getElementById("createUserForm");
const newUserError = document.getElementById("newUserError");

function moveOutNewUserFrame() {
    newUserFrame.style.animation = "moveOut 0.5s forwards";

    setTimeout(() => {
        newUserFrame.style.display = "none";
        newUserFrame.style.animation = "";
    }, 500);
}

createUserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    moveOutLoginFrame();

    newUserFrame.style.display = 'block';
    newUserFrame.style.animation = "moveIn 0.5s forwards";
    newUserError.innerHTML = "";
});

const newUserForm = document.getElementById("newUserForm");

newUserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    /* Check username and password coherence */

    if (data['email'].length < 5 || data['email'].indexOf('@') === -1) {
        newUserError.innerHTML = errorMessage('Saisie incorrecte, entrez une adresse email valide !');
        return;
    }

    if (data['username'].length < 2) {
        newUserError.innerHTML = errorMessage('Saisie incorrecte, entrez un nom d\'utilisateur valide !');
        return;
    }

    if (data['userpass'] != data['userpasscheck']) {
        newUserError.innerHTML = errorMessage('Saisie incorrecte, verifiez les mots de passe !');
        return;
    }

    if (data['userpass'].length < 8) {
        newUserError.innerHTML = errorMessage('Pour améliorer votre sécurité, la longueur minimale du mot de passe est de 8 caractères !');
        return;
    }

    // Transmit data to server

    fetch('./php/adduser.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok)
                throw new Error('Network response was not ok');

            return response.json();
        })
        .then(result => {
            console.log('Success:', result);
            moveOutNewUserFrame();
        })
        .catch(error => {
            newUserError.innerHTML = errorMessage('Erreur du serveur. Impossible de traiter votre demande.');
            console.error('Error:', error);
        });

});

newUserForm.addEventListener('reset', () => {
    moveOutNewUserFrame();
    requestLogin();
});
