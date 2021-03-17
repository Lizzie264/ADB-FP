let onLoad = () => {
    let userName = document.getElementById("User")
    userName.textContent = localStorage["user"]
}


addEventListener("DOMContentLoaded", onLoad)