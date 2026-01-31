
export default function Button({
  type = 'button',
  variant = 'auth',
  onClick,
  children,
  fullWidth = true, // Diabaikan di sini, w-full diatur di class
  icon
}) {
  

  const baseClasses = `
    flex justify-center items-center 
    px-4     
    h-10 sm:h-12                          
    rounded-lg                     
    shadow-sm                           
    transition duration-150 
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `; 
  

  const variantClasses = {
    auth: `
      cursor-pointer
      bg-gradient-to-r from-[#5671AC] to-[#15223F]    
      text-white      
      hover:opacity-90  
      focus:ring-[#15223F]
      text-sm sm:text-base
      font-medium
    `,
    google: `
    text-[18px]
    w-full flex items-center justify-center  bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold  rounded-lg transition-colors
    `,
  };
  

  const widthClass = `w-full`; 
  
  return (
    <button
      type={type}
      onClick={onClick}

      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`} 
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
    </button>
  );

  


}Button.displayName = 'Button';