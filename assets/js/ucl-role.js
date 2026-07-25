document.addEventListener("DOMContentLoaded", () => {
    const marshLogo = document.querySelector('img[src$="/marsh.png"], img[src$="marsh.png"]');
    if (marshLogo && !document.querySelector('img[data-ucl-logo-strip]')) {
        let marshCell = marshLogo.parentElement;

        while (marshCell?.parentElement && marshCell.parentElement.children.length < 3) {
            marshCell = marshCell.parentElement;
        }

        if (marshCell?.parentElement) {
            const uclCell = marshCell.cloneNode(true);
            const uclLogo = uclCell.querySelector("img");

            if (uclLogo) {
                uclLogo.src = "./assets/images/logos/ucl.png";
                uclLogo.alt = "UCL";
                uclLogo.width = 160;
                uclLogo.height = 64;
                uclLogo.dataset.uclLogoStrip = "";
            }

            uclCell.querySelectorAll("[aria-label]").forEach((element) => {
                element.setAttribute("aria-label", "UCL");
            });

            marshCell.parentElement.classList.add("logo-strip-with-ucl");
            marshCell.parentElement.insertBefore(uclCell, marshCell);
        }
    }

    const role = document.getElementById("ucl-teaching-role");
    if (!role) {
        return;
    }

    const heading = Array.from(document.querySelectorAll("h1, h2, h3")).find((element) =>
        element.textContent.replace(/\s+/g, " ").trim().includes("Different sectors. The same delivery problem")
    );

    const section = heading?.closest("section");
    if (!section) {
        return;
    }

    const existingRoles = Array.from(section.querySelectorAll("article")).filter((article) => article !== role);
    const destination = existingRoles.at(-1)?.parentElement || heading.parentElement;
    destination.appendChild(role);
});
