import { Link } from "react-router-dom";

const MegaMenu = ({ sections, categorySlug }) => {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out z-50"
    >
      <div
        className="bg-[#FFFCF8] rounded-2xl shadow-2xl backdrop-blur-sm border border-[#DED4C7] p-8 w-[780px] max-w-[90vw]"
      >
        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h3
                className="text-[#6E472A] font-semibold text-lg mb-4 pb-2 border-b border-[#E7DDD0]"
              >
                {section.title}
              </h3>

              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/products?category=${categorySlug}&section=${section.slug}&item=${item.slug}`}
                      className="flex items-center gap-2 text-sm text-[#5E5348] hover:text-[#8B5E3C] hover:bg-[#F6EFE6] hover:pl-2 rounded-md py-1 transition-all duration-300 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B08968]"></span>
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
