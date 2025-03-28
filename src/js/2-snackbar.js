import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const stateInputs = document.querySelectorAll('[name="state"]');

form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = Number(delayInput.value);
    const stateChoice = Array.from(stateInputs).find(input => input.checked).value;

    const makePromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stateChoice === 'fulfilled') {
                resolve(delay);
            }
            else {
                reject(delay);
            }
        }, delay)
    });

    makePromise
        .then((delay) => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
            });
        })
        .catch((delay) => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
            });
        });

    form.reset();
});