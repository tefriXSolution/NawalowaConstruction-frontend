import { OurStory, CoreValue } from '@/types'
import testImg from "@/assets/img/testCard.jpg"
import { StoryBlock } from './components/StoryBlock'
import { CoreValueCard } from './components/CoreValueCard'
import { LuHammer, LuLightbulb } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaRegHandshake } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";


const OurStories:OurStory[]=[
    {
        StoryTitle:"Foundation and Early Years (2005-2010)",
        StoryDesc:"Nawalowa Constructions began its journey in 2005 with a vision to revolutionize the local construction and equipment rental industry. Founded by a team of seasoned engineers and construction veterans, our initial focus was on providing specialized sand blasting and steel painting services for industrial clients. We quickly earned a reputation for precision, reliability, and delivering projects ahead of schedule. Our humble beginnings saw us operating with a small fleet of machinery and a dedicated crew, prioritizing client satisfaction above all else."
    },
    {
        StoryTitle:"Expansion and Diversification (2011-2017)",
        StoryDesc:"Recognizing the growing demand for comprehensive construction solutions, Nawalowa expanded its services to include house painting and introduced a rental fleet of essential equipment. This period marked a significant diversification, bringing in painting machines, sand blasting machines, and lime mixing machines. Our commitment to using high-quality materials and state-of-the-art equipment allowed us to cater to a broader residential and commercial clientele, establishing us as a versatile and reliable partner in the construction sector."
    },
    {
        StoryTitle:"Innovation and Growth (2018-Present)",
        StoryDesc:"In recent years, Nawalowa Constructions has embraced technological advancements and sustainable practices to further enhance our offerings. We invested in modern, energy-efficient machinery and implemented rigorous safety protocols, reinforcing our position as an industry leader. Our dedication to continuous improvement and fostering strong client relationships has fueled our steady growth, allowing us to take on increasingly complex and large-scale projects. Today, we stand as a trusted name, known for our unwavering quality, efficiency, and commitment to building a better future."
    },
]

const coreValues:CoreValue[]=[
    {
        valueTitle:"Excellence in Craftsmanship",
        valueDesc:"We are committed to delivering superior quality in every project, ensuring durability and aesthetic appeal.",
        icon:LuHammer
    },
    {
        valueTitle:"Uncompromising Safety",
        valueDesc:"The well-being of our team and clients is paramount. We adhere to the highest safety standards.",
        icon:VscWorkspaceTrusted
    },
    {
        valueTitle:"Integrity and Trust",
        valueDesc:"We operate with transparency, honesty, and foster lasting relationships built on mutual respect.",
        icon:FaRegHandshake
    },
    {
        valueTitle:"Innovation and Adaptability",
        valueDesc:"Embracing new technologies and methods to provide efficient and forward-thinking solutions.",
        icon:LuLightbulb
    },
    {
        valueTitle:"Customer-Centric Approach",
        valueDesc:"Understanding and exceeding client expectations through personalized service and open communication.",
        icon:FiUsers
    },
    {
        valueTitle:"Community Impact",
        valueDesc:"Committed to contributing positively to the communities where we build and operate.",
        icon:MdOutlineLocationOn
    },
]

export const AboutUsPage = () => {
  return (
    <>
        {/* Landing Section */}
        <div className='grid md:grid-cols-2 sm:grid-cols-1 p-5 m-5 gap-10'>
            <div className='flex justify-center flex-col'>
                <h1 className='text-6xl align-middle flex justify-center font-bold mb-5'>
                    Building the Future, One Project at a Time.
                </h1>
                <h4 className='text-xl text-gray-600'>
                    At Nawalowa Constructions, we blend innovation with unwavering dedication to quality. 
                    For nearly two decades, we've been the trusted
                    partner for comprehensive construction and equipment rental solutions, 
                    turning visions into reality with precision and expertise.
                </h4>
            </div>
            <div>
                <img src={testImg} className='rounded-2xl' />
            </div>
        </div>

        {/* Our Story section */}
        <div className='mt-10'>
            <h1 className='text-5xl text-center mb-5'>Our Story</h1>
            <h3 className='text-2xl text-gray-500 text-center'>A legacy of building and innovation.</h3>
            <div className=' p-5 flex justify-center flex-col gap-y-10 md:px-40 sm:px-10'>
                {OurStories.map((story,index)=>(
                    <StoryBlock 
                        key={index}
                        title={story.StoryTitle}
                        description={story.StoryDesc}
                    />
                ))}
            </div>
        </div>
        
        {/* Our Core Values */}
        <div className="mt-10">
            <h1 className="text-5xl text-center mb-5 font-bold">Our Core Values</h1>
            <h3 className="text-2xl text-gray-500 text-center">
                Guiding principles that define our commitment.
            </h3>
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8 md:px-40 sm:px-10">
                {coreValues.map((value, index) => (
                <CoreValueCard
                    key={index}
                    title={value.valueTitle}
                    description={value.valueDesc}
                    Icon={value.icon}
                />
                ))}
            </div>
        </div>
    </>
  )
}
