
export interface Site {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  insurance_status: 'valid' | 'expiring' | 'expired';
  permit_status: 'valid' | 'expiring' | 'expired';
  last_invoice_date: string;
  next_invoice_due: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
}
