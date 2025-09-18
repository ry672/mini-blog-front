import React from "react";

interface IAppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorText?: string;
  isError?: boolean;
}

export const AppInput = ({ errorText, isError, ...props }: IAppInputProps) => {
  return (
    <div className="m-5">
      <input
        {...props}
        className={`appearance-none block w-full px-3 py-2 border ${
          isError ? "border-red-500" : "border-gray-300"
        } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
      />
      {isError && <span className="text-red-500 text-sm">{errorText}</span>}
    </div>
  );
};
