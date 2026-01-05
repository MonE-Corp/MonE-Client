import { useEffect, useState } from "react";
import { EntityFilters } from "./EntityFilters";
import { EntityTable } from "./EntityTable";
import { EntitySummaryBox } from "./EntitySummaryBox";
import { AddEditModal } from "../Modal/AddEditModal";
import { ConfirmDeleteModal } from "../Modal/ConfirmDeleteModal";
import { PieChart } from "../PieChart";
import { useAuth } from "../../../Context/AuthContext";
import { FieldConfig } from "../ui/types";

interface EntityPageProps<T, C> {
  title: string;
  fetchAll: (token: string) => Promise<T[]>;
  addItem: (token: string, data: C) => Promise<T>;
  updateItem: (token: string, id: number, data: Partial<T>) => Promise<T>;
  deleteItem: (token: string, id: number) => Promise<void>;

  getId: (item: T) => number;
  getCategory: (item: T) => string;
  getDate: (item: T) => string;
  getAmount: (item: T) => number;

  columns: {
    label: string;
    render: (item: T) => React.ReactNode;
    sortable?: boolean;
    sortKey?: (row: T) => string | number | Date;
  }[];

  modalFields: FieldConfig[];
}

export function EntityPage<T, C>({
  title,
  fetchAll,
  addItem,
  updateItem,
  deleteItem,
  getId,
  getCategory,
  getDate,
  getAmount,
  columns,
  modalFields,
}: EntityPageProps<T, C>) {
  const { token, logout } = useAuth();

  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState<T | null>(null);
  const [deleting, setDeleting] = useState<T | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState<{
    year: number | "";
    month: number | "";
    category: string;
  }>({ year: "", month: "", category: "" });

  

  useEffect(() => {
    if (!token) return;

    fetchAll(token)
      .then(setItems)
      .catch((e) => e.message === "UNAUTHORIZED" && logout())
      .finally(() => setLoading(false));
  }, [token]);

  const filtered = items.filter((item) => {
    const d = new Date(getDate(item));
    if (filters.year && d.getFullYear() !== filters.year) return false;
    if (filters.month && d.getMonth() + 1 !== filters.month) return false;
    if (filters.category && getCategory(item) !== filters.category) return false;
    return true;
  });

  const summaryMap = filtered.reduce((acc: Record<string, number>, item) => {
    const key = getCategory(item);
    acc[key] = (acc[key] || 0) + getAmount(item);
    return acc;
  }, {});

  const summaryData = Object.entries(summaryMap).map(([label, amount]) => ({
    label,
    amount,
  }));

  const summaryDataWithColors = summaryData.map((s, index) => ({
  ...s,
  color: ["#0d6efd", "#198754", "#ffc107", "#dc3545"][index % 4], // custom palette
}));

  const years = Array.from(
    new Set(items.map((i) => new Date(getDate(i)).getFullYear()))
  );
  const categories = Array.from(new Set(items.map(getCategory)));

  const saveHandler = async (data: Partial<T> | C) => {
    if (!token) return;

    if (editing) {
      const updated = await updateItem(
        token,
        getId(editing),
        data as Partial<T>
      );
      setItems((prev) =>
        prev.map((i) => (getId(i) === getId(editing) ? updated : i))
      );
    } else {
      const created = await addItem(token, data as C);
      setItems((prev) => [...prev, created]);
    }

    setShowModal(false);
  };

  const deleteHandler = async () => {
    if (!token || !deleting) return;
    await deleteItem(token, getId(deleting));
    setItems((prev) => prev.filter((i) => getId(i) !== getId(deleting)));
    setDeleting(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-3">
      <h2>{title}</h2>

      <EntityFilters
        years={years}
        categories={categories}
        filters={filters}
        onChange={setFilters}
      />

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setEditing(null);
          setShowModal(true);
        }}
      >
        + Add {title}
      </button>

      <div className="row mb-4">
        <div className="col-md-6">
          <PieChart
            data={summaryData.map((s) => ({
              category: s.label,
              amount: s.amount,
            }))}
          />
        </div>
        <div className="col-md-6">
          <EntitySummaryBox title="Category Breakdown" items={summaryDataWithColors} />
        </div>
      </div>

      <EntityTable
        rows={filtered}
        rowKey={getId}
        columns={columns}
        onEdit={(i) => {
          setEditing(i);
          setShowModal(true);
        }}
        onDelete={(i) => setDeleting(i)}
      />

      <AddEditModal<T,C>
        show={showModal}
        title={editing ? `Edit ${title}` : `Add ${title}`}
        initialData={editing ?? undefined}
        fields={modalFields}
        onClose={() => setShowModal(false)}
        onSave={saveHandler}
      />

      <ConfirmDeleteModal
        show={!!deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={deleteHandler}
      />
    </div>
  );
}
