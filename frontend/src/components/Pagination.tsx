export default function Pagination({
  page,
  pages,
  onPage,
}: {
  page: number;
  pages: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        Prev
      </button>

      <span className="pagination-info">
        Page {page} / {pages || 1}
      </span>

      <button
        className="pagination-button"
        disabled={page >= pages}
        onClick={() => onPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
