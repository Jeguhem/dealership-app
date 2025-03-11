// "use client";
// import { usePathname } from "next/navigation";

// interface NavLink {
//   label: string;
//   href: string;
// }

// const navLinks: NavLink[] = [
//   { label: "Home", href: "/" },
//   { label: "Inventory", href: "/inventory" },
//   { label: "Services", href: "#" },
//   { label: "About us", href: "#" },
// ];

// const NavLinks = () => {
//   const pathname = usePathname();
//   return (
//     <div className="flex items-center justify-between px-4 py-4">
//       <div className="flex space-x-4">
//         {navLinks.map((link, idx) => (
//           <a
//             key={idx}
//             href={link.href}
//             className="font-medium text-primary-blue hover:text-gray-700"
//           >
//             {link.label}
//             {pathname === link.href && (
//               <div className="roundrd-md mx-2 border border-primary-red" />
//             )}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default NavLinks;

"use client";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "Services", href: "#" },
  { label: "About us", href: "/about-us" },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col md:flex-row md:space-x-6 gap-2 lg:gap-1 text-center">
      {navLinks.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          className={`font-medium text-white hover:text-gray-200 ${
            pathname === link.href ? "border-b-2 border-yellow-200" : ""
          }`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default NavLinks;
