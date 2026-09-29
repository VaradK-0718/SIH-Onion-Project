import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function downloadPdfReport(elementId, filename = 'OnionGrade_Quality_Report.pdf') {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Element with id #${elementId} not found for PDF export.`);
    return;
  }

  try {
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF report:', error);
    // Fallback: Trigger browser window print dialog if html2canvas fails
    window.print();
    return false;
  }
}

export function printElement(elementId) {
  const elem = document.getElementById(elementId);
  if (!elem) return;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Onion Quality Assessment Digital Report</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
        <style>
          body { padding: 20px; background: #fff; font-family: sans-serif; }
          @media print {
            body { padding: 0; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        ${elem.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}
