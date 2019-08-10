// ==UserScript==
// @name         Climbing route form simplifier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  make it easier to write multile routes by remembering previous form data
// @author       Glin
// @match        *www.lezec.cz/cesta.php?key=*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/tdivis/tampermonkey_scripts/master/www.lezec.cz/route_form_prefill.js
// ==/UserScript==

(function() {
    'use strict';

    // field names we want to store and restore later:
    const fieldNames = ["dtd", "dtm", "dty", "svd"];

    const denikForm = document.getElementById('iddenik');
    if (denikForm) {
        window.denikForm = denikForm;

        // save data on submit
        denikForm.addEventListener("submit", function () {
            const formData = {};
            for (const fieldName of fieldNames) {
                formData[fieldName] = denikForm[fieldName].value;
            }
            localStorage.setItem("formData", JSON.stringify(formData));
            return false;
        });

        // restore data from locas storage to form
        let formDataStr = localStorage.getItem('formData');
        if (formDataStr) {
            const formData = JSON.parse(formDataStr);
            for (const fieldName in formData) {
                denikForm[fieldName].value = formData[fieldName];
            }
        }
    }
})();
