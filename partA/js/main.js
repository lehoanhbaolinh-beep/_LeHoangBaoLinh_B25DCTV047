import { getBooks, addBook, deleteBook } from "./api.js";
import { loadFavs, saveFavs, loadTheme, saveTheme } from "./storage.js";
import { validateField } from "./validate.js";
import { renderList, fillGenres, setStatus, setFavCount } from "./render.js";
let books = [],
    favs = loadFavs();
const $ = id => document.getElementById(id);

function update() {
    const q = $("search").value.trim().toLowerCase(),
        g = $("genre-select").value;
    const shown = books.filter(b => b.title.toLowerCase().includes(q) && (!g || b.genre === g));
    renderList(shown, favs);
    setFavCount(favs.size);
    setStatus(`Đang hiển thị ${shown.length} / ${books.length} cuốn`);
}
async function init() {
    document.documentElement.dataset.theme = loadTheme();
    setStatus("Đang tải…");
    try { books = await getBooks();
        fillGenres(books);
        update(); } catch (e) { setStatus("Không tải được dữ liệu: " + e.message); }
}
$("search").addEventListener("input", update);
$("genre-select").addEventListener("change", update);
$("theme-btn").addEventListener("click", () => {
    const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = t;
    saveTheme(t);
});
$("book-list").addEventListener("click", async e => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = btn.closest(".card").dataset.id;
    if (btn.dataset.action === "fav") {
        favs.has(id) ? favs.delete(id) : favs.add(id);
        saveFavs(favs);
        update();
    } else if (confirm("Bạn chắc chắn muốn xóa cuốn sách này?")) {
        try { await deleteBook(id);
            books = books.filter(b => b.id !== id);
            favs.delete(id);
            saveFavs(favs);
            update(); } catch (err) { setStatus("Xóa thất bại: " + err.message); }
    }
});

const form = $("book-form");

function checkField(el) {
    const msg = validateField(el.name, el.value);
    el.classList.toggle("invalid", !!msg);
    el.parentElement.querySelector(".error").textContent = msg;
    return !msg;
}
form.addEventListener("input", e => checkField(e.target));
form.addEventListener("submit", async e => {
    e.preventDefault();
    const fields = [...form.querySelectorAll("input,select")];
    if (!fields.map(checkField).every(Boolean)) return;
    const data = Object.fromEntries(new FormData(form));
    data.title = data.title.trim();
    data.author = data.author.trim();
    data.year = Number(data.year);
    try {
        books.unshift(await addBook(data));
        form.reset();
        fillGenres(books);
        update();
    } catch (err) { setStatus("Thêm thất bại: " + err.message); }
});

init();