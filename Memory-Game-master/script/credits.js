function displayCredits(){
    document.getElementById('credits').removeEventListener("click", displayCredits, false);

    var wrapper = document.getElementById("wrapper");
    wrapper.style.background  = "url(\'images/background-no-text.jpg\')";

    var creditsDiv = document.createElement("div");
    var creditsParagraph = document.createElement("div");
    var endParagraph = document.createElement("div");
    var okButton = document.createElement("div");

    creditsParagraph.style.margin = "40px";
    creditsParagraph.style.marginTop = "55px";
    creditsParagraph.style.marginBottom = "10px";
    creditsParagraph.style.textAlign = "center";
    endParagraph.style.marginTop = "10px";
    endParagraph.style.marginBottom = "15px";

    creditsDiv.id = "login-div";
    okButton.id = "start-btn";

    creditsParagraph.innerHTML =
        'The credits goes to Team "Lovelace"</br>' +
        'Team Members:</br>' +
        "1. Delcho Dimitrov <a href='https://softuni.bg/users/profile/show/kolimnared' target='_blank' style='margin-left: 50px'><img width='40px' height='40px' src='images/Delcho.jpg'/></a></br>" +
        "2. Daniel Jelev <a href='https://softuni.bg/users/profile/show/jinjaar' target='_blank' style='margin-left: 65px'><img width='40px' height='40px' src='images/Daniel.png'/></a></br>" +
        "3. Georgi Ivanov <a href='https://softuni.bg/users/profile/show/g.ivanoff' target='_blank' style='margin-left: 60px'><img width='40px' height='40px' src='images/Georgi.jpg'/></a></br>" +
        "4. Konstantin Kirchev <a href='https://softuni.bg/users/profile/show/konstantinkirchev' target='_blank' style='margin-left: 38px'><img width='40px' height='40px' src='images/Konstantin.png'/></a></br>" +
        "5. Tsvetelin Kutsarov <a href='https://softuni.bg/users/profile/show/tkutsarov' target='_blank' style='margin-left: 38px'><img width='40px' height='40px' src='images/Tsvetelin.jpg'/></a></br>";

    okButton.innerHTML = "Continue...";

    wrapper.appendChild(creditsDiv);
    creditsDiv.appendChild(creditsParagraph);
    creditsDiv.appendChild(endParagraph);
    creditsDiv.appendChild(okButton);

    slideOpen(creditsDiv, 450, 1.2);

    okButton.onclick = function(){
        document.getElementById('credits').addEventListener("click", displayCredits, false);
        slideClose(creditsDiv, 1.2);
        creditsDiv.remove();
    }
}
