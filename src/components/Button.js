export default function Button({ onClick, className, children }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
