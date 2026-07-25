document.addEventListener("DOMContentLoaded", () => {
    const normalise = (value) => value.replace(/\s+/g, " ").trim().toLowerCase();

    const collaboratorsHeading = Array.from(document.querySelectorAll("h2")).find((heading) =>
        normalise(heading.textContent).includes("technical range matters. how you work matters too")
    );

    if (collaboratorsHeading) {
        collaboratorsHeading.textContent = "How I work with people.";
    }

    const exploreTrigger = Array.from(
        document.querySelectorAll("button, summary, [role='button'], a")
    ).find((element) => normalise(element.textContent) === "explore");

    if (!exploreTrigger) {
        return;
    }

    const controlledMenuId = exploreTrigger.getAttribute("aria-controls");
    let menu = controlledMenuId ? document.getElementById(controlledMenuId) : null;

    if (!menu) {
        menu =
            exploreTrigger.nextElementSibling ||
            exploreTrigger.parentElement?.querySelector(
                ":scope > [role='menu'], :scope > .dropdown-menu, :scope > .nav-dropdown"
            );
    }

    if (!menu || menu.dataset.simplified === "true") {
        return;
    }

    const keep = ["experience", "project", "blog"];

    menu.querySelectorAll("a").forEach((link) => {
        let label = normalise(link.textContent);

        if (label.startsWith("selected work")) {
            link.textContent = "Projects";
            label = "projects";
        } else if (label.startsWith("writing")) {
            link.textContent = "Blog";
            label = "blog";
        }

        if (keep.some((destination) => label.startsWith(destination))) {
            return;
        }

        const item = link.closest("li") || link;
        item.remove();
    });

    menu.dataset.simplified = "true";
});
