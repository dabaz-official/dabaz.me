const Container = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-between px-6 lg:px-8">
      {children}
    </div>
  );
}

export default Container;
