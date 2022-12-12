import query from "./query";
import "./style.css";
const continentsHTML: HTMLSelectElement | null =
  document.querySelector("#continents");
const countriesHTML: HTMLOListElement | null =
  document.querySelector("#countries");
(async () => {
  try {
    const result = await query<{
      data: { continents: Array<{ name: string; code: string }> };
    }>(`{ continents { name, code } }`);
    const continents = result.data.continents;
    continents.forEach((continent) => {
      const opt = document.createElement("option");
      opt.value = continent.code;
      opt.innerText = continent.name;
      continentsHTML?.append(opt);
    });
  } catch (error) {
    console.log(error);
  }

  continentsHTML?.addEventListener("change", async (e) => {
    const selectTarget = e.target as HTMLSelectElement;
    const result = await query<{
      data: { continent: { countries: Array<{ name: string }> } };
    }>(
      ` query getCountries($code: ID!) { continent(code: $code) { countries { name } } } `,
      { code: selectTarget.value }
    );
    if (countriesHTML) countriesHTML.innerHTML = ``;
    result.data.continent.countries.forEach((country) => {
      const ol = document.createElement("option");
      ol.innerText = country.name;
      countriesHTML?.append(ol);
    });
  });
})();
