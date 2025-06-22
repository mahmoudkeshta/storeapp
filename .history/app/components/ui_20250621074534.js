// components/ui.js
export function Button({ children, onClick, className }) {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
  
  export function Input(props) {
    return <input {...props} />;
  }
  
  export function Card({ children, className }) {
    return <div className={`card ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="card-content">{children}</div>;
  }
  