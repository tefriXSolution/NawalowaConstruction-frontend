interface Props{
    cardTitle:string;
    CardSubTitle:string;
    buttonLabel:string;
    imgUrl:string;
    rentPerDay:number
    onClickBtn?:()=>void;
}
export const RentItemCard = ({
    cardTitle, 
    CardSubTitle, 
    buttonLabel, 
    imgUrl,
    rentPerDay,
    onClickBtn=()=>{console.log("Press Card Button")}}:Props) => {
  return (   
    <div className="flex md:flex-col sm:flex-row md:max-w-sm sm:max-w-xl bg-rentCardTheme-color border border-gray-200 rounded-lg shadow-sm hover:">
        <div className="w-sm">
            <img className="rounded-t-lg h-full object-cover" src={imgUrl} alt="" />
        </div>
        <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight flex justify-center text-mainTheme-color">{cardTitle}</h5>
            <p className="mb-3 font-normal text-serviceCardSubText-color">{CardSubTitle}</p>
            <p className="mb-3 font-bold text-xl text-mainTheme-color">Rs.{rentPerDay}/day</p>
            <button onClick={onClickBtn} className="inline-flex w-full items-center justify-center px-3 py-2 text-sm font-medium text-center text-mainText-color hover:text-mainTheme-color bg-rentBtn-color rounded-lg hover:bg-rentBtn-hover-color focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all">
                {buttonLabel}
            </button>
        </div>
    </div>
  )
}
