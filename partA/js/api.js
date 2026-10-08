export const API_URL = "";
const check = r => { if (!r.ok) throw new Error("Lỗi HTTP " + r.status); return r; };
export async function getBooks() {
    return (await check(await fetch(API_URL || "./books.json"))).json();
}
export async function addBook(book) {
    if (!API_URL) return {...book, id: String(Date.now()) };
    const r = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(book) });
    return (await check(r)).json();
}
export async function deleteBook(id) {
    if (API_URL) check(await fetch(`${API_URL}/${id}`, { method: "DELETE" }));
}