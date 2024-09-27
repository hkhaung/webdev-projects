import "./index.css";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = "http://localhost:8080/";

function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function login() {
    let resultsDiv = document.getElementById("results");
    let loginBtn = document.createElement("button");
    loginBtn.textContent = "Log Into Your Spotify Account";
    loginBtn.addEventListener("click", () => {
        let state = generateRandomString(16);
        let scope = "user-read-private user-read-email";

        let url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;
        window.location.href = url;
    });

    resultsDiv.appendChild(loginBtn);
}

function request_access_token() {
    window.onload = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get("code");
        const state = urlParams.get("state");

        const body = new URLSearchParams({
            grant_type: "authorization_code",
            code: authorizationCode,
            redirect_uri: redirect_uri,
        });

        const options = {
            method: "POST",
            headers: {
                Authorization: "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64"),
                "content-type": "application/x-www-form-urlencoded",
            },
            body: body,
        };

        fetch(`https://accounts.spotify.com/api/token`, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
    };
}

login();
request_access_token();
