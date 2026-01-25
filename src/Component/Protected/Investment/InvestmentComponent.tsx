// features/investments/InvestmentPage.tsx
import { EntityPage } from "../../Shared/Entity/EntityPage";
import { Investment, CreateInvestment } from "./types";
import { FieldConfig } from "../../Shared/ui/types";
import * as api from "./api";
const investmentFields: FieldConfig[] = [
  { name: "type", label: "Type", type: "select", required: true, options: [
      { label: "Stocks", value: "Stocks" },
      { label: "Crypto", value: "Crypto" },
      { label: "Mutual Fund", value: "Mutual Fund" },
      { label: "Real Estate", value: "Real Estate" },
      { label: "Other", value: "Other" },
    ]
  },
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "platform", label: "Platform", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "invested_date", label: "Invested Date", type: "date", required: true },
];

export default function InvestmentPage() {
 // Render only Total Investment
  const renderInvestmentTotals = (items: Investment[]) => {
    const totalInvestment = items.reduce((s, i) => s + (Number(i.amount) || 0), 0);

    return (
      <div className="card shadow-sm p-3 mb-3 text-center">
        <strong>Total Investment</strong>
        <div style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>
          ${totalInvestment.toFixed(2)}
        </div>
      </div>
    );
  };

  return (
    <EntityPage<Investment, CreateInvestment>
      title="Investments"
      fetchAll={api.fetchInvestments}
      addItem={api.addInvestment}
      updateItem={api.updateInvestment}
      deleteItem={api.deleteInvestment}
      getId={(i) => i.investment_id}
      getCategory={(i) => i.type}
      getDate={(i) => i.invested_date}
      getAmount={(i) => Number(i.amount)}
      columns={[
        { label: "Date", render: (i) => i.invested_date, sortable: true, sortKey: (i) => i.invested_date },
        { label: "Type", render: (i) => i.type, sortable: true, sortKey: (i) => i.type },
        { label: "Amount", render: (i) => Number(i.amount).toFixed(2) },
        { label: "Platform", render: (i) => i.platform },
        { label: "Description", render: (i) => i.description },
      ]}
      modalFields={investmentFields}
      summaryRenderer={renderInvestmentTotals}
    />
  );
}
