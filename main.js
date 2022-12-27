const url = "https://api.tvmaze.com/shows/5/episodes";
const row = document.querySelector(".cards");
// This function create element
const crateElement = (element) => {
  return document.createElement(`${element}`);
};
const fetchUsers = async () => {
  try {
    const res = await axios.get(url);
    let resData = res.data;
    resData.map((el) => {
      // Create Elements
      const cols = crateElement("div");
      const card = crateElement("div");
      const img = crateElement("img");
      const cardBody = crateElement("div");
      const title = crateElement("h5");
      const pElement = crateElement("p");
      const ul = crateElement("ul");
      const li = crateElement("li");
      const link = crateElement("a");
      //   Set attributes
      img.setAttribute("src", el.image.medium);
      cols.setAttribute("class", "col-12 col-sm-6 col-xl-3");
      card.setAttribute("class", "card w-100 mb-4");
      cardBody.setAttribute("class", "card-body");
      title.setAttribute("class", "card-title");
      pElement.setAttribute("class", "card-text");
      ul.setAttribute("class", "list-group list-group-flush");
      li.setAttribute("class", "list-group-item");
      link.setAttribute("class", "btn btn-primary");
      link.setAttribute("href", el._links.self.href.replace("api.", ""));
      //   Apeend
      row.append(cols);
      cols.append(card);
      card.append(img);
      card.append(cardBody);
      cardBody.append(title);
      title.append(el.name);
      pElement.append(el.summary.slice(3, 90) + " ...");
      cardBody.append(pElement);
      card.append(ul);
      li.append("S" + 0 + el.season + "E" + 0 + el.number);
      ul.append(li);
      link.append("Go somewhere");
      cardBody.append(link);
    });
  } catch (error) {
    console.log(error);
  }
};
fetchUsers();
