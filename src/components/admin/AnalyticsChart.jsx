"use client";

import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  AreaChart as AreaIcon,
  BarChart3,
  PieChart as PieIcon,
  Lightbulb,
} from "lucide-react";
import TimeRangeSelector from "./TimeRangeSelector";
import styles from "./AnalyticsChart.module.css";

const DATA_SETS = {
  Weekly: [
    { name: "Mon", posted: 45, users: 32, hired: 12, rejected: 5 },
    { name: "Tue", posted: 52, users: 45, hired: 18, rejected: 8 },
    { name: "Wed", posted: 38, users: 28, hired: 15, rejected: 4 },
    { name: "Thu", posted: 65, users: 55, hired: 22, rejected: 12 },
    { name: "Fri", posted: 48, users: 40, hired: 20, rejected: 7 },
    { name: "Sat", posted: 30, users: 20, hired: 10, rejected: 3 },
    { name: "Sun", posted: 40, users: 25, hired: 14, rejected: 6 },
  ],
  Monthly: [
    { name: "Week 1", posted: 240, users: 180, hired: 80, rejected: 20 },
    { name: "Week 2", posted: 310, users: 220, hired: 95, rejected: 30 },
    { name: "Week 3", posted: 280, users: 195, hired: 70, rejected: 15 },
    { name: "Week 4", posted: 350, users: 260, hired: 110, rejected: 25 },
  ],
  Yearly: [
    { name: "Q1", posted: 1200, users: 900, hired: 400, rejected: 100 },
    { name: "Q2", posted: 1500, users: 1100, hired: 550, rejected: 120 },
    { name: "Q3", posted: 1100, users: 850, hired: 380, rejected: 90 },
    { name: "Q4", posted: 1800, users: 1400, hired: 700, rejected: 150 },
  ],
};

const COLORS = {
  posted: "#3b82f6",
  users: "#8b5cf6",
  hired: "#22c55e",
  rejected: "#ef4444",
};

export default function AnalyticsChart() {
  const [chartType, setChartType] = useState("area");
  const [timeRange, setTimeRange] = useState("Weekly");
  const [activeMetrics, setActiveMetrics] = useState({
    posted: true,
    users: true,
    hired: true,
    rejected: true,
  });

  const currentData = DATA_SETS[timeRange];

  const getDateRangeLabel = () => {
    if (timeRange === "Weekly") return "Feb 12, 2024 - Feb 18, 2024";
    if (timeRange === "Monthly") return "February 1, 2024 - February 29, 2024";
    return "January 2024 - December 2024";
  };

  const toggleMetric = (metric) => {
    setActiveMetrics((prev) => ({ ...prev, [metric]: !prev[metric] }));
  };

  const aggregatedData = useMemo(() => {
    return Object.keys(COLORS)
      .filter((key) => activeMetrics[key])
      .map((key) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        id: key,
        value: currentData.reduce((sum, entry) => sum + entry[key], 0),
        color: COLORS[key],
      }));
  }, [activeMetrics, currentData]);

  const getInterpretation = () => {
    if (aggregatedData.length === 0)
      return "Select metrics to view distribution.";
    const total = aggregatedData.reduce((acc, curr) => acc + curr.value, 0);
    const top = [...aggregatedData].sort((a, b) => b.value - a.value)[0];
    return `During this ${timeRange.toLowerCase()} period (${getDateRangeLabel()}), ${top.name} was the dominant activity.`;
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <div className={styles.titleArea}>
          <div className={styles.titleHeader}>
            <h3 className={styles.chartTitle}>Platform Ecosystem Analytics</h3>
            <span className={styles.rangeBadge}>{getDateRangeLabel()}</span>
          </div>

          <div className={styles.controlsRow}>
            <div className={styles.toggleGroup}>
              <button
                onClick={() => setChartType("area")}
                className={`${styles.typeBtn} ${chartType === "area" ? styles.typeActive : ""}`}
              >
                <AreaIcon size={14} /> Area
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={`${styles.typeBtn} ${chartType === "bar" ? styles.typeActive : ""}`}
              >
                <BarChart3 size={14} /> Bar
              </button>
              <button
                onClick={() => setChartType("pie")}
                className={`${styles.typeBtn} ${chartType === "pie" ? styles.typeActive : ""}`}
              >
                <PieIcon size={14} /> Pie
              </button>
            </div>

            <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
          </div>
        </div>

        <div className={styles.filterLegend}>
          {Object.keys(COLORS).map((key) => (
            <button
              key={key}
              onClick={() => toggleMetric(key)}
              className={`${styles.filterBtn} ${!activeMetrics[key] ? styles.inactive : ""}`}
            >
              <span
                className={styles.dot}
                style={{ backgroundColor: COLORS[key] }}
              ></span>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.graphWrapper}>
        <ResponsiveContainer width="100%" height={350}>
          {chartType === "pie" ? (
            <PieChart>
              <Pie
                data={aggregatedData}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {aggregatedData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : chartType === "bar" ? (
            <BarChart
              data={currentData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip />
              {activeMetrics.posted && (
                <Bar
                  dataKey="posted"
                  fill={COLORS.posted}
                  radius={[4, 4, 0, 0]}
                />
              )}
              {activeMetrics.users && (
                <Bar
                  dataKey="users"
                  fill={COLORS.users}
                  radius={[4, 4, 0, 0]}
                />
              )}
              {activeMetrics.hired && (
                <Bar
                  dataKey="hired"
                  fill={COLORS.hired}
                  radius={[4, 4, 0, 0]}
                />
              )}
              {activeMetrics.rejected && (
                <Bar
                  dataKey="rejected"
                  fill={COLORS.rejected}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          ) : (
            <AreaChart
              data={currentData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip />
              {activeMetrics.posted && (
                <Area
                  type="monotone"
                  dataKey="posted"
                  stroke={COLORS.posted}
                  fill={COLORS.posted}
                  fillOpacity={0.1}
                  strokeWidth={3}
                />
              )}
              {activeMetrics.users && (
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke={COLORS.users}
                  fill="transparent"
                  strokeWidth={2}
                />
              )}
              {activeMetrics.hired && (
                <Area
                  type="monotone"
                  dataKey="hired"
                  stroke={COLORS.hired}
                  fill={COLORS.hired}
                  fillOpacity={0.1}
                  strokeWidth={3}
                />
              )}
              {activeMetrics.rejected && (
                <Area
                  type="monotone"
                  dataKey="rejected"
                  stroke={COLORS.rejected}
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              )}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {chartType === "pie" && (
        <div className={styles.interpretationBox}>
          <h4 className={styles.interpretationTitle}>
            <Lightbulb size={18} /> {timeRange} Insight
          </h4>
          <p className={styles.interpretationText}>{getInterpretation()}</p>
        </div>
      )}
    </div>
  );
}
