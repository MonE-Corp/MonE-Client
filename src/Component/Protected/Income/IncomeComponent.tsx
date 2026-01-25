import { EntityPage } from "../../Shared/Entity/EntityPage";
import { Income, CreateIncome } from "./types";
import { FieldConfig } from "../../Shared/ui/types";
import * as api from "./api";

const incomeFields: FieldConfig[] = [
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "source", label: "Source", type: "text", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "description", label: "Description", type: "text" },
  { name: "tax", label: "Tax", type: "number" },
  { name: "cpp", label: "CPP", type: "number" },
  { name: "ei", label: "EI", type: "number" },
  {
    name: "income_type",
    label: "Income Type",
    type: "select",
    required: true,
    options: [
      { label: "Salary", value: "Salary" },
      { label: "Tax Return", value: "Tax return" },
      { label: "Interest", value: "Interest" },
      { label: "Other", value: "Other" },
    ],
  },
];



export default function IncomePage() {
    const renderIncomeTotals = (items: Income[]) => {
    const totalTax = items.reduce((s, i) => s + (i.tax ?? 0), 0);
    const totalCpp = items.reduce((s, i) => s + (i.cpp ?? 0), 0);
    const totalEi = items.reduce((s, i) => s + (i.ei ?? 0), 0);
    const totalNet = items.reduce(
      (s, i) => s + (i.amount - (i.tax ?? 0) - (i.cpp ?? 0) - (i.ei ?? 0)),
      0
    );

    return (
      <div className="card shadow-sm p-3 mb-3">
        <div className="row text-center">
          <div className="col">
            <strong>Total Tax</strong>
            <div>${totalTax.toFixed(2)}</div>
          </div>
          <div className="col">
            <strong>Total CPP</strong>
            <div>${totalCpp.toFixed(2)}</div>
          </div>
          <div className="col">
            <strong>Total EI</strong>
            <div>${totalEi.toFixed(2)}</div>
          </div>
          <div className="col">
            <strong>Net Income</strong>
            <div>${totalNet.toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <EntityPage<Income, CreateIncome>
      title="Income"
      fetchAll={api.fetchIncome}
      addItem={api.addIncome}
      updateItem={api.updateIncome}
      deleteItem={api.deleteIncome}
      getId={(i) => i.income_id}
      getCategory={(i) => i.source}
      getDate={(i) => i.date}
      getAmount={(i) => i.amount}
      columns={[
        { label: "Date", render: (i) => i.date, sortable: true, sortKey: (i) => i.date },
        { label: "Source", render: (i) => i.source, sortable: true, sortKey: (i) => i.source },
        { label: "Amount", render: (i) => i.amount },
        { label: "Tax", render: (i) => i.tax },
        { label: "CPP", render: (i) => i.cpp },
        { label: "EI", render: (i) => i.ei },
        { label: "Description", render: (i) => i.description },
         { label: "Type", render: (i) => i.income_type },
      ]}
      modalFields={incomeFields}
      summaryRenderer={renderIncomeTotals}
    />
  );
}
