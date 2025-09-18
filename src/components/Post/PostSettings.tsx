import { SPostSettings } from "./Post.style"

interface IPostSettingsProps {

}
export const PostSettings = ({ }: IPostSettingsProps) => {
    return (
        <SPostSettings>
            <button>Изменить</button>
            <button>Удалить</button>
        </SPostSettings>
    );
};