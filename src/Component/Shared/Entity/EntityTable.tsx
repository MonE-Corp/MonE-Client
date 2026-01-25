import { useState } from "react";
import { Pencil, Trash, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { Pagination } from "./Pagination"; // your pagination component

interface Column<T> {
  label: string;
  render: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortKey?: (row: T) => string | number | Date;
}

interface EntityTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
  rowKey: (row: T) => string | number;
  initialPageSize?: number;
}

export function EntityTable<T>({
  rows,
  columns,
  onEdit,
  onDelete,
  rowKey,
  initialPageSize = 10,
}: EntityTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortConfig, setSortConfig] = useState<{
    key?: Column<T>;
    direction: "asc" | "desc";
  }>({ direction: "asc" });

  // Handle sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortConfig((prev) => {
      if (prev.key === column) {
        return { key: column, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key: column, direction: "asc" };
    });

    setCurrentPage(1); // reset page
  };

  // Sort rows
  const sortedRows = [...rows].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.key.sortKey) return 0;

    const aVal = sortConfig.key.sortKey(a);
    const bVal = sortConfig.key.sortKey(b);

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedRows.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows = sortedRows.slice(startIndex, startIndex + pageSize);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="table-responsive">
      <div className="d-flex justify-content-end mb-2">
        <label className="me-2 small mt-1">Rows per page:</label>
        <select
          className="form-select form-select-sm w-auto"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {[10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <table className="table table-striped table-hover table-sm">
        <thead className="small">
          <tr>
            {columns.map((c) => (
              <th
                key={c.label}
                style={{ cursor: c.sortable ? "pointer" : "default" }}
                onClick={() => handleSort(c)}
              >
                {c.label}{" "}
                {c.sortable && sortConfig.key === c && (
                  sortConfig.direction === "asc" ? <ChevronUp size={14}/> : <ChevronDown size={14}/>
                )}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="small">
          {paginatedRows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((c) => <td key={c.label}>{c.render(row)}</td>)}
              <td>
                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => onEdit(row)}><Pencil /></button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(row)}><Trash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
