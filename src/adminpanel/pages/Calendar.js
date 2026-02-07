import React, { useState, useEffect, useMemo } from "react";

/*
    Simple Calendar page component
    - Month view with prev/today/next navigation
    - Click a day to select; add events via button (prompt)
    - Events persisted in localStorage under "admin_calendar_events"
    Drop this file into /src/adminpanel/pages/Calendar.js
*/

function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}
function formatKey(date) {
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
}
function monthLabel(date) {
    return date.toLocaleString(undefined, { month: "long", year: "numeric" });
}

export default function Calendar() {
    const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
    const [selected, setSelected] = useState(() => formatKey(new Date()));
    const [events, setEvents] = useState(() => {
        try {
            const raw = localStorage.getItem("admin_calendar_events");
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    });

    useEffect(() => {
        localStorage.setItem("admin_calendar_events", JSON.stringify(events));
    }, [events]);

    const weeks = useMemo(() => {
        const first = startOfMonth(cursor);
        const last = endOfMonth(cursor);

        // Start from Sunday before or same as first
        const startWeek = new Date(first);
        startWeek.setDate(first.getDate() - first.getDay()); // 0 = Sunday

        const days = [];
        let cur = new Date(startWeek);
        while (cur <= last || cur.getDay() !== 0) {
            days.push(new Date(cur));
            cur = addDays(cur, 1);
        }

        // Group into weeks
        const grouped = [];
        for (let i = 0; i < days.length; i += 7) {
            grouped.push(days.slice(i, i + 7));
        }
        return grouped;
    }, [cursor]);

    function changeMonth(delta) {
        setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
    }
    function goToday() {
        const today = new Date();
        setCursor(startOfMonth(today));
        setSelected(formatKey(today));
    }
    function addEventOn(dateKey) {
        const text = prompt("Event title:");
        if (!text) return;
        setEvents((prev) => {
            const copy = { ...prev };
            copy[dateKey] = copy[dateKey] ? [...copy[dateKey], text] : [text];
            return copy;
        });
    }
    function removeEvent(dateKey, index) {
        setEvents((prev) => {
            const copy = { ...prev };
            if (!copy[dateKey]) return prev;
            copy[dateKey] = copy[dateKey].filter((_, i) => i !== index);
            if (copy[dateKey].length === 0) delete copy[dateKey];
            return copy;
        });
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.controls}>
                    <button onClick={() => changeMonth(-1)}>◀</button>
                    <button onClick={goToday}>Today</button>
                    <button onClick={() => changeMonth(1)}>▶</button>
                </div>
                <h2 style={{ margin: 0 }}>{monthLabel(cursor)}</h2>
                <div />
            </div>

            <div style={styles.body}>
                <div style={styles.calendar}>
                    <div style={styles.weekRow}>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                            <div key={d} style={{ ...styles.cell, ...styles.weekday }}>
                                {d}
                            </div>
                        ))}
                    </div>

                    {weeks.map((week, wi) => (
                        <div key={wi} style={styles.weekRow}>
                            {week.map((day) => {
                                const key = formatKey(day);
                                const isOtherMonth = day.getMonth() !== cursor.getMonth();
                                const isToday = key === formatKey(new Date());
                                const isSelected = key === selected;
                                const evs = events[key] || [];
                                return (
                                    <div
                                        key={key}
                                        style={{
                                            ...styles.cell,
                                            ...(isOtherMonth ? styles.otherMonth : {}),
                                            ...(isSelected ? styles.selected : {}),
                                        }}
                                        onClick={() => setSelected(key)}
                                        onDoubleClick={() => addEventOn(key)}
                                        title="Double-click to add event"
                                    >
                                        <div style={styles.dayHeader}>
                                            <span>{day.getDate()}</span>
                                            {isToday && <span style={styles.todayDot} />}
                                        </div>
                                        <div style={styles.eventList}>
                                            {evs.slice(0, 3).map((e, i) => (
                                                <div key={i} style={styles.eventChip}>
                                                    {e}
                                                </div>
                                            ))}
                                            {evs.length > 3 && (
                                                <div style={styles.more}>+{evs.length - 3}</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <aside style={styles.side}>
                    <h3 style={{ marginTop: 0 }}>Events — {selected}</h3>
                    <div>
                        <button onClick={() => addEventOn(selected)}>Add event</button>
                    </div>
                    <div style={{ marginTop: 12 }}>
                        {(events[selected] || []).length === 0 && (
                            <div style={{ color: "#666" }}>No events</div>
                        )}
                        {(events[selected] || []).map((e, i) => (
                            <div key={i} style={styles.eventRow}>
                                <div style={{ flex: 1 }}>{e}</div>
                                <button
                                    onClick={() => removeEvent(selected, i)}
                                    style={styles.trash}
                                    aria-label="Remove event"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        padding: 20,
        color: "#222",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    controls: {
        display: "flex",
        gap: 8,
    },
    body: {
        display: "flex",
        gap: 16,
    },
    calendar: {
        flex: 1,
        border: "1px solid #e0e0e0",
        borderRadius: 6,
        overflow: "hidden",
    },
    weekRow: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        borderBottom: "1px solid #f0f0f0",
    },
    cell: {
        minHeight: 90,
        padding: 8,
        boxSizing: "border-box",
        borderRight: "1px solid #f7f7f7",
        background: "#fff",
    },
    weekday: {
        background: "#fafafa",
        fontWeight: 600,
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    otherMonth: {
        color: "#999",
        background: "#fcfcfc",
    },
    dayHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
        fontSize: 13,
    },
    todayDot: {
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#1976d2",
    },
    eventList: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },
    eventChip: {
        background: "#e8f0fe",
        color: "#034ea2",
        padding: "4px 6px",
        borderRadius: 4,
        fontSize: 12,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    more: {
        fontSize: 12,
        color: "#666",
    },
    selected: {
        outline: "3px solid rgba(25,118,210,0.12)",
    },
    side: {
        width: 300,
        border: "1px solid #eaeaea",
        borderRadius: 6,
        padding: 12,
        background: "#fff",
        height: "fit-content",
    },
    eventRow: {
        display: "flex",
        alignItems: "center",
        padding: "8px 6px",
        borderRadius: 4,
        border: "1px solid #f0f0f0",
        marginBottom: 8,
        gap: 8,
    },
    trash: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "#c62828",
    },
};