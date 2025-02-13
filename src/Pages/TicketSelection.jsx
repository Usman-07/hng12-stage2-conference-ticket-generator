import React, { useState, useEffect } from 'react'
import { TicketNav } from '../Components/TicketNav'
import { useNavigate } from 'react-router-dom';

export const TicketSelection = () => {
const [ticketType, setTicketType] = useState('Free')
const [ticketNumber, setTicketNumber] = useState('')
const [error, setError] = useState('');
const navigate = useNavigate();

const handleTicketNum = (e) => {
    const value = e.target.value;
    setTicketNumber(value);

    // Remove error message if user enters a valid number
    if (parseInt(value) > 0) {
      setError('');
    }
  };

const handleTicketType = (type) => {
    setTicketType(type)
}

 // Save to localStorage on every change
 useEffect(() => {
    localStorage.setItem("ticketTypeSelection", JSON.stringify({
        type: ticketType,
        number: parseInt(ticketNumber) || 0 // Store as a number
    }));
}, [ticketType, ticketNumber]);

// Handle Next Button Click
const handleNext = () => {
    if (!ticketNumber || parseInt(ticketNumber) <= 0) {
        setError('Select at least 1 ticket');
        return;
    }

    navigate('/ticket-details'); 
};


  return (
    <> 
    <div className='flex flex-col items-center justify-center w-full h-full px-12 md:px-12 text-white text-sm bg-gradient-to-t from-[#0E464F] to-[#08252B] roboto-regular'>
        <TicketNav />
    
          <div className='border border-[#0E464F] py-2 px-4 my-5 mb-40 rounded-xl bg-[#08252B]'>
            <div className='flex md:flex-row flex-col text-left'>
                <div className='text-lg jeju-font'>Ticket Selection</div>
                <div className='text-sm mt-1 lg:ml-auto ml-1 '>Step 1/3</div>
            </div>
            <div className='flex h-1 my-1 rounded-lg overflow-hidden'>
                <div className='w-[45%] bg-[#24A0B5] rounded-r-lg'></div>
                <div className='w-[55%] bg-[#0E464F]'></div>
            </div>


            <div className='border border-[#0E464F] pt-2 pb-2 px-4 rounded-xl my-4 bg-[#08252B]'>
                {/* Event Title and Location */}
            <div className='border border-[#0E464F] px-2 lg:px-12 py-4 flex flex-col items-center justify-center text-center rounded-lg my-2 bg-gradient-to-b from-[#0E464F] to-[#08252B]'>
                <div className='text-6xl font-semibold road-rage-regular'>Techember Fest ”25</div>
                <div className='text-[15px] mt-1'>Join us for an unforgettable experience at <br/>[Event Name]! Secure your spot now.</div>
                <div className='text-[15px] mt-1'>📍 [Event Location] | | March 15, 2025 | 7:00 PM</div>
            </div>
            <div className='flex h-px bg-[#07373F] p-[2px] my-2 rounded-lg w-full'></div>

            <div className='text-normal text-left mb-1 mt-3'>Select Ticket Type: </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 border border-[#07373F] rounded-lg bg-[#052228] p-4'>

            <button className={`card-btn ${ticketType === 'Free' ? 'active' : ''}`}  onClick={() => handleTicketType('Free')}>
                <div className='text-left'>
                    <div className='font-bold text-lg'>Free</div>
                        <div>Regular Access</div>
                        <div className='mt-1 text-xs'> 20/52</div>
                    </div>
                </button>

                <button className={`card-btn ${ticketType === 'VIP' ? 'active' : ''}`} onClick={() => handleTicketType('VIP')}>
                    <div className='text-left'>
                        <div className='font-bold text-lg'>$50</div>
                        <div>VIP Access</div>
                        <div className='mt-1 text-xs'> 20/52</div>
                    </div>
                </button>

                <button className={`card-btn ${ticketType === 'VVIP' ? 'active' : ''}`}  onClick={() => handleTicketType('VVIP')}>
                    <div className='text-left'>
                        <div className='font-bold text-lg'>$150</div>
                        <div>VVIP Access</div>
                        <div className='mt-1 text-xs'> 20/52</div>
                    </div>
                   
                </button>
            </div>
            
            <div className='text-left mb-1 mt-3'>Number of Tickets</div>
            <select 
                className='flex border border-[#07373F] rounded-lg bg-[#052228] p-2 w-full focus:ring-1 outline-none focus:ring-[#24A0B5]' 
                value={ticketNumber} 
                onChange={handleTicketNum}
            >
                <option value='' disabled>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>

            {error && <p className="text-[#24A0B5] text-xs">{error}</p>}


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-4 w-full jeju-font">
                <button type="button" className="btn-secondary w-full" onClick={() => navigate('/')}>Cancel</button>
                <button type="button" className="btn-primary w-full" onClick={handleNext}>Next</button>
            </div>
            
            </div>
        </div>
    </div>
    </>
  )
}
