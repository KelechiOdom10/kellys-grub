export const isProduction = process.env.NODE_ENV === "production";

export const CART_ITEM_STATUS = {
  Processing: "Processing",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
  Not_processed: "Not processed",
};

export const REVIEW_STATUS = {
  Rejected: "Rejected",
  Approved: "Approved",
  Waiting_Approval: "Waiting Approval",
};

export const EMAIL_PROVIDER = {
  Email: "Email",
  Google: "Google",
  Facebook: "Facebook",
} as const;
export type EmailProvider = keyof typeof EMAIL_PROVIDER;
