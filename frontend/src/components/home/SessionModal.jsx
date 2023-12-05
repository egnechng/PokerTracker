import { AiOutlineClose } from 'react-icons/ai'
import { CiLocationOn } from "react-icons/ci";
import { GiCardRandom } from "react-icons/gi";
import { MdOutlineDateRange } from "react-icons/md";
import { TbPokerChip } from "react-icons/tb";

const SessionModal = ({ session, onClose }) => {
    return (
        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h2 className={`w-fit px-4 py-2 ${session.cashOut - session.buyIn > 0 ? 'bg-green-500' : session.cashOut - session.buyIn < 0 ? 'bg-red-500' : 'bg-gray-500'} rounded-lg`}>
                    {session.cashOut - session.buyIn > 0 ? '+$' : '-$'}
                    {Math.abs(session.cashOut - session.buyIn)}
                </h2>
                <div className='flex justify-start items-center gap-x-2'>
                    <MdOutlineDateRange className='text-2xl' />
                    <h2 className='my-1'>{session.date.split('T')[0]}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    <CiLocationOn className='text-2xl' />
                    <h2 className='my-1'>{session.location}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    <GiCardRandom className='text-2xl' />
                    <h2 className='my-1'>{session.gameType}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    <TbPokerChip className='text-2xl' />
                    <h2 className='my-1'>{session.blinds}</h2>
                </div>
            </div>
        </div>
    )
}

export default SessionModal