import Container from '@dabaz/components/layout/container';

const Footer = () => {
  return (
    <footer aria-label="Footer" className="bg-bg-light-2 dark:bg-bg-dark-2">
      <Container className="px-6 py-6 lg:px-8">
        <div className="w-full border-t border-gray-light-4 dark:border-gray-dark-4 justify-between text-center mx-auto">
          <p className="pt-2 text-center text-sm text-gray-light-6 dark:text-gray-dark-6 justify-start">
            &copy; {new Date().getFullYear()} DabAZ. All rights reserved.
          </p>
          <p className="text-center text-sm text-gray-light-6 dark:text-gray-dark-6 justify-end">
            {new Date().getHours()}:{new Date().getMinutes()}
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;