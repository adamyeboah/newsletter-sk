let time = localStorage.getItem("countdown-time");

if (time) {
    time = new Date(time);
}

const generateTime = () => {

    const date = new Date();
    date.setHours(date.getHours() + 21);
    date.setMinutes(date.getMinutes() + 38);
    date.setSeconds(date.getSeconds() + 42);
                 

    time = date;
    localStorage.setItem("countdown-time", date);
};

const getTimeDifference = (future) => {
    const now = new Date();
    let newMonth =
        future.getMonth() < 9
            ? `0${future.getMonth() + 1}`
            : future.getMonth() + 1;

    future = Date.parse(
        `2023-${newMonth}-${
            future.getDate() < 10 ? `0${future.getDate()}` : future.getDate()
        }`
    );

    const diff = future - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    const secs = Math.floor(diff / 1000);

    const h = days * 24 + (hours - days * 24);
    const m = mins - hours * 60;
    const s = secs - mins * 60;

    return {
        h,
        m,
        s,
    };
};

const countdownInterval = setInterval(() => {
    if (!time) {
        generateTime();
    }

    const { h, m, s } = getTimeDifference(time);

    document.querySelector("#hrs .countdown-num").textContent =
        h < 10 ? `0${h}` : h;
    document.querySelector("#mins .countdown-num").textContent =
        m < 10 ? `0${m}` : m;
    document.querySelector("#secs .countdown-num").textContent =
        s < 10 ? `0${s}` : s;
}, 1000);

const openModal = (e) => {
    const src = e.target.getAttribute("src");
    document.querySelector(".image-modal-image").setAttribute("src", src);
    document.getElementById("image-modal").classList.add("show");
    document.querySelector("body").classList.add("noscroll");
};

const closeModal = () => {
    document.getElementById("image-modal").classList.remove("show");
    document.querySelector("body").classList.remove("noscroll");
};

document.querySelectorAll(".image-grid-img").forEach((imgEl) => {
    imgEl.addEventListener("click", openModal);
});

document
    .querySelector(".image-modal-backdrop")
    .addEventListener("click", closeModal);
document
    .querySelector(".image-modal-close")
    .addEventListener("click", closeModal);

function handleAccordion(e) {
    const accordionItem = e.target.closest(".accordion-item");

    if (accordionItem.classList.contains("active")) {
        accordionItem.classList.remove("active");
    } else {
        if (document.querySelector(".accordion-item.active")) {
            document
                .querySelector(".accordion-item.active")
                .classList.remove("active");
        }
        accordionItem.classList.add("active");
    }
}

document.querySelectorAll(".accordion-header > a").forEach((item) => {
    item.addEventListener("click", (e) => {
        handleAccordion(e);
    });
});
