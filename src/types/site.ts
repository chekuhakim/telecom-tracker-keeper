
export interface Site {
  id: string;
  name: string;
  location: string;
  status: "active" | "inactive" | "maintenance";
  insuranceStatus: "valid" | "expiring" | "expired";
  permitStatus: "valid" | "expiring" | "expired";
  lastInvoiceDate: string;
  nextInvoiceDue: string;
}
