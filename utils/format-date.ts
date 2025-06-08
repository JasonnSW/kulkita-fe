export function formatDate(isoDate: string): string {
  const tanggal = new Date(isoDate);
  const hari = tanggal.getDate().toString().padStart(2, "0");
  const bulan = tanggal.toLocaleString("en-US", { month: "long" }); 
  const tahun = tanggal.getFullYear();

  return `${hari} ${bulan} ${tahun}`;
}
