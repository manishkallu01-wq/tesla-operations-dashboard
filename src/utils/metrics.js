export function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

export function statusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

export function filterOperations(rows, search, status) {
  const term = search.trim().toLowerCase();
  return rows.filter((row) => {
    const matchesStatus = status === "All" || row.status === status;
    const matchesSearch = !term || [row.id, row.factory, row.area, row.status]
      .some((field) => String(field).toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });
}

export function toCsv(rows) {
  const headers = ["Line", "Factory", "Area", "Throughput", "Quality", "Downtime", "Status"];
  const body = rows.map((row) => [row.id, row.factory, row.area, row.throughput, row.quality, row.downtime, row.status]);
  return [headers, ...body].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
}
