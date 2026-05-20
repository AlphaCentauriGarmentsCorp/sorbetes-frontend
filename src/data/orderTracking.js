export const STUDIO_NAME = 'Sorbetes Apparel Studio'

export const PRODUCTION_SUB_STEPS = [
  { key: 'graphic-editing', title: 'Graphic Editing' },
  { key: 'material-prep', title: 'Material Preparation' },
  { key: 'cutting', title: 'Cutting' },
  { key: 'screen-making', title: 'Screen Making' },
  { key: 'sample-making', title: 'Sample Making' },
  { key: 'sewing', title: 'Sewing' },
  { key: 'packing', title: 'Packing' },
  { key: 'quality-control', title: 'Quality Control' },
]

/** Demo reference numbers — each maps to a different tracking stage. */
export const TRACKING_REFERENCES = {
  confirmed: 'SORB-2026-1001',
  production: 'SORB-2026-1002',
  readyForDelivery: 'SORB-2026-1003',
  inTransit: '1251235234124124125-transit',
  delivered: '1251235234124124125',
}

const DEMO_DATE = 'March 15, 2026'

const CONFIRMED_TRACKING = {
  cardClassName: '',
  activeStageIndex: 0,
  stepperMuted: false,
  productionSubStepsComplete: 0,
  defaultShowProductionSteps: false,
  events: [
    {
      key: 'confirmed',
      title: 'Confirmed',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: true,
    },
    {
      key: 'production',
      title: 'Production',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: false,
      current: true,
      expandable: true,
    },
  ],
}

const PRODUCTION_TRACKING = {
  cardClassName: '',
  activeStageIndex: 1,
  stepperMuted: false,
  productionSubStepsComplete: 4,
  defaultShowProductionSteps: true,
  events: [
    {
      key: 'confirmed',
      title: 'Confirmed',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: true,
    },
    {
      key: 'production',
      title: 'Production',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: false,
      current: true,
      expandable: true,
    },
  ],
}

const READY_FOR_DELIVERY_TRACKING = {
  cardClassName: '',
  activeStageIndex: 2,
  stepperMuted: false,
  productionSubStepsComplete: 8,
  defaultShowProductionSteps: false,
  events: [
    {
      key: 'confirmed',
      title: 'Confirmed',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: true,
    },
    {
      key: 'production',
      title: 'Production',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: true,
      expandable: true,
    },
    {
      key: 'ready-for-delivery',
      title: 'Ready for Delivery',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: false,
      current: true,
    },
  ],
}

const IN_TRANSIT_TRACKING = {
  cardClassName: '',
  activeStageIndex: 2,
  stepperMuted: false,
  productionSubStepsComplete: 8,
  defaultShowProductionSteps: false,
  events: [
    {
      key: 'confirmed',
      title: 'Confirmed',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: true,
    },
    {
      key: 'production',
      title: 'Production',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: true,
      expandable: true,
    },
    {
      key: 'ready-for-delivery',
      title: 'Ready for Delivery',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: true,
    },
    {
      key: 'in-transit-courier',
      title: 'In Transit',
      location: 'Waiting for Courier',
      date: DEMO_DATE,
      complete: true,
    },
    {
      key: 'in-transit-city',
      title: 'In Transit',
      location: 'Quezon City',
      date: DEMO_DATE,
      complete: false,
      current: true,
    },
  ],
}

const DELIVERED_TRACKING = {
  cardClassName: ' TO-details-card-delivered',
  activeStageIndex: 3,
  stepperMuted: true,
  productionSubStepsComplete: 8,
  defaultShowProductionSteps: true,
  events: [
    {
      key: 'confirmed',
      title: 'Confirmed',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: true,
    },
    {
      key: 'production',
      title: 'Production',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: true,
      expandable: true,
    },
    {
      key: 'ready-for-delivery',
      title: 'Ready for Delivery',
      location: STUDIO_NAME,
      date: DEMO_DATE,
      complete: true,
    },
    {
      key: 'in-transit-courier',
      title: 'In Transit',
      location: 'Waiting for Courier',
      date: DEMO_DATE,
      complete: true,
    },
    {
      key: 'in-transit-city',
      title: 'In Transit',
      location: 'Quezon City',
      date: DEMO_DATE,
      complete: true,
    },
    {
      key: 'completed',
      title: 'Completed',
      location: 'Quezon City',
      date: DEMO_DATE,
      complete: true,
    },
  ],
}

const TRACKING_BY_REFERENCE = {
  [TRACKING_REFERENCES.confirmed]: CONFIRMED_TRACKING,
  [TRACKING_REFERENCES.production]: PRODUCTION_TRACKING,
  [TRACKING_REFERENCES.readyForDelivery]: READY_FOR_DELIVERY_TRACKING,
  [TRACKING_REFERENCES.inTransit]: IN_TRANSIT_TRACKING,
  [TRACKING_REFERENCES.delivered]: DELIVERED_TRACKING,
}

export const DEMO_TRACKING_HINTS = [
  { reference: TRACKING_REFERENCES.confirmed, label: 'Confirmed' },
  { reference: TRACKING_REFERENCES.production, label: 'In production (4/8 steps)' },
  { reference: TRACKING_REFERENCES.readyForDelivery, label: 'Ready for delivery' },
  { reference: TRACKING_REFERENCES.inTransit, label: 'In transit' },
  { reference: TRACKING_REFERENCES.delivered, label: 'Delivered' },
]

export function getTrackingForReference(reference) {
  const normalized = reference.trim()
  return TRACKING_BY_REFERENCE[normalized] ?? null
}
