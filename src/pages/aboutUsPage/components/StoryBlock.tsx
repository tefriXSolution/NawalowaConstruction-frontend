
interface Props{
    title:string;
    description:string;
}

export const StoryBlock = ({title, description}:Props) => {
  return (
    <div className="w-fit">
        <h2 className=" text-left text-mainTheme-color font-bold text-3xl">{title}</h2>
        <h4 className="text-left text-mainText-hover-color text-lg">{description}</h4>
    </div>
  )
}
