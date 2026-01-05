import { useState, useEffect } from "react";
import { FieldConfig } from "../ui/types";

interface AddEditModalProps<T, C> {
  show: boolean;
  title: string;
  fields: FieldConfig[];
  initialData?: Partial<T>;
  onClose: () => void;
  onSave: (data: Partial<T> | C) => void;
}

export function AddEditModal<T, C>({
  show,
  title,
  fields,
  initialData,
  onClose,
  onSave,
}: AddEditModalProps<T, C>) {
  const [formData, setFormData] = useState<Partial<T>>({});

  useEffect(() => {
    setFormData(initialData ?? {});
  }, [initialData]);

  if (!show) return null;

  const handleChange = <K extends keyof T>(name: K, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {fields.map((f) => (
              <div className="mb-3" key={f.name}>
                <label className="form-label">{f.label}</label>

                {f.type === "select" ? (
                  <select
                    className="form-select"
                    value={(formData as any)[f.name] ?? ""}
                    onChange={(e) =>
                      handleChange(f.name as keyof T, e.target.value)
                    }
                    required={f.required}
                  >
                    <option value="">Select</option>
                    {f.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type ?? "text"}
                    className="form-control"
                    value={(formData as any)[f.name] ?? ""}
                    onChange={(e) =>
                      handleChange(f.name as keyof T, e.target.value)
                    }
                    required={f.required}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => onSave(formData)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
