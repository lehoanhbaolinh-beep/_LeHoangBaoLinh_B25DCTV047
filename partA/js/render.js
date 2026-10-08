const $ = id => document.getElementById(id);
export function createCard(book, isFav) {
  const card = document.createElement("article");
  card.className = "card"; card.dataset.id = book.id;
  const h = document.createElement("h3"); h.textContent = book.title;
  const a = document.createElement("p"); a.textContent = "Tác giả: " + book.author;
  const g = document.createElement("p"); g.textContent = `${book.genre} • ${book.year}`;
  const act = document.createElement("div"); act.className = "actions";
  const fav = document.createElement("button");
  fav.className = "fav" + (isFav ? " active" : ""); fav.dataset.action = "fav";
  fav.textContent = isFav ? "♥ Đã thích" : "♡ Yêu thích";
  const del = document.createElement("button"); del.dataset.action = "delete"; del.textContent = "Xóa";
  act.append(fav, del); card.append(h, a, g, act);
  return card;
}
export function renderList(books, favs) {
  $("book-list").replaceChildren(...books.map(b => createCard(b, favs.has(b.id))));
}
export function fillGenres(books) {
  const genres = [...new Set(books.map(b => b.genre))];
  const make = first => {
    const s = [first, ...genres].map((g, i) => new Option(g, i ? g : ""));
    return s;
  };
  $("genre-select").replaceChildren(...make("Tất cả thể loại"));
  document.querySelector("[name=genre]").replaceChildren(...make("-- Chọn thể loại --"));
}
export const setStatus = t => { $("status").textContent = t; };
export const setFavCount = n => { $("fav-count").textContent = n; };
