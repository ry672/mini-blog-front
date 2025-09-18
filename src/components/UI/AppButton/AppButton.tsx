

interface IAppButtonProps {
  buttonText: string;
  buttonType: "button" | "submit" | "reset";
  disabled?: boolean; 
}

export const AppButton: React.FC<IAppButtonProps> = ({ buttonText, buttonType, disabled }) => {
  return (
    <button type={buttonType} disabled={disabled} className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
      {buttonText}
    </button>
  );
};

  