'use client';

import Link from 'next/link';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavDropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavDropdownProps {
  items: NavDropdownItem[];
}

const NavDropdown = ({ items }: NavDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex size-10 cursor-pointer items-center justify-center">
          <MdKeyboardArrowDown color='black' size='20px' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className="w-45">
        {items.map((item) =>
          item.href ? (
            <DropdownMenuItem key={item.label} asChild>
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem key={item.label} onClick={item.onClick}>
              {item.label}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdown;
