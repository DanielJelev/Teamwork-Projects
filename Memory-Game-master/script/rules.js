function displayRules(){
    document.getElementById('rules').removeEventListener("click", displayRules, false);

    var wrapper = document.getElementById("wrapper");
    wrapper.style.background  = "url(\'images/background-no-text.jpg\')";

    var rulesDiv = document.createElement("div");
    var rulesParagraph = document.createElement("div");
    var endParagraph = document.createElement("div");
    var okButton = document.createElement("div");

    rulesParagraph.style.margin = "40px";
    rulesParagraph.style.marginTop = "80px";
    rulesParagraph.style.marginBottom = "10px";
    rulesParagraph.style.textAlign = "center";
    endParagraph.style.marginTop = "10px";
    endParagraph.style.marginBottom = "15px";

    rulesDiv.id = "login-div";
    okButton.id = "start-btn";

    rulesParagraph.innerHTML =
         "1. Choose two tiles from the board.</br>" +
         "2. If the picture is the same in both of them, they will remain open. If it is not, they will be closed.</br>" +
         "3. Open two tiles at a time, try to memorise the pictures of the ones that were not matched and have been closed.</br>" +
         "4. You have fixed time per level. Make sure to open all tiles by the time the slider at the top reaches the end.</br>" +
         "5. Levels start one after another without pause, so be ready to start the next level immediately after you have won the previous one.</br>";

    endParagraph.innerHTML = "GOOD LUCK!";
    okButton.innerHTML = "Continue...";

    wrapper.appendChild(rulesDiv);
    rulesDiv.appendChild(rulesParagraph);
    rulesDiv.appendChild(endParagraph);
    rulesDiv.appendChild(okButton);

    slideOpen(rulesDiv, 450, 1.2);

    okButton.onclick = function(){
        document.getElementById('rules').addEventListener("click", displayRules, false);
        slideClose(rulesDiv, 1.2);
        rulesDiv.remove();
    }
}
