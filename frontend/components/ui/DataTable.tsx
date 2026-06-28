"use client";
import React, { useState } from "react";

export interface Col<T> {
  key: keyof T & string;
  header: string;
  editable?: boolean;
  width?: number;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string | number }> {
  cols: Col<T>[];
  rows: T[];
  onDelete?: (ids: (string | number)[]) => void;
}

const TH: React.CSSProperties = { padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #e5e7eb", fontWeight: 600, userSelect: "none", cursor: "pointer", whiteSpace: "nowrap" };
const TD: React.CSSProperties = { padding: "8px 12px", borderBottom: "1px solid #e5e7eb" };

export function DataTable<T extends { id: string | number }>({ cols, rows: init, onDelete }: DataTableProps<T>) {
  const [data, setData] = useState(init);
  const [sel, setSel] = useState<Set<string | number>>(new Set());
  const [edit, setEdit] = useState<{ id: string | number; key: string } | null>(null);
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);

  const sorted = sort ? [...data].sort((a, b) => ((a as any)[sort.key] < (b as any)[sort.key] ? -1 : 1) * sort.dir) : data;
  const onSort = (k: string) => setSort((s) => s?.key === k ? { key: k, dir: (s.dir * -1) as 1 | -1 } : { key: k, dir: 1 });
  const toggleRow = (id: string | number) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => setSel(sel.size === data.length ? new Set() : new Set(data.map((r) => r.id)));
  const commit = (id: string | number, key: string, val: string) => { setData((d) => d.map((r) => r.id === id ? { ...r, [key]: val } : r)); setEdit(null); };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ overflowX: "auto", maxHeight: 480, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, background: "var(--background, #fff)", zIndex: 2 }}>
            <tr>
              <th style={TH}><input type="checkbox" checked={sel.size === data.length && data.length > 0} onChange={toggleAll} /></th>
              {cols.map((c) => <th key={c.key} style={{ ...TH, width: c.width }} onClick={() => onSort(c.key)}>{c.header}{sort?.key === c.key ? (sort.dir === 1 ? " ↑" : " ↓") : ""}</th>)}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={row.id}
                style={{ background: i % 2 ? "var(--muted, #f9fafb)" : "transparent", transition: "background 0.1s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent, #eff6ff)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 ? "var(--muted, #f9fafb)" : "transparent")}>
                <td style={TD}><input type="checkbox" checked={sel.has(row.id)} onChange={() => toggleRow(row.id)} /></td>
                {cols.map((c) => {
                  const isEditing = edit?.id === row.id && edit.key === c.key;
                  return (
                    <td key={c.key} style={{ ...TD, cursor: c.editable ? "pointer" : "default" }} onClick={() => c.editable && setEdit({ id: row.id, key: c.key })}>
                      {isEditing
                        ? <input autoFocus defaultValue={String((row as any)[c.key] ?? "")} style={{ width: "100%", border: "1px solid #6366f1", borderRadius: 3, padding: "2px 6px" }}
                            onBlur={(e) => commit(row.id, c.key, e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && commit(row.id, c.key, (e.target as HTMLInputElement).value)} />
                        : c.render ? c.render(row[c.key as keyof T], row) : String((row as any)[c.key] ?? "")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sel.size > 0 && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#1e1e2e", color: "#fff", borderRadius: 8, padding: "10px 20px", display: "flex", gap: 12, alignItems: "center", zIndex: 50, boxShadow: "0 4px 20px rgba(0,0,0,.3)" }}>
          <span>{sel.size} row{sel.size > 1 ? "s" : ""} selected</span>
          <button onClick={() => { onDelete?.([...sel]); setSel(new Set()); }} style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 4, padding: "4px 12px", cursor: "pointer" }}>Delete {sel.size}</button>
          <button onClick={() => setSel(new Set())} style={{ background: "transparent", color: "#aaa", border: "1px solid #555", borderRadius: 4, padding: "4px 10px", cursor: "pointer" }}>Cancel</button>
        </div>
      )}
    </div>
  );
}
