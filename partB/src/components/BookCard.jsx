export default function BookCard({ book, isFav, onToggleFav }) {
  return (
    <article className="card">
      <h3>{book.title}</h3>
      <p>Tác giả: {book.author}</p>
      <p>{book.genre} • {book.year}</p>
      <div className="actions">
        <button className={"fav" + (isFav ? " active" : "")} onClick={() => onToggleFav(book.id)}>
          {isFav ? " Đã thích" : " Yêu thích"}
        </button>
      </div>
    </article>
  );
}
