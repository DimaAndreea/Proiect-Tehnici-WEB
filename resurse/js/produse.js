window.addEventListener("load", function () {
    const ITEMS_PER_PAGE = 10;
    let currentPage = 1;
    let filteredProduse = [];

    function remDiacritice(text) {
        const diacritice = "ăîâșț".split("");
        const rezultat = "aiast".split("");
        text = text.toLocaleLowerCase("ro-RO").trim();
        diacritice.forEach((_, i) => {
            text = text.replaceAll(diacritice[i], rezultat[i]);
        });
        return text;
    }

    function applyFilters() {
        const inpNume = remDiacritice(document.getElementById("inp-nume").value.trim().toLowerCase());
        const vRadio = document.getElementsByName("gr_rad_firma");
        let inpFirma;
        for (let r of vRadio) {
            if (r.checked) {
                inpFirma = r.value.toLowerCase();
                break;
            }
        }

        const inpPretMin = parseFloat(document.getElementById("inp-pret-min").value);
        const inpPretMax = parseFloat(document.getElementById("inp-pret-max").value);
        const inpCuloare = remDiacritice(document.getElementById("inp-culoare").value.trim().toLowerCase());

        const produse = document.getElementsByClassName("produs");
        filteredProduse = [];
        let found = false;

        for (let produs of produse) {
            produs.classList.remove("cel-mai-ieftin");
            const label = produs.querySelector(".label-ieftin");
            if (label) {
                label.remove();
            }
        }

        for (let produs of produse) {
            const valNume = remDiacritice(produs.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase());
            const cond1 = valNume.includes(inpNume);

            const valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
            const cond2 = valPret >= inpPretMin && valPret <= inpPretMax;

            const valFirma = produs.getElementsByClassName("val-firma")[0].innerHTML.toLowerCase().trim();
            const cond3 = inpFirma === "toate" || inpFirma === valFirma;

            const valCuloare = remDiacritice(produs.getElementsByClassName("val-culoare")[0].innerHTML.toLowerCase().trim());
            const cond4 = inpCuloare === "toate" || inpCuloare === valCuloare;

            if (cond1 && cond2 && cond3 && cond4) {
                filteredProduse.push(produs);
                found = true;
            } else {
                produs.style.display = "none";
            }
        }

        markCheapestProducts(filteredProduse);
        updatePagination(filteredProduse);
        sortAndDisplay();

        const noProductsMessage = document.getElementById("no-products-message");
        if (!found) {
            if (!noProductsMessage) {
                const noProductsMessage = document.createElement("p");
                noProductsMessage.id = "no-products-message";
                noProductsMessage.innerHTML = "Nu exista produse conform filtrării curente!";
                const container = document.getElementById("produse");
                container.appendChild(noProductsMessage);
            }
        } else if (noProductsMessage) {
            noProductsMessage.remove();
        }
    }

    function markCheapestProducts(products) {
        let cheapestProduct = null;
        let lowestPrice = Infinity;

        for (let produs of products) {
            const valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
            if (valPret < lowestPrice) {
                lowestPrice = valPret;
                cheapestProduct = produs;
            }
        }

        if (cheapestProduct) {
            cheapestProduct.classList.add("cel-mai-ieftin");
            const label = document.createElement("span");
            label.classList.add("label-ieftin");
            label.innerHTML = "Cel mai ieftin produs !";
            cheapestProduct.appendChild(label);
        }
    }

    function updatePagination(products) {
        const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.innerHTML = i;
            pageButton.onclick = function () {
                currentPage = i;
                displayPage(products, currentPage);
            };
            paginationContainer.appendChild(pageButton);
        }

        currentPage = 1;
        displayPage(products, currentPage);
    }

    function displayPage(products, page) {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = Math.min(start + ITEMS_PER_PAGE, products.length);
        for (let i = 0; i < products.length; i++) {
            if (i >= start && i < end) {
                products[i].style.display = "block";
            } else {
                products[i].style.display = "none";
            }
        }

        const numarProdusePePagina = end - start;
        document.getElementById("numar-produse").textContent = numarProdusePePagina;
    }

    function sortAndDisplay() {
        const sortKey1 = document.getElementById("sortKey1").value;
        const sortKey2 = document.getElementById("sortKey2").value;
        const sortOrder = document.querySelector('input[name="sortOrder"]:checked').value;
        sortProduse(sortOrder, sortKey1, sortKey2);
        displayPage(filteredProduse, currentPage);
    }

    function getProdusVal(produs, key) {
        switch (key) {
            case "pret":
                return parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
            case "nr_bucati":
                return parseInt(produs.getElementsByClassName("val-nr-bucati")[0].innerHTML);
            case "firma":
                return produs.getElementsByClassName("val-firma")[0].innerHTML.toLowerCase();
            case "tip_produs":
                return produs.getElementsByClassName("tip_produs")[0].innerHTML.toLowerCase();
            default:
                return "";
        }
    }

    function sortProduse(order, key1, key2) {
        const lista = document.getElementById("lista-produse");
        let produse = Array.from(lista.children);
        produse = produse.sort(function (a, b) {
            const valA1 = getProdusVal(a, key1);
            const valB1 = getProdusVal(b, key1);
            const valA2 = getProdusVal(a, key2);
            const valB2 = getProdusVal(b, key2);

            if (order === "asc") {
                if (valA1 === valB1) {
                    return valA2 < valB2 ? -1 : 1;
                } else {
                    return valA1 < valB1 ? -1 : 1;
                }
            } else {
                if (valA1 === valB1) {
                    return valA2 > valB2 ? -1 : 1;
                } else {
                    return valA1 > valB1 ? -1 : 1;
                }
            }
        });

        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }

        produse.forEach(produs => {
            lista.appendChild(produs);
        });
    }

    document.getElementById("sortKey1").addEventListener('change', sortAndDisplay);
    document.getElementById("sortKey2").addEventListener('change', sortAndDisplay);
    document.querySelectorAll('input[name="sortOrder"]').forEach(radio => {
        radio.addEventListener('change', sortAndDisplay);
    });

    document.getElementById("inp-pret-max").oninput = function () {
        document.getElementById("infoRangeMax").innerHTML = `(${this.value})`;
        applyFilters();
    };

    document.getElementById("inp-pret-min").oninput = function () {
        document.getElementById("infoRangeMin").innerHTML = `(${this.value})`;
        applyFilters();
    };

    document.getElementById("inp-nume").oninput = applyFilters;

    document.getElementById("inp-culoare").onchange = applyFilters;

    const vRadio = document.getElementsByName("gr_rad_firma");
    for (let r of vRadio) {
        r.onchange = applyFilters;
    }

    document.getElementById("resetare").onclick = function () {
        document.getElementById("inp-nume").value = "";
        document.getElementById("inp-pret-min").value = document.getElementById("inp-pret-min").min;
        document.getElementById("inp-pret-max").value = document.getElementById("inp-pret-max").max;
        document.getElementById("inp-culoare").value = "toate";
        document.getElementById("i_rad_toate").checked = true;
        const produse = document.getElementsByClassName("produs");
        document.getElementById("infoRangeMax").innerHTML = `(${document.getElementById("inp-pret-max").value})`;
        document.getElementById("infoRangeMin").innerHTML = `(${document.getElementById("inp-pret-min").value})`;

        for (let produs of produse) {
            produs.style.display = "block";
        }
        filteredProduse = Array.from(produse);
        markCheapestProducts(filteredProduse);
        updatePagination(filteredProduse);
        sortAndDisplay();
        document.getElementById("no-products-message")?.remove();
    };

    window.onkeydown = function(e){
        if (e.key == "c" && e.altKey){
            var suma = 0;
            var produse = document.getElementsByClassName("produs");
            for (let produs of produse){
                var stil = getComputedStyle(produs);
                if (stil.display != "none"){
                    suma += parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
                }
            }
            if (!document.getElementById("par_suma")){
                let p = document.createElement("p");
                p.innerHTML = suma;
                p.id = "par_suma";
                let container = document.getElementById("produse");
                container.insertBefore(p, container.children[0]);
                setTimeout(function(){
                    var pgf = document.getElementById("par_suma");
                    if(pgf)
                        pgf.remove();
                }, 2000);
            }
        }
    }

    applyFilters();
});
