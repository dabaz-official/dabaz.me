import Link from 'next/link';

const navLinkClassName = "text-copy-16 text-gray-light-10 dark:text-gray-dark-10 tracking-tight hover:bg-gray-light-2 dark:hover:bg-gray-dark-2 px-2 py-1 rounded-xl transition duration-200 active:bg-gray-light-3 dark:active:bg-gray-dark-3";
const mobileLinkClassName = "text-label-18 font-semibold text-gray-light-10 dark:text-gray-dark-10 tracking-tight";

const NavLink = ({
  href, children
}: {
  href: string; children: React.ReactNode
}) => {
  return (
    <Link href={href} className={navLinkClassName}>
      {children}
    </Link>
  );
}

const MobileLink = ({
  href, children
}: {
  href: string; children: React.ReactNode
}) => {
  return (
    <Link href={href} className={mobileLinkClassName}>
      {children}
    </Link>
  );
}

export { NavLink, MobileLink };