import * as XLSX from "xlsx";

export default function (data: any) {
	console.log(data);

	var wb = XLSX.utils.book_new();
	const sheet = XLSX.utils.json_to_sheet(data);
	XLSX.utils.book_append_sheet(wb, sheet);
	XLSX.writeFile(wb, "TaniaContactos2.xlsx");
}
