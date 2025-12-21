import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface ChartProps {
  incomeTotal: number;
  expenseTotal: number;
  investmentTotal: number;
  view?: "Net" | "Total";
}

export default function ChartComponent({
  incomeTotal,
  expenseTotal,
  investmentTotal,
  view = "Total",
}: ChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    /* -----------------------------
        DATA
    ----------------------------- */
    const data = [
      { label: "Income", value: incomeTotal },
      { label: "Expenses", value: expenseTotal },
      { label: "Investments", value: investmentTotal },
    ];

    /* -----------------------------
        RESPONSIVE SIZE
    ----------------------------- */
    const containerWidth = ref.current.parentElement?.clientWidth || 400;
    const height = 300;
    const margin = { top: 40, right: 20, bottom: 50, left: 60 };
    const width = containerWidth - margin.left - margin.right;

    svg
      .attr("width", "100%")
      .attr("height", height)
      .attr("viewBox", `0 0 ${containerWidth} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    /* -----------------------------
        TITLE
    ----------------------------- */
    svg
      .append("text")
      .attr("x", containerWidth / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(`${view} Overview`);

    /* -----------------------------
        SCALES
    ----------------------------- */
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)! * 1.1])
      .range([height - margin.top - margin.bottom, 0]);

    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range([
        "#2E8B57", // Income - green
        "#C0392B", // Expenses - red
        "#2980B9", // Investments - blue
      ]);

    /* -----------------------------
        AXES
    ----------------------------- */
    chart
      .append("g")
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    chart.append("g").call(
      d3.axisLeft(yScale).ticks(5).tickFormat((d) => `$${d}`)
    );

    /* -----------------------------
        BARS
    ----------------------------- */
    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.label)!)
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d.value))
      .attr("fill", (d) => colorScale(d.label)!);

    /* -----------------------------
        VALUE LABELS
    ----------------------------- */
    chart
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .text((d) => `$${d.value.toFixed(2)}`)
      .attr("x", (d) => xScale(d.label)! + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#333");
  }, [incomeTotal, expenseTotal, investmentTotal, view]);

  return <svg ref={ref} style={{ width: "100%", height: "300px" }} />;
}
