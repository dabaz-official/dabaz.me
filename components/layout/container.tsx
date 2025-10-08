const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`mx-auto flex max-w-3xl items-center justify-between ${className || ''}`}>
      {children}
    </div>
  );
}

export default Container;
