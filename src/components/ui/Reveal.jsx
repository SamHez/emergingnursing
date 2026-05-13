export default function Reveal({ children, className = "", as: Tag = "div" }) {
  return (
    <Tag className={`reveal-base reveal-visible ${className}`}>
      {children}
    </Tag>
  );
}
