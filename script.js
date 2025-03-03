document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav ul li a");
    const content = document.getElementById("content");

    if (!content) {
        console.error("Error: No element with ID 'content' found.");
        return;
    }

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("href");

            fetch(page)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Page not found.");
                    }
                    return response.text();
                })
                .then(data => {
                    // Extract only the #content part
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, "text/html");
                    const newContent = doc.querySelector("#content").innerHTML;

                    content.innerHTML = newContent;
                    history.pushState(null, "", page);
                })
                .catch(error => console.error("Error loading page:", error));
        });
    });

    window.addEventListener("popstate", () => {
        location.reload(); // Reload when using back/forward buttons
    });
});
