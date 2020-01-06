const events = require('events');
const eventEmitter = new events.EventEmitter();

function longTask() {
    setTimeout(() => {
        eventEmitter.emit('task:done');
    }, 3000);
}

console.log('Démarrage du programme');

longTask();
eventEmitter.on('task:done', () => console.log('La tache est terminée'));

function taskList() {
    eventEmitter.on('task:done', () => console.log('Liste de taches'));
}

taskList();