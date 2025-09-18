import Modal from 'react-modal';
import { Headers } from '../../components/UI/Headers/Headers';
import { SFormButtons, SFormContainer, SFormWrapper } from './PostForm.style';
import { AppInput } from '../../components/UI/AppInput/AppInput';
import { AppButton } from '../../components/UI/AppButton/AppButton';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

interface IAddNewPostProps {
    isOpen: boolean;
}

export const AddNewPost = ({ isOpen }: IAddNewPostProps) => {
    return (
        <Modal isOpen={isOpen} style={customStyles}>
            <SFormWrapper>
                <Headers headerText="Добавить новый пост" headerType='h2'></Headers>
                <SFormContainer > 
                    <AppInput isError={false} />
                    <SFormButtons>
                        <AppButton buttonText='Создать' buttonType='submit'/>
                        <AppButton buttonText='Отменить' buttonType='button'/>
                    </SFormButtons>
                </SFormContainer>
            </SFormWrapper>

        </Modal>
    );
};
