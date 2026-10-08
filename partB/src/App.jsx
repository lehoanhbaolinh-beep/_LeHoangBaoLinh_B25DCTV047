import { useState } from "react";
import { books } from "./data/books.js";
import Header from "./components/Header.jsx";
import Section from "./components/Section.jsx";
import GenreFilter from "./components/GenreFilter.jsx";
import BookList from "./components/BookList.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [favs, setFavs] = useState([]);       
  const [genre, setGenre] = useState("Tất cả");
  const genres = ["Tất cả", ...new Set(books.map(b => b.genre))];
  const shown = genre === "Tất cả" ? books : books.filter(b => b.genre === genre);
  const toggleFav = id =>
    setFavs(f => (f.includes(id) ? f.filter(x => x !== id) : [...f, id]));
  return (
    <>
      <Header favCount={favs.length} />
      <main>
        <Section title="Danh sách sách">
          <GenreFilter genres={genres} current={genre} onSelect={setGenre} />
          <p>Đang hiển thị {shown.length} / {books.length} cuốn</p>
          <BookList books={shown} favs={favs} onToggleFav={toggleFav} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
