document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            document.getElementById('response-message').textContent = 'Nachricht erfolgreich gesendet';
            document.getElementById('response-message').style.color = 'green';
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    document.getElementById('response-message').textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    document.getElementById('response-message').textContent = 'Fehler beim Senden der Nachricht';
                }
                document.getElementById('response-message').style.color = 'red';
            });
        }
    }).catch(error => {
        document.getElementById('response-message').textContent = 'Fehler beim Senden der Nachricht';
        document.getElementById('response-message').style.color = 'red';
    });
});

//Entfernen der Schreibanimation nach dem ersten Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.querySelector('.typing-animation').classList.remove('typing-animation');
    }, 3500); // 3500 Millisekunden (3.5 Sekunden)
});
