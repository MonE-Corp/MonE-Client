import { EntityPage } from "../../Shared/Entity/EntityPage";
import { Expense,CreateExpense } from "./types";
import { FieldConfig } from "../../Shared/ui/types";
import * as api from "./api";

const expenseFields: FieldConfig[] = [
  {
    name: "amount",
    label: "Amount",
    type: "number",
    required: true,
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      { label: "Groceries", value: "Groceries" },
      { label: "Transport", value: "Transport" },
      { label: "Rent", value: "Rent" },
      { label: "Personal", value: "Personal" },
      { label: "Other", value: "Other" },
      { label: "Credit Payment", value: "Credit Payment" },
      { label: "Nepal", value: "Nepal" },
      { label: "Entertainment", value: "Entertainment" },
      { label: "Subscription", value: "Subscription" },
    ],
  },
  {
    name: "payment_type",
    label: "Payment Type",
    type: "text",
    required: true,
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
  },
  {
    name: "bank_institution",
    label: "Bank",
    type: "text"
  },
   {
    name: "expense_type",
    label: "Expense Type",
    type: "select",
    required: true,
    options: [
      { label: "Expenses", value: "Expenses" },
      { label: "Investment", value: "Investment" },
      { label: "Debt Payments", value: "Debt Payments" },
    ]
  }
];

export default function ExpensePage() {
  return (
    <EntityPage<Expense, CreateExpense>
      title="Expenses"
      fetchAll={api.fetchExpenses}
      addItem={api.addExpense}
      updateItem={api.updateExpense}
      deleteItem={api.deleteExpense}
      getId={(e) => e.expense_id}
      getCategory={(e) => e.category}
      getDate={(e) => e.date}
      getAmount={(e) => e.amount}
      columns={[
         { label: "Date", render: (e) => e.date, sortable:true, sortKey: (e) => e.date  },
         { label: "Category", render: (e) => e.category, sortable:true,  sortKey: (e) => e.category },
         { label: "Amount", render: (e) => e.amount },
         { label: "Description", render: (e) => e.description },
         { label: "Payment", render: (e) => e.payment_type },
         { label: "Bank", render: (e) => e.bank_institution },
         { label: "Type", render: (e) => e.expense_type },
      ]}
      modalFields={expenseFields}
    />
  );
}
