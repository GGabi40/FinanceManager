// src/components/BalanceSummary.jsx
import { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from "chart.js";
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default function BalanceSummary({ balance }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const hasData = balance.income > 0 || balance.expense > 0;

  useEffect(() => {
    // limpiar si cambiamos a estado sin datos o si re-render
    if (!hasData && chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (!hasData) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvas.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Ingresos", "Gastos"],
        datasets: [
          {
            data: [balance.income, balance.expense],
            backgroundColor: ["#10B981", "#EF4444"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [hasData, balance.income, balance.expense]);

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="h6 fw-semibold mb-3">Resumen Financiero</h3>

        <div className="vstack gap-2">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-secondary">Balance Total:</span>
            <span className="fs-4 fw-bold">${balance.total.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-secondary">Ingresos:</span>
            <span className="text-success fw-medium">
              ${balance.income.toFixed(2)}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-secondary">Gastos:</span>
            <span className="text-danger fw-medium">
              ${balance.expense.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-3 chart-container">
          {hasData ? (
            <canvas ref={canvasRef} />
          ) : (
            <div className="h-100 d-flex align-items-center justify-content-center text-secondary">
              <small>Sin datos para graficar</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
