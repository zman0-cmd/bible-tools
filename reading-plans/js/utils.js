function processReadingPlan(planData, startDate, totalDays) {
    let start = new Date(startDate);
    let books = planData.books;
    let plan = [];
    let chaptersPerDay = Math.ceil(1189 / totalDays);

    let currentBookIndex = 0;
    let currentChapter = 1;

    for (let day = 1; day <= totalDays; day++) {
        let reading = [];
        let chaptersLeft = chaptersPerDay;

        while (chaptersLeft > 0 && currentBookIndex < books.length) {
            let book = books[currentBookIndex];
            let chaptersInBook = book.chapters;

            let endChapter = Math.min(currentChapter + chaptersLeft - 1, chaptersInBook);
            reading.push(`${book.name} ${currentChapter} - ${endChapter}`);

            chaptersLeft -= (endChapter - currentChapter + 1);
            currentChapter = endChapter + 1;

            if (currentChapter > chaptersInBook) {
                currentBookIndex++;
                currentChapter = 1;
            }
        }

        let readingDate = new Date(start);
        readingDate.setDate(start.getDate() + (day - 1));

        plan.push(`${formatDate(readingDate)}: ${reading.join(", ")}`);
    }

    return plan;
}

function displayPlan(plan) {
    let outputTable = document.getElementById("output");
    outputTable.innerHTML = ""; // Clear previous content

    plan.forEach(entry => {
        let row = document.createElement("tr");

        let dateCell = document.createElement("td");
        dateCell.textContent = entry.date;

        let readingCell = document.createElement("td");
        readingCell.textContent = entry.readings.join(", "); // Format multiple readings

        row.appendChild(dateCell);
        row.appendChild(readingCell);
        outputTable.appendChild(row);
    });
}


function formatDate(date) {
    let dateFormat = document.querySelector('input[name="dateFormat"]:checked').value;
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (zero-based index, so add 1)
    let day = String(date.getDate()).padStart(2, '0'); // Get day
    let year = date.getFullYear(); // Get year
    
    if (dateFormat === "ISO"){
        return `${year}-${month}-${day}`; // YYYY-MM-DD
    }
        else if (dateFormat === "MDY"){
            return `${month}/${day}/${year}`; // MM/DD/YYYY
        }
        else if (dateFormat ==="DMY"){
            return `${day}/${month}/${year}`; // DD/MM/YYY
        }    
        else {
                return `none selected`;
            }

}


