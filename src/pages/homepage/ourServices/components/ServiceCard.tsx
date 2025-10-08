interface Props {
    cardTitle: string;
    CardSubTitle: string;
    buttonLabel: string;
    imgUrl: string;
    onClickBtn?: () => void;
}

export const ServiceCard = ({
    cardTitle, 
    CardSubTitle, 
    buttonLabel, 
    imgUrl,
    onClickBtn = () => { console.log("Press Card Button") }
}: Props) => {
    return (    
        <div className="flex md:flex-col sm:flex-row md:max-w-sm max-w-full bg-serviceCardTheme-color border border-gray-200 rounded-lg shadow-sm hover:">
            <div className="w-full hidden md:block">
                <img 
                    className="rounded-t-lg w-full h-fit object-cover" 
                    src={imgUrl} 
                    alt={cardTitle} 
                />
            </div>
            
            <div className="relative w-full md:relative">
                <div className="md:hidden absolute inset-0 z-0">
                    <img 
                        className="w-full h-full object-cover rounded-lg" 
                        src={imgUrl} 
                        alt={cardTitle} 
                    />
                    <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                </div>
                
                <div className="relative z-10 p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight flex justify-center text-white md:text-mainTheme-color">
                        {cardTitle}
                    </h5>
                    <p className="mb-3 font-normal text-white md:text-serviceCardSubText-color">
                        {CardSubTitle}
                    </p>
                    <button 
                        onClick={onClickBtn} 
                        className="inline-flex w-full items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-mainTheme-color rounded-lg hover:bg-mainTheme-hover-color focus:ring-4 focus:outline-none focus:ring-blue-300 border-2 border-white md:border-transparent"
                    >
                        {buttonLabel}
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};