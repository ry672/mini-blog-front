interface IDataElem {
    svgname: string;
    svgviewbox: string;
    svgfill: string;
    svgxmlns: string;
    title: string;
    badge: number;
    id: string;
    d?: string;
    
   
    paths: {
        d: string;
        
    }[];
    
}

interface INavbarElemProps {
    mainClass: string;
    elemClass: string;
    dataArray: IDataElem[];
}

export const NavbarListContainer = ({ mainClass, elemClass, dataArray }: INavbarElemProps) => {
    return (
        <ul className={mainClass}>
            {dataArray.map((elem) => (
                <li className={elemClass} key={elem.id}>
                    <svg
                        className={elem.svgname}
                        viewBox={elem.svgviewbox}
                        fill={elem.svgfill}
                        xmlns={elem.svgxmlns}
                    >
                        {elem.id == "other"?(
                            <path
                            id={elem.id}
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d={elem.paths[0]?.d||''}
                          />

                        
                        ): elem.paths?.length === 2 ? (
                            <g id={elem.id}>
                                <path d={elem.paths[0].d} />
                                <path d={elem.paths[1].d} />
                            </g>
                        
                        ) : (
                            <path id={elem.id} d={elem.paths?.[0]?.d || ''} />
                        )}
                        
                    </svg>
                    <p className="item__name">{elem.title}</p>
                    <span className="Badge">{elem.badge}</span>
                </li>
            ))}
        </ul>
    );
};

