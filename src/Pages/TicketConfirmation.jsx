import React, { useEffect, useState, useRef } from 'react';
import { TicketNav } from '../Components/TicketNav'
import html2pdf from "html2pdf.js";
import Barcode from 'react-barcode';
import TICKET from "../assets/TICKET.svg";
import { useNavigate } from 'react-router-dom';

export const TicketConfirmation = () => { 
    const contentRef = useRef();
    const navigate = useNavigate();
    const [ticketData, setTicketData] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        // Retrieve data from localStorage
        const storedTicketData = localStorage.getItem("ticketData");
        const storedTicketType = localStorage.getItem("ticketTypeSelection");

        // Parse stored data
        const parsedTicketData = storedTicketData ? JSON.parse(storedTicketData) : {};  
        const parsedTicketType = storedTicketType ? JSON.parse(storedTicketType) : null;  

        if (parsedTicketType) {
            setTicketData({
                ...parsedTicketData,  // Spread other ticket details
                ticketType: parsedTicketType.type,  // Use parsed type correctly
                ticketNumber: parsedTicketType.number // Store ticket number properly
            });
        } else {
            // If no data, redirect back to the form
            navigate('/');
        }
    }, [navigate]);

    // Show loading state until ticketData is available
    if (!ticketData) return <p className="text-center">Loading ticket details...</p>;
    
    const printPage = () => {
        window.print();
    };


    
    
    return (
        <>
        <div className='flex flex-col items-center justify-center w-full h-full px-12 md:px-12 text-white text-sm bg-gradient-to-t from-[#0E464F] to-[#08252B] roboto-regular'>
            <TicketNav />

            <div className='border border-[#0E464F] py-2 px-4 my-4 mb-44 rounded-xl bg-[#08252B]'>
              <div className='flex md:flex-row flex-col text-left'>
                  <div className='text-lg jeju-font'>Ready</div>
                  <div className='text-sm mt-1 lg:ml-auto ml-1 '>Step 3/3</div>
              </div>
              <div className='flex h-1 my-1 rounded-lg overflow-hidden'>
                  <div className='w-[100%] bg-[#24A0B5] rounded-r-lg'></div>
              </div>
  
            <div className='px-0 md:px-12 pb-4 pt-4 flex flex-col items-center justify-center rounded-lg my-2 bg-[#08252B]'>
                <div className='text-3xl '>Your Ticket is Booked!</div>
                <div className='text-[15px] mt-1'>Check your email for a copy or you can <span className='font-bold'>download</span></div>
             

            <div className="flex relative flex-col items-center text-center rounded-lg my-4 w-full max-w-md mx-auto">
                {/* Event Details */}

            <div className='p-12' style={{ backgroundImage: `url(${TICKET})`, backgroundSize: 'cover', backgroundPosition: 'center', height:"800px", width:"400px"}}>
                <div className="flex flex-col">
                    <div className="text-5xl road-rage-regular font-semibold">Techember Fest '25</div>
                    <div className='text-sm my-1'>📍 04 Rumens Road, Ikoyi, Lagos</div>
                    <div className='text-sm'>📅 March 15, 2025 | 7:00 PM</div>
                </div>

                {/* Spacer Box (Remove if not needed) */}
                <div className="bg-teal-300 w-[200px] h-[200px] rounded-lg mx-auto my-6 border border-4 border-[rgba(36,160,181,0.5)] bg-[rgba(36,160,181,0.5)] rounded-lg">
                    <img src={ticketData?.uploadedImage} alt="avatar-image" width="400px" height="400px" className="w-full h-full object-cover rounded-lg"/>
                </div>

                {/* Ticket Details Grid */}
                <div className="border border-[#133D44] mt-10 p-3 text-sm bg-[#08343C] rounded-xl grid grid-cols-2 lg:grid-cols-2 text-left">
                    {/* Name */}
                    <div className="p-2 border-r border-b border-[#133D44]">
                        <div className="text-[10px] font-thin">Enter your name</div>
                        <div className="text-sm line-clamp-2">{ticketData?.name}</div>
                    </div>

                    {/* Email */}
                    <div className="p-2 border-b border-[#133D44]">
                        <div className="text-[10px] font-thin">Enter your email *</div>
                        <div className="text-sm line-clamp-2">{ticketData?.email}</div>
                    </div>

                    {/* Ticket Type */}
                    <div className="p-2 border-r border-[#133D44]">
                        <div className="text-[10px] font-thin">Ticket Type:</div>
                        <div className="text-sm">{ticketData?.ticketType}</div>
                    </div>

                    {/* Ticket Count */}
                    <div className="p-2">
                        <div className="text-[10px] font-thin">Ticket for:</div>
                        <div className="text-sm">{ticketData?.ticketNumber}</div>
                    </div>

                    {/* Special Request - Restrict Height */}
                    <div className="p-2 border-t border-[#133D44] col-span-2 min-h-[50px] max-h-[65px] overflow-hidden">
                        <div className="text-[10px] font-thin">Special request?</div>
                        <div className="text-xs line-clamp-3 mt-1">
                            {ticketData?.request ? ticketData?.request : Nil}
                        </div>
                    </div>
                    </div>

                <div className="flex justify-center mt-16 text-xs">
                    <Barcode value={ticketData.ticketID} background="transparent" lineColor="#fff" width={2} />
                </div>

            </div>

               
            </div>

            </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-4 w-full jeju-font">
                <button className="btn-secondary w-full" onClick={() => navigate('/')}>Book Another Ticket</button>
                <button className="btn-primary w-full" onClick={printPage} disabled={loader}>{loader ? "downloading..." : "Download Ticket"}</button>
            </div>
            
            </div>
        </div>
        </>
      )
               
  }