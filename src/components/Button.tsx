interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  className?: string;
}

export default function Button({ 
  onClick, 
  children, 
  variant = 'primary',
  className = '' 
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-500 hover:bg-gray-600',
    success: 'bg-green-500 hover:bg-green-600',
    danger: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 ${variantClasses[variant]} text-white font-semibold rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
