import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { CiLocationOn } from "react-icons/ci";
import { GiCardRandom } from "react-icons/gi";
import { MdOutlineDateRange } from "react-icons/md";
import { TbPokerChip } from "react-icons/tb";
import { BiShow } from "react-icons/bi";
import { useState } from 'react'
import SessionModal from './SessionModal'

const SingleCard = ({ session }) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div
            key={session._id}
            className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
        >
            <h2 className={`absolute top-1 right-2 px-4 py-2 ${session.cashOut - session.buyIn > 0 ? 'bg-green-500' : session.cashOut - session.buyIn < 0 ? 'bg-red-500' : 'bg-gray-500'} rounded-lg`}>
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
            <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                <BiShow
                    className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                    onClick={() => setShowModal(true)}
                />
                <Link to={`/sessions/details/${session._id}`}>
                    <BsInfoCircle className='text-green-800 text-2xl hover:text-black' />
                </Link>
                <Link to={`/sessions/edit/${session._id}`}>
                    <AiOutlineEdit className='text-yellow-600 text-2xl hover:text-black' />
                </Link>
                <Link to={`/sessions/delete/${session._id}`}>
                    <MdOutlineDelete className='text-red-600 text-2xl hover:text-black' />
                </Link>
            </div>
            {
                showModal && (
                    <SessionModal session={session} onClose={() => setShowModal(false)} />
                )
            }
        </div>
    )
}

export default SingleCard