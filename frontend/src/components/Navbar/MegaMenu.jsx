import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MegaMenu = ({ sections, categorySlug }) => {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible pointer-events-none translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-300 ease-out z-50"
    >
      <div
        className="relative bg-[#FDFAF4] rounded-[4px] shadow-[0_24px_48px_-12px_rgba(46,32,22,0.22)] border border-[#E6DBC8] p-9 w-[720px] max-w-[90vw] overflow-hidden"
      >
        {/* faint kiln-mark watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full border border-[#E6DBC8] opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -bottom-4 h-24 w-24 rounded-full border border-[#E6DBC8] opacity-60"
        />

        {/* View all */}
        <Link
          to={`/products?category=${categorySlug}`}
          className="relative z-10 group/viewall inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-[#A8572E] font-semibold mb-7 hover:gap-2.5 transition-all duration-300"
        >
          View All
          <ArrowRight size={13} className="transition-transform duration-300 group-hover/viewall:translate-x-0.5" />
        </Link>

        <div className="relative z-10 grid grid-cols-2 gap-x-14 gap-y-9">
          {sections.map((section) => (
            <div key={section.title}>
              <h3
                className="text-[#2E2016] text-[15px] mb-4 pb-3 border-b border-[#EDE3D3] tracking-wide"
                style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
              >
                {section.title}
              </h3>

              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/products?category=${categorySlug}&section=${section.slug}&item=${item.slug}`}
                      className="group/item flex items-center gap-2.5 text-[13.5px] text-[#6B5C4C] hover:text-[#A8572E] rounded-md py-0.5 transition-colors duration-200 cursor-pointer"
                    >
                      <span className="w-[5px] h-[5px] rounded-full border border-[#C8A98B] group-hover/item:bg-[#A8572E] group-hover/item:border-[#A8572E] transition-colors duration-200" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;