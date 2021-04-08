console.log("Client side javascript file is loaded");

// get elements
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2")

// event listener for submit and callback to fetch the data
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    // initial values for paragraphs, those will be replaced down below
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
           messageOne.textContent = data.location;
           messageTwo.textContent = data.forecast;
        }
    });
});
})