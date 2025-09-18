

interface IAppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

    errorText?: string;
    isError?: boolean;

}

export const AppInput = ({ errorText, isError, ...props }: IAppInputProps) => {
    return (
    <div>
        <div {...props} />
        {isError && <span>{errorText}</span>}
    </div>
    );

};