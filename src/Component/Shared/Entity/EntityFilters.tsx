interface EntityFiltersProps {
  years: number[];
  categories: string[];
  filters: {
    year: number | "";
    month: number | "";
    category: string;
  };
  onChange: (filters: EntityFiltersProps["filters"]) => void;
}

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export function EntityFilters({
  years,
  categories,
  filters,
  onChange,
}: EntityFiltersProps) {
  return (
    <div className="row mb-3">
      {/* Year */}
      <div className="col">
        <select
          className="form-select"
          value={filters.year}
          onChange={(e) =>
            onChange({ ...filters, year: e.target.value ? Number(e.target.value) : "" })
          }
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Month */}
      <div className="col">
        <select
          className="form-select"
          value={filters.month}
          onChange={(e) =>
            onChange({ ...filters, month: e.target.value ? Number(e.target.value) : "" })
          }
        >
          <option value="">All Months</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="col">
        <select
          className="form-select"
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
