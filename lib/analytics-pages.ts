// Public commercial routes only. Never capture account URLs, tokens or query strings.
export function isCommercialPath(pathname: string) {
  return pathname === "/" || /^\/(?:cv-[a-z-]+|curriculum-[a-z-]+|crear-cv-online|crear-curriculum-vitae|hacer-cv-online|hacer-cv-con-ia|generador-de-cv-con-ia|modelo-de-curriculum-vitae|plantillas-curriculum|plantilla-harvard|resume-ready)$/.test(pathname);
}
