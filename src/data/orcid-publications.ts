export interface Publication {
  title: string;
  url: string;
  year?: string;
  journal?: string;
}

export async function getOrcidPublications() {
  const orcidId = "0000-0002-4293-0471";
  const orcidUrl = `https://pub.orcid.org/v3.0/${orcidId}/works`;

  try {
    const response = await fetch(orcidUrl, { headers: { Accept: "application/json" } });
    const data = await response.json();
    const works = data.group || [];

    return works.map((workGroup: any) => {
      const summary = workGroup["work-summary"][0];
      const doi = summary["external-ids"]["external-id"]?.find(
        (id: any) => id["external-id-type"] === "doi"
      );
      
      return {
        title: summary.title.title.value,
        url: doi ? `https://doi.org/${doi["external-id-value"]}` : (summary.url?.value || "#"),
        year: summary["publication-date"]?.year?.value,
        journal: summary["journal-title"]?.value
      };
    }).sort((a: any, b: any) => (b.year || 0) - (a.year || 0));
  } catch (error) {
    console.error("Error fetching ORCID publications:", error);
    return [];
  }
}
