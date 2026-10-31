export function Button({ children, className = "gumb", ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
