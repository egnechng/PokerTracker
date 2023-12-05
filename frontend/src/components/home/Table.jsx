import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'

const Table = ({ sortedSessions }) => {
    return (
        <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-600 rounded-md'>Date</th>
                    <th className='border border-slate-600 rounded-md'>Location</th>
                    <th className='border border-slate-600 rounded-md'>Game</th>
                    <th className='border border-slate-600 rounded-md'>Blinds</th>
                    <th className='border border-slate-600 rounded-md'>Duration</th>
                    <th className='border border-slate-600 rounded-md'>Profit/Loss</th>
                    <th className='border border-slate-600 rounded-md'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sortedSessions.map((session) => (
                    <tr key={session._id} className='h-8'>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {session.date.split('T')[0]}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {session.location}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {session.gameType}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {session.blinds}
                        </td>

                        <td className='border border-slate-700 rounded-md text-center'>
                            {session.duration}
                        </td>
                        <td className={`border border-slate-700 rounded-md text-center ${session.cashOut - session.buyIn > 0 ? 'bg-green-500' : session.cashOut - session.buyIn < 0 ? 'bg-red-500' : 'bg-gray-500'}`}>
                            {session.cashOut - session.buyIn > 0 ? '+$' : '-$'}
                            {Math.abs(session.cashOut - session.buyIn).toLocaleString()}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            <div className='flex justify-center gap-x-4'>
                                <Link to={`/sessions/details/${session._id}`}>
                                    <BsInfoCircle className='text-green-800 text-2xl' />
                                </Link>
                                <Link to={`/sessions/edit/${session._id}`}>
                                    <AiOutlineEdit className='text-yellow-600 text-2xl' />
                                </Link>
                                <Link to={`/sessions/delete/${session._id}`}>
                                    <MdOutlineDelete className='text-red-600 text-2xl' />
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table