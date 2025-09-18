

interface IAppButtonProps {
  buttonText: string;
  buttonType: "button" | "submit" | "reset";
  disabled?: boolean; 
}

export const AppButton: React.FC<IAppButtonProps> = ({ buttonText, buttonType, disabled }) => {
  return (
    <button type={buttonType} disabled={disabled}>
      {buttonText}
    </button>
  );
};

  