export default function GenreFilter({ genres, current, onSelect }) {
  return (
    <div className="genres">
      {genres.map(g => (
        <button key={g} className={g === current ? "on" : ""} onClick={() => onSelect(g)}>{g}</button>
      ))}
    </div>
  );
}
