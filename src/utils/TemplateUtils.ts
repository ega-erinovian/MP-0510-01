import fs from "fs/promises";
import path from "path";

export async function loadEmailTemplate(): Promise<string> {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "emailTemplate.html"
  );
  return await fs.readFile(templatePath, "utf-8");
}

export async function loadForgotPasswordEmailTemplate(): Promise<string> {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "forgotPasswordEmail.html"
  );
  return await fs.readFile(templatePath, "utf-8");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}

export function replaceTemplateVariables(
  template: string,
  data: Record<string, string | number>
): string {
  return template.replace(/{{(\w+)}}/g, (match, variable) => {
    if (variable === "totalPaid" && typeof data[variable] === "number") {
      return formatCurrency(data[variable] as number);
    }
    if (variable === "ifDone" || variable === "ifRejected") {
      return data.status === (variable === "ifDone" ? "DONE" : "REJECTED")
        ? (data[variable] as string)
        : "";
    }
    return (data[variable] || match).toString();
  });
}
