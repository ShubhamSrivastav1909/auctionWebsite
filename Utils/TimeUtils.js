export default function startTimer(delayInms) {
    console.log(`starting timer ${delayInms}`);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
  