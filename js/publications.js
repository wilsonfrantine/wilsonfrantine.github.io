document.addEventListener("DOMContentLoaded", function () {
  const researchList = document.getElementById("research-list");
  const researchListContainer = document.querySelector(".research-list");
  const researchLeftButton = document.getElementById("researchLeft");
  const researchRightButton = document.getElementById("researchRight");

  /*******************************************
   * 8) ORCID - carregar publicações
   *******************************************/
  const orcidId = "0000-0002-4293-0471";
  const orcidUrl = `https://pub.orcid.org/v3.0/${orcidId}/works`;

  fetch(orcidUrl, { headers: { Accept: "application/json" } })
    .then((response) => response.json())
    .then((data) => {
      const works = data.group;
      works.forEach((workGroup) => {
        const workSummary = workGroup["work-summary"][0];
        const title = workSummary.title.title.value;
        const doi = workSummary["external-ids"]["external-id"].find(
          (id) => id["external-id-type"] === "doi"
        );
        const link = doi
          ? `https://doi.org/${doi["external-id-value"]}`
          : workSummary.url
            ? workSummary.url.value
            : "#";

        const pubItem = document.createElement("div");
        pubItem.classList.add("publication");
        pubItem.addEventListener("click", () => {
          window.open(link, "_blank");
        });

        pubItem.innerHTML = `
            <img
              src="https://cdn-icons-png.flaticon.com/512/3073/3073464.png"
              alt="Scientific document"
            />
            <p>${title}</p>
          `;
        researchList.appendChild(pubItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching ORCID data:", error);
      researchList.innerHTML =
        "<p>Unable to load publications at this time.</p>";
    });

  // Botões de scroll horizontal nas publicações (ORCID)
  researchLeftButton.addEventListener("click", () => {
    researchListContainer.scrollBy({ left: -300, behavior: "smooth" });
  });
  researchRightButton.addEventListener("click", () => {
    researchListContainer.scrollBy({ left: 300, behavior: "smooth" });
  });
});
