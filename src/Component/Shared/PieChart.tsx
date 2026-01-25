// features/shared/components/PieChart.tsx
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface PieChartProps {
  data: { category: string; amount: number }[];
  width?: number;
  height?: number;
}

export const PieChart = ({ data, width = 300, height = 300 }: PieChartProps) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2;
    const pie = d3.pie<{ category: string; amount: number }>().value(d => d.amount);
    const arc = d3.arc<d3.PieArcDatum<{ category: string; amount: number }>>().innerRadius(0).outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    const arcs = g.selectAll("arc").data(pie(data)).enter().append("g");

    arcs.append("path")
      .attr("d", arc as any)
      .attr("fill", (d) => color(d.data.category));

    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .text(d => d.data.category);
  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height}></svg>;
};
