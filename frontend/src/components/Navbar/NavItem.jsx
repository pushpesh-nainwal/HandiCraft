import { ChevronDown } from "lucide-react";
import MegaMenu from "./MegaMenu";

const NavItem = ({ category }) => {
  return (
    <div className="relative group py-2">
      <button
        className="
          relative
          flex
          items-center
          gap-1.5
          h-9
          px-4
          rounded-full
          text-[13.5px]
          font-medium
          tracking-wide
          text-[#4A3B2C]
          hover:text-[#FDFAF4]
          hover:bg-[#A8572E]
          transition-colors
          duration-250
        "
      >
        {category.name}

        <ChevronDown
          size={14}
          strokeWidth={2.25}
          className="
            transition-transform
            duration-300
            group-hover:rotate-180
          "
        />
      </button>

      <MegaMenu sections={category.sections} categorySlug={category.slug} />
    </div>
  );
};

export default NavItem;
