import "./style.css";
const continentsHTML = document.querySelector("#continents");
(async () => {
  try {
    const response = await fetch("https://countries.trevorblades.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: `{ continents { name, code } }` }),
    });
    const result = await response.json();
    const continents: Array<{ name: string; code: string }> =
      result.data.continents;
    continents.forEach((continent) => {
      const opt = document.createElement("option");
      opt.value = continent.code;
      opt.innerText = continent.name;
      continentsHTML?.append(opt);
    });
  } catch (error) {
    console.log(error);
  }
})();
