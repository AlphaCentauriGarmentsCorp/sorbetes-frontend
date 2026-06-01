import { jsPDF } from 'jspdf'

const FIT_LABELS = {
  standard: 'Standard (PHP 370-400)',
  oversized: 'Oversized (PHP 370-430)',
  boxy: 'Boxy (PHP 350-430)',
}

const PRINT_METHOD_LABELS = {
  silkscreen: 'Silkscreen',
  dtf: 'DTF',
  sublimation: 'Sublimation',
  embroidery: 'Embroidery',
  'high-density': 'High Density',
}

const NECKLINE_LABELS = {
  standard: 'Standard',
  'pro-club': 'Pro Club',
}

const FABRIC_LABELS = {
  premium: 'Premium',
  heavyweight: 'Heavyweight',
}

const GARMENT_LABELS = {
  't-shirt': 'T-shirt',
  hoodie: 'Hoodie',
  others: 'Others',
}

function displayValue(value) {
  if (value === null || value === undefined || String(value).trim() === '') {
    return '—'
  }
  return String(value).trim()
}

function formatFileList(files) {
  if (!files?.length) return '—'
  return files.join(', ')
}

function resolveGarmentLabel(garment, otherText) {
  if (!garment) return '—'
  if (garment === 'others') {
    return otherText?.trim() ? `Others: ${otherText.trim()}` : 'Others'
  }
  return GARMENT_LABELS[garment] || garment
}

function resolveFitLabel(fitType, fitOther) {
  if (!fitType) return '—'
  if (fitType === 'other') {
    return fitOther?.trim() ? `Others / Customization: ${fitOther.trim()}` : 'Others / Customization'
  }
  return FIT_LABELS[fitType] || fitType
}

function buildFilename(brandName, name) {
  const base = (brandName || name || 'walk-in-order')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const date = new Date().toISOString().slice(0, 10)
  return `sorbetes-order-${base || 'client'}-${date}.pdf`
}

function ensureSpace(doc, y, needed = 12) {
  const pageHeight = doc.internal.pageSize.getHeight()
  if (y + needed > pageHeight - 16) {
    doc.addPage()
    return 20
  }
  return y
}

function addSectionTitle(doc, title, y) {
  y = ensureSpace(doc, y, 14)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(title, 14, y)
  return y + 9
}

function addRow(doc, label, value, y) {
  const text = displayValue(value)
  const valueLines = doc.splitTextToSize(text, 118)
  const rowHeight = Math.max(7, valueLines.length * 5)

  y = ensureSpace(doc, y, rowHeight + 4)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(60, 60, 60)
  doc.text(label, 14, y)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.text(valueLines, 72, y)

  return y + rowHeight + 3
}

function buildWalkInOrderPdf({ form, uploadedFiles, savedGarment, savedGarmentOther, orderDate }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  let y = 18

  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('SORBETES', 14, y)
  doc.setFontSize(16)
  doc.text('Client Order Form', 14, y + 10)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(90, 90, 90)
  doc.text(`Date: ${displayValue(orderDate)}`, 14, y + 18)

  doc.setDrawColor(255, 206, 49)
  doc.setLineWidth(0.8)
  doc.line(14, y + 22, 196, y + 22)

  y += 30
  doc.setTextColor(0, 0, 0)

  y = addSectionTitle(doc, 'Basic Information', y)
  y = addRow(doc, 'Your Name', form.name, y)
  y = addRow(doc, 'Email', form.email, y)
  y = addRow(doc, 'Brand Name', form.brandName, y)
  y = addRow(doc, 'Contact Number', form.contactNumber, y)

  y = addSectionTitle(doc, 'Order Details', y)
  y = addRow(doc, 'Garment Selection', resolveGarmentLabel(savedGarment, savedGarmentOther), y)
  y = addRow(doc, 'Type / Fit', resolveFitLabel(form.fitType, form.fitOther), y)
  y = addRow(doc, 'Print Method', PRINT_METHOD_LABELS[form.printMethod] || form.printMethod, y)
  y = addRow(doc, 'Neckline', NECKLINE_LABELS[form.neckline] || form.neckline, y)
  y = addRow(doc, 'Fabric', FABRIC_LABELS[form.fabric] || form.fabric, y)
  y = addRow(doc, 'Shirt Color', form.shirtColor, y)
  y = addRow(doc, 'Front Print Colors', form.frontPrintColors, y)
  y = addRow(doc, 'Back Print Colors', form.backPrintColors, y)

  y = addSectionTitle(doc, 'Mockup Files', y)
  y = addRow(doc, 'Mockup Front', formatFileList(uploadedFiles.mockupFront), y)
  y = addRow(doc, 'Front Print', formatFileList(uploadedFiles.frontPrint), y)
  y = addRow(doc, 'Mockup Back', formatFileList(uploadedFiles.mockupBack), y)
  y = addRow(doc, 'Back Print', formatFileList(uploadedFiles.backPrint), y)

  y = addSectionTitle(doc, 'Order Summary', y)
  y = addRow(doc, 'Sample Fee', '100.00 PHP', y)
  y = addRow(doc, '60% Downpayment', '100.00 PHP', y)
  y = addRow(doc, '40% Balance', '100.00 PHP', y)
  y = addRow(doc, 'Total Price', '100.00 PHP', y)

  y = ensureSpace(doc, y, 16)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(110, 110, 110)
  doc.text(
    'A PHP 1,000 sample fee applies. A 50% downpayment is required before production begins.',
    14,
    y + 4,
    { maxWidth: 182 },
  )

  return doc
}

/**
 * Generates the walk-in order PDF, opens it for viewing, and triggers a download.
 */
export function downloadWalkInOrderPdf(payload) {
  const doc = buildWalkInOrderPdf(payload)
  const filename = buildFilename(payload.form.brandName, payload.form.name)

  doc.save(filename)

  const preview = window.open(doc.output('bloburl'), '_blank')
  if (!preview) {
    doc.output('dataurlnewwindow', { filename })
  }

  return filename
}
