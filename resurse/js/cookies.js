
function setCookie(name, value, expirySeconds) {
    var d = new Date();
    d.setTime(d.getTime() + (expirySeconds * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        deleteCookie(name);
    }
}

function saveFilters() {
    let filters = {
        nume: document.getElementById("inp-nume").value,
        conectivitate: document.getElementById("inp-conectivitate").value,
        compatibilitate: Array.from(document.querySelectorAll('input[name="gr_compatibilitate"]:checked')).map(cb => cb.value),
        compatibilitate_optiune: document.querySelector('input[name="compatibilitate_optiune"]:checked').value,
        tip_tastatura: document.querySelector('input[name="gr_rad"]:checked').value,
        pret: document.getElementById("inp-pret").value,
        categorie: document.getElementById("inp-categorie").value,
        salveaza_filtrare: document.getElementById("salveaza-filtrare").checked
    };
    setCookie("filters", JSON.stringify(filters), 3600); // Salvează filtrele într-un cookie pentru o oră
}

function loadFilters() {
    let filters = getCookie("filters");
    if (filters) {
        filters = JSON.parse(filters);
        document.getElementById("inp-nume").value = filters.nume || "";
        document.getElementById("inp-conectivitate").value = filters.conectivitate || "";
        document.querySelectorAll('input[name="gr_compatibilitate"]').forEach(cb => {
            cb.checked = filters.compatibilitate.includes(cb.value);
        });
        document.querySelector(`input[name="compatibilitate_optiune"][value="${filters.compatibilitate_optiune}"]`).checked = true;
        document.querySelector(`input[name="gr_rad"][value="${filters.tip_tastatura}"]`).checked = true;
        document.getElementById("inp-pret").value = filters.pret || 0;
        document.getElementById("inp-categorie").value = filters.categorie || "toate";
        document.getElementById("salveaza-filtrare").checked = filters.salveaza_filtrare || false; 
    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filtrare").addEventListener("click", function() {
        saveFilters();
    });


    setCookie("ultima_pagina_accesata", document.URL.split("/").pop(), 60); 

    var okCookiesButton = document.getElementById("ok_cookies");
    if (okCookiesButton) {
        okCookiesButton.onclick = function () {
            setCookie("acceptat_banner", true, 60);
            var banner = document.getElementById("banner");
            if (banner) {
                banner.style.display = "none";
                loadFilters(); 
            }
        };
    }

    document.getElementById("ultima-pagina-accesata").innerHTML = getCookie("ultima_pagina_accesata");

    if (getCookie("acceptat_banner")) {
        loadFilters(); 
    }


    var banner = document.getElementById("banner");
    if (!getCookie("acceptat_banner")) {
        if (banner) {
            banner.style.display = "flex";
        }
    }
});