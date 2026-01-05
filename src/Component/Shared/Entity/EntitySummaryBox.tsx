import React from "react";

interface SummaryItem {
  label: string;
  amount: number;
  color?: string; // Optional custom color
}

interface EntitySummaryBoxProps {
  title?: string;
  items: SummaryItem[];
}

export function EntitySummaryBox({ title, items }: EntitySummaryBoxProps) {
  return (
    <div className="p-2">
      {title && <h6 className="mb-3 text-center fw-bold">{title}</h6>}

      <div className="row g-2">
        {items.map((item) => (
          <div key={item.label} className="col-6 col-md-4 col-lg-3">
            <div
              className="p-3 rounded shadow-sm text-center text-white"
              style={{
                backgroundColor: item.color || "#0d6efd", // default bootstrap primary
                minHeight: "70px",
              }}
            >
              <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "0.85rem" }}>${item.amount.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
