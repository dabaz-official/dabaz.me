import Container from '@dabaz/components/layout/container';

const Footer = () => {
  return (
    <footer aria-label="Footer" className="bg-bg-light-2 dark:bg-bg-dark-2">
      <Container className="px-6 py-6 lg:px-8">
        <div className="w-full border-t border-gray-light-4 dark:border-gray-dark-4 justify-between text-center mx-auto flex">
          <p className="pt-2 text-copy-14 text-gray-light-6 dark:text-gray-dark-6 text-left">
            &copy; {new Date().getFullYear()} DabAZ. All rights reserved.
          </p>
          <p className="pt-2 text-copy-14 text-gray-light-6 dark:text-gray-dark-6 justify-end text-right">
            {new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;