import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaImage, FaTimes } from 'react-icons/fa'
import '../design/MyOrders.css'

function DetailRow({ label, value, file }) {
  if (file) {
    return (
      <div className="MO-detail-row MO-detail-row-file">
        <span className="MO-detail-label">{label}</span>
        <button type="button" className="MO-detail-file-btn" aria-label={`Download ${file.name}`}>
          <FaImage className="MO-detail-file-icon" aria-hidden="true" />
          <span>{file.name}</span>
        </button>
      </div>
    )
  }

  return (
    <div className="MO-detail-row">
      <span className="MO-detail-label">{label}</span>
      <span className="MO-detail-value">{value}</span>
    </div>
  )
}

function DetailRows({ rows }) {
  return (
    <div className="MO-detail-rows">
      {rows.map((row) => (
        <DetailRow key={row.label} label={row.label} value={row.value} file={row.file} />
      ))}
    </div>
  )
}

function OrderDetailModal({ order, onClose }) {
  const { details } = order

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  if (typeof document === 'undefined' || !details) {
    return null
  }

  return createPortal(
    <div className="MO-detail-overlay" role="presentation" onClick={onClose}>
      <section
        className="MO-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="MO-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="MO-detail-header">
          <button type="button" className="MO-detail-close" aria-label="Close order details" onClick={onClose}>
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <div className="MO-detail-body">
          <div className="MO-detail-section">
            <h2 id="MO-detail-title" className="MO-detail-section-title">
              Order Detail
            </h2>
            <DetailRows
              rows={[
                { label: 'Reference Number', value: `#${order.reference}` },
                { label: 'Status', value: details.status },
                { label: 'Amount', value: details.amount },
                { label: 'Payment Time', value: details.paymentTime },
                { label: 'Payment Method', value: details.paymentMethod },
                { label: 'Sender Name', value: details.senderName },
              ]}
            />
          </div>

          <div className="MO-detail-section">
            <h2 className="MO-detail-section-title">Product Information</h2>

            <div className="MO-detail-subsection">
              <h3 className="MO-detail-subsection-title">Apparel and Design</h3>
              <DetailRows
                rows={[
                  { label: 'Package', value: details.product.package },
                  { label: 'Fabric', value: details.product.fabric },
                  { label: 'Shirt Color', value: details.product.shirtColor },
                  { label: 'Print Size', value: details.product.printSize },
                  { label: 'Print Method', value: details.product.printMethod },
                  { label: 'Neckline', value: details.product.neckline },
                  { label: 'Print Color Amount', value: details.product.printColorAmount },
                  { label: 'Total Pieces', value: details.product.totalPieces },
                  { label: 'Add ons', value: details.product.addOns },
                ]}
              />
            </div>

            <div className="MO-detail-subsection">
              <h3 className="MO-detail-subsection-title">Files and Branding</h3>
              <DetailRows
                rows={[
                  { label: 'Front Print', value: details.branding.frontPrint },
                  { label: 'Back Print', value: details.branding.backPrint },
                  { label: 'Inner Branding Print', value: details.branding.innerBrandingPrint },
                  { label: 'Woven Label', value: details.branding.wovenLabel },
                  { label: 'Own Woven Label', value: details.branding.ownWovenLabel },
                  { label: 'Woven Label Location', value: details.branding.wovenLabelLocation },
                ]}
              />
            </div>
          </div>

          <div className="MO-detail-section">
            <h2 className="MO-detail-section-title">Your Files</h2>
            <DetailRows rows={details.files.map((file) => ({ label: file.label, file }))} />
          </div>
        </div>
      </section>
    </div>,
    document.body,
  )
}

export default OrderDetailModal
