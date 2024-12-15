function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  const links = [
    { name: 'Email', href: 'mailto:hi@dabaz.me' },
    { name: 'X', href: 'https://x.com/dabaz_official' },
    { name: 'Instagram', href: 'https://instagram.com/dabaz_official' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/diebold-dai' },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100026087412660' },
    { name: 'Company', href: 'https://cobotrading.com' },
  ];

  return (
    <footer className="mt-12 text-center mx-auto text-sm">
      <div className="justify-center tracking-tight flex gap-x-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-black transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
      <p className="mt-4 sm:mt-8 text-neutral-600">
        © {new Date().getFullYear()} DabAZ
      </p>
    </footer>
  )
}
