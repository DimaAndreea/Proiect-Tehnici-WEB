window.addEventListener("load", function () {
    document.getElementById("filtrare").onclick = function () {
        document.getElementById("inp-pret").onchange = function () {
            document.getElementById("infoRange").innerHTML = `${this.value}`;
        };

        var inpNume = document.getElementById("inp-nume").value.trim().toLowerCase();
        var vRadio = document.getElementsByName("gr_rad");
        var inpCalorii;
        for (let r of vRadio) {
            if (r.checked) {
                inpCalorii = r.value;
                break;
            }
        }
        let minCalorii, maxCalorii;
        if (inpCalorii != "toate") {
            var aux = inpCalorii.split(":");
            minCalorii = parseInt(aux[0]);
            maxCalorii = parseInt(aux[1]);
        }

        var inpPret = parseInt(document.getElementById("inp-pret").value);
        var inpCateg = document.getElementById("inp-categorie").value.trim().toLowerCase();
        var produse = document.getElementsByClassName("produs");
        console.log(produse);
        for (let produs of produse) {
            let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            let cond1 = valNume.startsWith(inpNume);
            console.log(produs);

            let valCalorii = parseInt(produs.getElementsByClassName("val-calorii")[0].innerHTML);
            let cond2 = (inpCalorii == "toate" || (minCalorii <= valCalorii && valCalorii < maxCalorii));

            let valPret = parseInt(produs.getElementsByClassName("val-pret")[0].innerHTML);
            let cond3 = valPret > inpPret;

            let valCategorie = produs.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase();
            let cond4 = inpCateg == "toate" || inpCateg == valCategorie;

            if (cond1 && cond2 && cond3 && cond4) {
                produs.style.display = "block";
            }
            else {
                produs.style.display = "none";
            }
        }
    };

    document.getElementById("resetare").onclick = function () {
        document.getElementById("inp-nume").value = "";
        document.getElementById("inp-pret").value = document.getElementById("inp-pret").min;
        document.getElementById("inp-categorie").value = "toate";
        document.getElementById("i_rad4").checked = true;
        var produse = document.getElementsByClassName("produs");
        document.getElementById("infoRange").innerHTML = "(0)";
        for (let prod of produse) {
            prod.style.display = "block";
        }
    };
});
