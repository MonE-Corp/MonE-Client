import { FC, useState } from "react";

interface ExpenseItem {
  amount: number;
  bank_institution?: string;
  payment_type?: "Credit" | "Debit";
  expense_type?: "Expenses" | "Debt_Payment" | "Investment";  
}

interface InsightsProps {
  totalIncome: number;
  netIncome: number;
  totalExpenses: number;
  netExpenses: number;
  totalInvestments: number;
  expenses: ExpenseItem[];
}

const Insights: FC<InsightsProps> = ({
  totalIncome,
  netIncome,
  totalExpenses,
  netExpenses,
  totalInvestments,
  expenses,
}) => {
  /* -----------------------------
      MODAL STATE
  ----------------------------- */
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  /* -----------------------------
      CALCULATIONS
  ----------------------------- */
  const netExpensePercent =
    totalExpenses > 0 ? (netExpenses / totalExpenses) * 100 : 0;

  const netIncomePercent =
    totalIncome > 0 ? (netIncome / totalIncome) * 100 : 0;

  const investedPercent =
    totalIncome > 0 ? (totalInvestments / totalIncome) * 100 : 0;

  /* -----------------------------
      BANK INSTITUTION LOGIC
  ----------------------------- */
  const institutionStats = expenses.reduce<Record<string, { credit: number; debit: number }>>(
    (acc, e) => {
      if (!e.bank_institution) return acc;

      if (!acc[e.bank_institution]) {
        acc[e.bank_institution] = { credit: 0, debit: 0 };
      }

      if (e.payment_type === "Credit") acc[e.bank_institution].credit += e.amount;
      if (e.payment_type === "Debit") acc[e.bank_institution].debit += e.amount;

      return acc;
    },
    {}
  );

  const institutions = Object.keys(institutionStats);

  const topCreditInstitution = institutions.reduce(
    (top, inst) =>
      institutionStats[inst].credit >
      (institutionStats[top]?.credit || 0)
        ? inst
        : top,
    institutions[0]
  );

  const topDebitInstitution = institutions.reduce(
    (top, inst) =>
      institutionStats[inst].debit >
      (institutionStats[top]?.debit || 0)
        ? inst
        : top,
    institutions[0]
  );

  /* -----------------------------
      OPEN MODAL
  ----------------------------- */
  const openInfo = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);

    // @ts-ignore
    const modal = new bootstrap.Modal(
      document.getElementById("insightInfoModal")
    );
    modal.show();
  };

  /* -----------------------------
      UI
  ----------------------------- */
  return (
    <>
      <div className="row g-3">
        <InsightCard
          title="% Net Expense"
          value={`${netExpensePercent.toFixed(1)}%`}
          sub={`$${netExpenses.toFixed(2)} of $${totalExpenses.toFixed(2)}`}
          onInfo={() =>
            openInfo(
              "Net Expense",
              "Net Expense includes only real living expenses and excludes debt payments and investments."
            )
          }
        />

        <InsightCard
          title="% Net Income"
          value={`${netIncomePercent.toFixed(1)}%`}
          sub={`$${netIncome.toFixed(2)} of $${totalIncome.toFixed(2)}`}
          onInfo={() =>
            openInfo(
              "Net Income",
              "Net Income includes stable income sources like salary and excludes refunds or one-time income."
            )
          }
        />

        <InsightCard
          title="% Income Invested"
          value={`${investedPercent.toFixed(1)}%`}
          sub={`$${totalInvestments.toFixed(2)} invested`}
          onInfo={() =>
            openInfo(
              "Income Invested",
              "Shows how much of your income was invested for future growth."
            )
          }
        />

        <InsightCard
          title="Institutions Used"
          value={institutions.length.toString()}
          sub={institutions.join(", ") || "None"}
          onInfo={() =>
            openInfo(
              "Institutions",
              "All banks and cards involved in your spending."
            )
          }
        />

        <InsightCard
          title="Top Credit Institution"
          value={topCreditInstitution || "N/A"}
          sub={
            topCreditInstitution
              ? `$${institutionStats[topCreditInstitution].credit.toFixed(2)}`
              : "-"
          }
          onInfo={() =>
            openInfo(
              "Credit Usage",
              "The bank whose credit card was used the most."
            )
          }
        />

        <InsightCard
          title="Top Debit Institution"
          value={topDebitInstitution || "N/A"}
          sub={
            topDebitInstitution
              ? `$${institutionStats[topDebitInstitution].debit.toFixed(2)}`
              : "-"
          }
          onInfo={() =>
            openInfo(
              "Debit Usage",
              "The bank whose debit card was used the most."
            )
          }
        />
      </div>

      {/* -----------------------------
          MODAL
      ----------------------------- */}
      <div
        className="modal fade"
        id="insightInfoModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">{modalContent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insights;

/* -----------------------------
    CARD
----------------------------- */
const InsightCard: FC<{
  title: string;
  value: string;
  sub: string;
  onInfo: () => void;
}> = ({ title, value, sub, onInfo }) => (
  <div className="col-12 col-sm-6 col-lg-4">
    <div className="card h-100 p-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">{title}</h6>
        <span
          role="button"
          onClick={onInfo}
          className="badge rounded-pill bg-light text-dark border"
          title="More info"
        >
          ?
        </span>
      </div>

      <h3 className="mt-2">{value}</h3>
      <small className="text-muted">{sub}</small>
    </div>
  </div>
);
