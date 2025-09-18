import { SMainElemContainer } from "./MainElemContainer.style";

interface IDataElem {
    img: string;
    mainText: string;
    secondaryText: string;
    id: number;
    isActive?: boolean;
}


interface IUserElemProps {
    title: string;
    mainClass: string;
    elemClass: string;
    dataArray: IDataElem[];
    isActive?: boolean;
}

export const MainElemContainer = ({ title, mainClass, elemClass, dataArray }: IUserElemProps) => {
    return (
        <SMainElemContainer>
            <div className={mainClass}>
                <div className={`${mainClass}__title`}>
                    <h2>{title}</h2>
                    <span className="count">123</span>
                </div>
                {dataArray.map((elem) => (
                    <div className={elemClass} key={elem.id}>
                        <img src={elem.img} alt="User" />
                        <div className={elemClass === "UserElem" ? "user__description" : "music__description"}>
                            <p className="main__text">{elem.mainText}</p>
                            <p className="secondary__text">{elem.secondaryText}</p>
                        </div>
                        {elemClass === "UserElem" &&(
                            <span className="Badge">3</span>
                        )}
                        {elemClass === "MusicElem" && (
                            <div className={`plus-button${elem.isActive ? " _active" : ""}`}></div>
                        )}
                    </div>

                ))}
            </div>

        </SMainElemContainer>

    );
};