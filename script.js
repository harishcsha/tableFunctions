(function () {
    // Strict error checking
    'use strict';
    // Function generation to refactor when code gets long
    // Do something when you click the headline
    var ths = document.getElementsByTagName('th');
    var i;
    var sortOrder = 1; // 1: Ascending order, -1: Descending order

    for (i = 0; i < ths.length; i++) {
        // While i is less than ths.length, do the following while increasing i
        ths[i].addEventListener('click', function () {
            // NodeList
            var rows = document.querySelectorAll('tbody > tr');
            var rows = Array.prototype.slice.call(document.querySelectorAll('tbody > tr'));
            // Get the cell index number
            var col = this.cellIndex;
            // string, number
            var type = this.dataset.type;

            // Take a value and compare it This time td
            // tr, tr, tr Elements are passed in sequence
            rows.sort(function (a, b) {
                if (type === "number") {
                    var _a = a.children[col].textContent * 1;
                    var _b = b.children[col].textContent * 1;
                }
                if (type === "string") {
                    // tr Of the td elements inside the element, pull the contents of the clicked column.
                    var _a = a.children[col].textContent.toLowerCase();
                    // Make uppercase lowercase to eliminate case sensitivity .toLowerCase ();	
                    // Since this.cellIndex that pulls the child element td of a = tr tr cannot be inserted, define a variable var = col
                    var _b = b.children[col].textContent.toLowerCase();
                }
                // Reverse the return value to descend
                if (_a < _b) {
                    return -1 * sortOrder;
                }
                if (_a > _b) {
                    return 1 * sortOrder;
                }
                return 0;
            });
            var tbody = document.querySelector('tbody');

            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            var j;
            for (j = 0; j < rows.length; j++) {
                tbody.appendChild(rows[j]);
            }

            var k;
            for (k = 0; k < ths.length; k++) {
                ths[k].className = '';
            }
            this.className = sortOrder === 1 ? 'asc' : 'desc';

            sortOrder *= -1;

        });
    }

    const list = document.createDocumentFragment();
    const url = 'https://raw.githubusercontent.com/epsilon-ux/code-challenge-resources/main/cookies.json';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let result = data.cookies;
            const tbody = document.querySelector("table > tbody");
            result.forEach(ele => {
                let append = "";
                append += "<tr>";
                Object.values(ele).forEach(entry => {
                    append += `<td>${entry}</td>`;
                })
                append += "</tr>";
                tbody.innerHTML += append;
            });
        })
})();