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
    gap-1
    h-12
    px-1
    font-medium
    text-[#5E5348]
    hover:text-[#8B5E3C]
    transition-colors
    duration-200
    after:absolute
    after:left-0
    after:bottom-0
    after:h-[2px]
    after:w-0
    after:bg-[#8B5E3C]
    after:transition-all
    after:duration-300
    group-hover:after:w-full
  "
>

        {category.name}

        <ChevronDown
  size={16}
  className="
    text-[#7A6A5C]
    group-hover:text-[#8B5E3C]
    group-hover:rotate-180
    transition-all
    duration-300
  "
/>

      </button>

      <MegaMenu
    sections={category.sections}
    categorySlug={category.slug}
/>

    </div>
  );
};

export default NavItem;