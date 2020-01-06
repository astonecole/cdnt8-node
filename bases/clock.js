setInterval(() => {
    const d = new Date();

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(d.toLocaleDateString() + ' ' + d.toLocaleTimeString() + ' ');
}, 1000);
