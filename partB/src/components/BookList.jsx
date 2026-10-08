import BookCard from "./BookCard.jsx";
export default function BookList({ books, favs, onToggleFav }) {
  return (
    <div className="grid">
      {books.map(b => (
        <BookCard key={b.id} book={b} isFav={favs.includes(b.id)} onToggleFav={onToggleFav} />
      ))}
    </div>
  );
}
