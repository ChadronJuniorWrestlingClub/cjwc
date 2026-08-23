const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

document.querySelectorAll('a[href="calendar.html"]').forEach((link) => {
  link.textContent = "Schedule";
});

const boardGrid = document.querySelector(".board-grid");
const additionalBoardMembers = ["Taylor Coy", "Ali Redden", "Austin Thies"];

if (boardGrid) {
  additionalBoardMembers.forEach((member) => {
    const card = document.createElement("article");
    card.innerHTML = `<p>BOARD MEMBER</p><h3>${member.toUpperCase()}</h3>`;
    boardGrid.appendChild(card);
  });
}

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const noticesUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRvDVL61EWUqYyeaKzDv-eW2z4Ml4EilePLXbol2n0vk1zSA6QWqNXQZcxQUqxSnObsbZ3IqD0BgrYP/pub?gid=0&single=true&output=csv";
const noticeList = document.querySelector("#notice-list");
const noticesSection = document.querySelector(".notices-section");
const hero = document.querySelector(".hero");

if (noticesSection && hero) {
  hero.insertAdjacentElement("afterend", noticesSection);
}

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const nextCharacter = csv[index + 1];

    if (character === '"' && quoted && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(value.trim());
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && nextCharacter === "\n") index += 1;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function renderNotices(rows) {
  const [headers, ...entries] = rows;
  const columns = {};
  headers.forEach((header, index) => {
    columns[header.trim().toLowerCase()] = index;
  });
  const notices = entries.filter((entry) => entry.some(Boolean));

  if (!notices.length) {
    noticeList.textContent = "No club notices are posted right now. Check Remind for updates.";
    return;
  }

  noticeList.textContent = "";
  notices.forEach((entry) => {
    const type = entry[columns.type] || "Notice";
    const card = document.createElement("article");
    card.className = `notice-item ${type.toLowerCase().replace(/[^a-z]+/g, "-")}`;
    const label = document.createElement("span");
    label.className = "notice-type";
    label.textContent = type;
    const title = document.createElement("h3");
    title.textContent = entry[columns.title] || "Club Notice";
    const details = document.createElement("p");
    details.textContent = entry[columns.details] || "";
    const date = document.createElement("span");
    date.className = "notice-date";
    date.textContent = entry[columns.date] || "";
    card.append(label, title, details, date);
    noticeList.appendChild(card);
  });
}

if (noticeList) {
  fetch(noticesUrl, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Unable to load notices.");
      return response.text();
    })
    .then(parseCsv)
    .then(renderNotices)
    .catch(() => {
      noticeList.textContent = "Club notices are temporarily unavailable. Check Remind for the latest updates.";
    });
}
