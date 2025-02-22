"use client";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "Services", href: "#" },
  { label: "About us", href: "#" },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div className="flex space-x-4">
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="font-medium text-primary-blue hover:text-gray-700"
          >
            {link.label}
            {pathname === link.href && (
              <div className="roundrd-md mx-2 border border-primary-red" />
            )}
          </a>
        ))}
      </div>
    </div>
  );
};
export default NavLinks;
