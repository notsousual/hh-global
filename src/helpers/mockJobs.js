import { generateUniqueId } from "./utilities";

export const mockJobs = [
  {
    id: generateUniqueId(),
    name: "Job 1",
    extraMargin: true,
    items: [
      {
        id: generateUniqueId(),
        name: "Envelopes",
        price: 520.0,
        taxFree: false,
      },
      {
        id: generateUniqueId(),
        name: "Letterhead",
        price: 1983.37,
        taxFree: true,
      },
    ],
  },
  {
    id: generateUniqueId(),
    name: "Job 2",
    extraMargin: false,
    items: [
      {
        id: generateUniqueId(),
        name: "T-shirts",
        price: 294.04,
        taxFree: false,
      },
    ],
  },
  {
    id: generateUniqueId(),
    name: "Job 3",
    extraMargin: true,
    items: [
      {
        id: generateUniqueId(),
        name: "Frisbees",
        price: 19385.38,
        taxFree: true,
      },
      { id: generateUniqueId(), name: "Yo-yos", price: 1829.0, taxFree: true },
    ],
  },
];
