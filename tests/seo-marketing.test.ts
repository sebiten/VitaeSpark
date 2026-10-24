import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { MarketingPage } from "../components/seo/MarketingPage";
import MiningPage from "../app/cv-para-mineria/page";
import OperatorPage from "../app/cv-para-operario/page";
import CashierPage from "../app/cv-para-cajero/page";
import AdminPage from "../app/cv-para-administrativo/page";
import SecurityPage from "../app/cv-para-seguridad/page";
import CustomerServicePage from "../app/cv-para-atencion-al-cliente/page";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

// Regional pricing is outside this server-rendered ordering regression.
vi.mock("@/components/CommercialOffer", () => ({ CommercialOffer: () => null }));
vi.mock("@/components/seo/LandingOffer", () => ({ LandingOffer: () => null }));

const pages = [MiningPage, OperatorPage, CashierPage, AdminPage];

describe("segunda intervención editorial", () => {
  it.each([SecurityPage, CustomerServicePage])("mantiene enlaces, CTA y texto accesible sin JavaScript: %s", (Page) => {
    const element = Page();
    const root = render(element, false);
    expect(root.querySelectorAll("h1")).toHaveLength(1);
    expect(root.querySelector("article")?.textContent).toContain("Son ejemplos de redacción");
    expect(root.querySelector("article")?.textContent).toContain("corchetes");
    const ids = Array.from(root.querySelectorAll("[id]")).map(node => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const link of root.querySelectorAll<HTMLAnchorElement>("a[href]")) {
      const href = link.getAttribute("href")!;
      if (href.startsWith("#")) expect(ids).toContain(href.slice(1));
    }
    for (const link of element.props.relatedLinks) {
      expect(existsSync(resolve("app", link.href.slice(1), "page.tsx"))).toBe(true);
    }
    const ctas = root.querySelectorAll<HTMLAnchorElement>('a[href*="cta_label="]');
    expect(ctas.length).toBeGreaterThan(0);
    for (const cta of ctas) {
      const url = new URL(cta.getAttribute("href")!, "https://vitaespark.com");
      expect(url.searchParams.get("landing_path")).toBe(element.props.path);
      expect(url.searchParams.get("source_type")).toBe("landing");
      expect(url.searchParams.get("role")).toBeTruthy();
    }
  });
});

function render(page: ReturnType<typeof MiningPage>, prioritizeExample: boolean) {
  const container = document.createElement("div");
  container.innerHTML = renderToStaticMarkup(
    createElement(MarketingPage, { ...page.props, prioritizeExample }),
  );
  return container;
}

describe("professional SEO examples", () => {
  it.each(pages)("prioritizes the example without losing content or tracked CTAs: %s", (Page) => {
    const element = Page();
    expect(element.props.prioritizeExample).toBe(true);
    const current = render(element, true);
    const previousOrder = render(element, false);
    const article = current.querySelector("article")!;
    const exampleHeading = article.querySelector("h2")!;
    expect(exampleHeading.textContent).toBe(element.props.sections[0].title);
    expect(article.firstElementChild?.contains(exampleHeading)).toBe(true);
    expect(current.querySelectorAll(`[id="${exampleHeading.id}"]`)).toHaveLength(1);
    expect(current.querySelector(`a[href="#${exampleHeading.id}"]`)?.textContent)
      .toContain("Ver modelo completo en texto");
    expect(current.querySelectorAll("h1")).toHaveLength(1);
    expect(current.querySelectorAll("h2")).toHaveLength(previousOrder.querySelectorAll("h2").length);
    const trackedLinks = (root: Element) => Array.from(root.querySelectorAll('a[href*="cta_label="]'))
      .map(link => ({ href: link.getAttribute("href"), text: link.textContent }));
    expect(trackedLinks(current)).toEqual(trackedLinks(previousOrder));
    for (const section of element.props.sections) {
      for (const paragraph of section.paragraphs) {
        expect(article.textContent).toContain(paragraph);
      }
    }
    expect(previousOrder.querySelector("article")?.firstElementChild?.tagName).toBe("HEADER");
    expect(previousOrder.querySelector('a[href="#guia"]')?.textContent).toContain("Ver la guía");
    expect(previousOrder.querySelector("h2.scroll-mt-24")).toBeNull();
  });
});
