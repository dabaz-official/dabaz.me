const Navbar = () => {
  return (
    <nav aria-label="Global" className="absolute inset-x-0 top-0 z-50 bg-bg-light-1 dark:bg-bg-dark-1">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-6 lg:px-8">
        <div className="flex items-center">
          <a href="/" className="text-heading-16 font-bold text-gray-light-10 dark:text-gray-dark-10">
            DabAZ
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;