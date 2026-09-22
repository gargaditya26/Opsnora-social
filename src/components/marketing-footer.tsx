import Link from "next/link";

const groups = {
  Product: [["Features", "/features"], ["Scheduling", "/features/scheduling"], ["Calendar", "/features/content-calendar"], ["Analytics", "/features/analytics"], ["Pricing", "/pricing"]],
  Solutions: [["Businesses", "/solutions#businesses"], ["Agencies", "/solutions#agencies"], ["Creators", "/solutions#creators"], ["Marketing teams", "/solutions#marketing-teams"]],
  Company: [["About", "/about"], ["Contact", "/contact"]],
  Resources: [["FAQ", "/faq"], ["Security", "/security"]],
  Legal: [["Privacy policy", "/privacy"], ["Terms of service", "/terms"]],
};

export function MarketingFooter() {
  return <footer className="marketing-footer"><div className="marketing-container footer-grid"><div className="footer-intro"><span className="brand-mark">O</span><strong>OPSNORA Social</strong><p>Social operations, planned with confidence.</p></div>{Object.entries(groups).map(([name, links]) => <div key={name}><h2>{name}</h2>{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>)}</div><div className="marketing-container footer-bottom"><span>© {new Date().getFullYear()} OPSNORA. All rights reserved.</span><span>OPSNORA Social — A product by OPSNORA</span></div></footer>;
}
