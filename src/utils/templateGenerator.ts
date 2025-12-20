import * as XLSX from 'xlsx'

const HEADERS = [
    "Agency Name",
    "Email",
    "Branch Name",
    "Contact Name",
    "Phone",
    "Country",
    "State",
    "City",
    "Instagram",
    "TikTok",
    "Website",
    "Contact Status",
    "Temperature",
    "Relationship",
    "Initial Note"
]

const SAMPLE_ROW = {
    "Agency Name": "Ejemplo Tours",
    "Email": "contacto@ejemplotours.com",
    "Branch Name": "Sede Central",
    "Contact Name": "Juan Perez",
    "Phone": "+598 99 123 456",
    "Country": "Uruguay",
    "State": "Montevideo",
    "City": "Montevideo",
    "Instagram": "https://instagram.com/ejemplo",
    "TikTok": "",
    "Website": "https://ejemplotours.com",
    "Contact Status": "not_contacted",
    "Temperature": "cold",
    "Relationship": "lead",
    "Initial Note": "Cliente encontrado en feria de turismo"
}

export function generateTemplate(format: 'csv' | 'xlsx'): void {
    const data = [SAMPLE_ROW]
    const worksheet = XLSX.utils.json_to_sheet(data, { header: HEADERS })

    if (format === 'csv') {
        const csvOutput = XLSX.utils.sheet_to_csv(worksheet)
        const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'plantilla_agencias.csv'
        a.click()
        URL.revokeObjectURL(url)
    } else {
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Plantilla')
        XLSX.writeFile(workbook, 'plantilla_agencias.xlsx')
    }
}
