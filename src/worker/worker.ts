self.addEventListener('message', (msg) => {
    console.log(`Message from worker: ${msg.data}`);
})