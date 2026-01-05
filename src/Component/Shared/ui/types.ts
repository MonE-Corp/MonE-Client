export type FieldType = "number" | "text" | "date" | "select";

export interface FieldConfig {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  options?: { label: string; value: string | number }[];
}
