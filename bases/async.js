function traitementImage() {
    return new Promise((success, err) => {
        console.log('Démarrage du traitement');

        setTimeout(() => {
            console.log('Traitement des images');
            if (true) {
                success('Everything is OK');
            } else {
                err('Too bad ^^');
            }
        }, 2000);
    });
}

traitementImage()
    .then(
        message => 'Bravo : ' + message,
        err => {
            return 'Tu as une erreur : ' + err;
        }
    )
    .then(message => console.log(message))
    .then(message => {
        throw new Error('Not Found');
    })
    .catch(err => console.log(err));

async function takeMyTime() {
    const message = await traitementImage();
    console.log('Mon message', message);
}

try {
    takeMyTime();
} catch(error) {
    console.log("Une Erreur c'est produite");
}

console.log('Je suis pas blocant');
