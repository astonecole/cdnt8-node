process.on('beforeExit', () => {
    console.log('Je suis avant la fin du programme');
});

process.on('exit', () => {
    console.log('Fin du programme');
});
