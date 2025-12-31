/* Global variables */

let loggedIn = false;

/* General functions */

function errorMessage(message) {
    return '<p class="errormessage">' + message + '</p>';
}

function successMessage(message) {
    return '<p class="successmessage">' + message + '</p>';
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

/* Animate cards when in view */

const animatedElement = document.querySelectorAll('.animated-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
});

animatedElement.forEach((element) => {
    observer.observe(element);
});

/* Contact form validation */

document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let errors = [];

    // Get text form data

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Get checkbox data
    if (document.getElementById('contactFormTerms').checked) {
        data['puballowed'] = 'true';
    }
    else {
        data['puballowed'] = 'false';
    }

    // Check form data

    if (data['name'] === '') {
        errors.push('Vous devez saisir un Nom valide.');
    }

    if (data['email'] === '') {
        errors.push('Vous devez saisir un email valide.');
    }

    if (data['phone'] === '') {
        errors.push('Vous devez saisir un numéro de téléphone valide.');
    }

    if (data['message'] === '') {
        errors.push('Vous devez saisir un message.');
    }

    if (errors.length > 0) {
        document.getElementById('errorForm').innerHTML = errorMessage(errors.join('<br>'));
    } else {
        // Send form to server
        fetch('./php/contact.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            if (data.status === 'success') {
                document.getElementById('errorForm').innerHTML = successMessage('Votre message a bien été envoyé.');

                setTimeout(() => {
                    // Reset form
                    document.getElementById('contactFormName').value = '';
                    document.getElementById('contactFormEmail').value = '';
                    document.getElementById('contactFormPhone').value = '';
                    document.getElementById('contactFormMessage').value = '';
                    document.getElementById('contactFormTerms').checked = false;
                    document.getElementById('errorForm').innerHTML = "";
                }, 3000);

            } else {
                throw new Error(data.error || 'Unknown error');
            }
        }).catch(error => {
            document.getElementById('errorForm').innerHTML = errorMessage('Un problème est survenu, nous n\'avons pas pu envoyer votre message. Veuillez réessayer plus tard.');
            console.error('There has been a problem with your fetch operation:', error);
        });
    }
});

/* Json database functions */

let forumBase = [];
let reviewBase = [];

let reviewsStartIndex = 0;
let forumStartIndex = 0;

function displayReviewData() {
    let reviews = reviewBase;
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
    let forum = forumBase;
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

async function getJsonData() {
    try {
        const responseForum = await fetch('./php/getforums.php')

        if (!responseForum.ok) {
            throw new Error('HTTP error status : ' + responseForum.status);
        }
        const base = await responseForum.json();

        forumBase = base;
    } catch (error) {
        console.error("Failed to fetch forum content : ", error)
    }

    try {
        const responseReview = await fetch('./php/getreviews.php')

        if (!responseReview.ok) {
            throw new Error('HTTP error status : ' + responseReview.status);
        }
        const base = await responseReview.json();

        reviewBase = base;
    } catch (error) {
        console.error("Failed to fetch review content : ", error)
    }

    if ((reviewBase.length === 0) || (forumBase.length === 0)) {
        try {
            const response = await fetch('./assets/json/database.json')

            if (!response.ok) {
                throw new Error('HTTP error status : ' + response.status);
            }
            const data = await response.json();

            forumBase = data.forum;
            reviewBase = data.reviews;
        } catch (error) {
            console.error('Failed to fetch fallback forum and review content : ', error);
        }
    }

    displayReviewData();
    displayForumData();
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

async function doUserLogin(username, password) {
    const response = await fetch('./php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const logged = data.loggedIn;

    return logged;
}

function requestLogin(caller) {
    const loginForm = document.getElementById("loginForm");
    const loginError = document.getElementById("loginError");
    loginError.innerHTML = "";

    moveInLoginFrame();

    loginForm.addEventListener('reset', () => {
        moveOutLoginFrame();
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form data

        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Check form data

        if (data['username'].length < 2) {
            loginError.innerHTML = errorMessage('Saisie incorrecte, entrez un nom d\'utilisateur valide !');
            return;
        }

        if (data['password'].length < 8) {
            loginError.innerHTML = errorMessage('Saisie incorrecte, entrez un mot de passe valide !');
            return;
        }

        doUserLogin(data['username'], data['password']).then(logged => {

            if (!logged) {
                loginError.innerHTML = errorMessage('Nom d\'utilisateur et / ou mot de passe incorrecte !');
                return;
            }
            else {
                loggedIn = true;
                moveOutLoginFrame();
                if (caller === 'forum')
                    requestForum();
                else if (caller === 'review')
                    requestReview();
            }
        }).catch(error => {
            loginError.innerHTML = errorMessage('Erreur du serveur. Impossible de traiter votre demande.');
            console.error('Error:', error);
        });
    });
}

/* Manage new forum and review requests */

const newForumFrame = document.getElementById("newForumFrame");

function moveInForumFrame() {
    newForumFrame.style.display = "block";
    newForumFrame.style.animation = "moveIn 0.5s forwards";
}

function moveOutForumFrame() {
    newForumFrame.style.animation = "moveOut 0.5s forwards";

    setTimeout(() => {
        newForumFrame.style.display = "none";
        newForumFrame.style.animation = "";
    }, 500);
}

const newReviewFrame = document.getElementById("newReviewFrame");

function moveInReviewFrame() {
    newReviewFrame.style.display = "block";
    newReviewFrame.style.animation = "moveIn 0.5s forwards";
}

function moveOutReviewFrame() {
    newReviewFrame.style.animation = "moveOut 0.5s forwards";

    setTimeout(() => {
        newReviewFrame.style.display = "none";
        newReviewFrame.style.animation = "";
    }, 500);
}

function requestForum() {
    moveInForumFrame();

    const newForumForm = document.getElementById("newForumForm");
    const forumError = document.getElementById("forumError");

    newForumForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form data

        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Check form data

        if (data['message'].length < 50) {
            forumError.innerHTML = errorMessage('Complétez votre message ( minimun 50 caractères ) !');
            return;
        }

        if (data['message'].length > 512) {
            forumError.innerHTML = errorMessage('Raccourcissez votre message ( maximum 512 caractères ) !');
            return;
        }

        // Send form to server
        fetch('./php/sendforum.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            if (data.status === 'success') {
                // Reset form
                forumError.innerHTML = successMessage('Votre message a bien été envoyé.');
                setTimeout(() => {
                    moveOutForumFrame();
                    forumError.innerHTML = '';
                    document.getElementById('forumMessage').value = '';
                }, 3000);
            } else {
                throw new Error(data.message || 'Unknown error');
            }
        }).catch(error => {
            forumError.innerHTML = errorMessage('Un problème est survenu, nous n\'avons pas pu envoyer votre message. Veuillez réessayer plus tard.');
            console.error('There has been a problem with your fetch operation:', error);
        });
    });

    newForumForm.addEventListener('reset', () => {
        moveOutForumFrame();
    });
}

function requestReview() {
    moveInReviewFrame();

    const newReviewForm = document.getElementById("newReviewForm");
    const reviewError = document.getElementById("reviewError");

    newReviewForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form data

        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Check form data

        if (data['message'].length < 50) {
            reviewError.innerHTML = errorMessage('Complétez votre message ( minimun 50 caractères ) !');
            return;
        }

        if (data['message'].length > 512) {
            reviewError.innerHTML = errorMessage('Raccourcissez votre message ( maximum 512 caractères ) !');
            return;
        }

        // Send form to server
        fetch('./php/sendreview.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            if (data.status === 'success') {
                // Reset form
                reviewError.innerHTML = successMessage('Votre message a bien été envoyé.');
                setTimeout(() => {
                    moveOutReviewFrame();
                    reviewError.innerHTML = '';
                    document.getElementById('reviewMessage').value = '';
                }, 3000);
            } else {
                throw new Error(data.message || 'Unknown error');
            }
        }).catch(error => {
            reviewError.innerHTML = errorMessage('Un problème est survenu, nous n\'avons pas pu envoyer votre message. Veuillez réessayer plus tard.');
            console.error('There has been a problem with your fetch operation:', error);
        });
    });

    newReviewForm.addEventListener('reset', () => {
        moveOutReviewFrame();
    });
}

const addForum = document.getElementById('addForum');
addForum.addEventListener('click', () => {
    if (loggedIn)
        requestForum();
    else
        requestLogin('forum');
});

const addReview = document.getElementById("addReview");
addReview.addEventListener('click', () => {
    if (loggedIn)
        requestReview();
    else
        requestLogin('review');
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
    }).then(response => {
        if (!response.ok)
            throw new Error('Network response was not ok');

        return response.json();
    }).then(result => {
        console.log('Success:', result);
        moveOutNewUserFrame();
    }).catch(error => {
        newUserError.innerHTML = errorMessage('Erreur du serveur. Impossible de traiter votre demande.');
        console.error('Error:', error);
    });

});

newUserForm.addEventListener('reset', () => {
    moveOutNewUserFrame();
    requestLogin();
});
