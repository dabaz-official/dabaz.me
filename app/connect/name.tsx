export function NameTransitionConnect() {
  return (
    <a href="/">
      <h1 className="font-bold tracking-tight pt-12 transition-element text-3xl">
        <span className="sr-only">Connect</span>
        <span aria-hidden="true" className="block overflow-hidden group relative">
          <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full">
            {'Connect'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
          <span className="inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
            {'Back to home page'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
        </span>
      </h1>
    </a>
  );
}