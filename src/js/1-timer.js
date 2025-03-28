import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minValue = document.querySelector("[data-minutes]");
const secValue = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let countId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onOpen() {
        this, setDate(new Date());
    },
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            // window.alert("Please choose a date in the future");
            iziToast.error({
                position: "topRight",
                title: "Error",
                message: "Please choose a date in the future",
            });
            userSelectedDate = null;
            startButton.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            startButton.disabled = false;
        }
    },
};

flatpickr(datetimePicker, options);

updateCurrentTime();

function updateCurrentTime() {
    const now = new Date();
    datetimePicker._flatpickr.setDate(now);
}

startButton.addEventListener("click", startCount);

function startCount() {
    if (!userSelectedDate) {
        return;
    }

    startButton.disabled = true;
    datetimePicker.disabled = true;

    countId = setInterval(updatetimer, 1000);
    updatetimer();
}

function updatetimer() {
    const currentTime = new Date();
    const timeLeft = userSelectedDate - currentTime;

    if (timeLeft <= 0) {
        startButton.disabled = false;
        datetimePicker.disabled = false;
        clearInterval(countId);
        return;
    }

    updateTimerDisplay(convertMs(timeLeft));
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minValue.textContent = addLeadingZero(minutes);
    secValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}