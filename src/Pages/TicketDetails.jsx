import React, { useState, useEffect } from 'react'
import uploadIcon from "../assets/uploadIcon.svg"
import envelope from "../assets/envelope.svg"
import { TicketNav } from '../Components/TicketNav'
import { useNavigate } from 'react-router-dom';

export const TicketDetails = () => {
const preset_key = import.meta.env.VITE_PRESET_KEY;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;    
const [uploadedImage, setUploadedImage] = useState('')
const [uploading, setUploading] = useState(false)
const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    request: "", 
    
})

const [errors, setErrors] = useState({});
const navigate = useNavigate();
const ticketNum = "TICKET"

const handleOnChangeDetails = (e) => {
    const { name, value } = e.target;
    const updatedDetails = { ...userDetails, [name]: value };
    
    setUserDetails(updatedDetails);
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Save to Local Storage
    localStorage.setItem("formData", JSON.stringify(updatedDetails));
};


    //Upload Image 
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
    
        if (!file) return;
    
        // Validate file type
        const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
        if (!allowedTypes.includes(file.type)) {
            setErrors((prevErrors) => ({ ...prevErrors, uploadedImage: "Only PNG, JPG, and PDF are allowed." }));
            return;
        }
    
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setErrors((prevErrors) => ({ ...prevErrors, uploadedImage: "File size must be under 5MB." }));
            return;
        }
    
        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", preset_key);
        data.append("cloud_name", cloud_name);
    
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: "POST",
                body: data
            });
    
            const uploadedImageURL = await res.json();
            console.log(uploadedImageURL.secure_url);
    
            setUploadedImage(uploadedImageURL.secure_url); // Set uploaded image
    
            // Save to Local Storage
            localStorage.setItem("uploadedImage", uploadedImageURL.secure_url);
    
            setErrors((prevErrors) => ({ ...prevErrors, uploadedImage: "" }));
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setUploading(false);
        }
    };
    
    // Restore Data on Page Load
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("formData"));
        if (savedData) {
            setUserDetails(savedData);
        }
    
        // const savedImage = localStorage.getItem("uploadedImage");
        // if (savedImage) {
        //     setUploadedImage(savedImage);
        // }
    }, []);

    //Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Form Validation
        let newErrors = {};
    
        if (!userDetails.name.trim()) newErrors.name = 'Name is required';
        
        if (!userDetails.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(userDetails.email)) {
            newErrors.email = 'Enter a valid email';
        }
    
        if (!userDetails.request.trim()) {
            newErrors.request = 'Special request is required';
        }
    
        if (!uploadedImage) {
            newErrors.uploadedImage = 'Image upload is required';
        }
    
        setErrors(newErrors);

        // Generate unique ticket ID
        const ticketID = `${ticketNum}${Date.now()}`;
    
        // Prevent form submission if there are errors
        if (Object.keys(newErrors).length === 0) {
            localStorage.setItem("ticketData", JSON.stringify({
                name: userDetails.name,
                email: userDetails.email,
                request: userDetails.request,
                uploadedImage: uploadedImage, // Store uploaded image URL
                ticketID
                
            }));
    
            navigate('/ticket-confirmation'); // Navigate only if no errors
        }
    };
    

  return (
    <> 
    <div className='flex flex-col items-center justify-center w-full h-full px-12 md:px-12 text-white text-sm bg-gradient-to-t from-[#0E464F] to-[#08252B] roboto-regular'>
        <TicketNav />
    
        <div className='border border-[#0E464F] py-2 px-6 my-5 rounded-xl bg-[#08252B]'>
            <div className='flex md:flex-row flex-col text-left'>
                <div className='text-lg jeju-font'>Attendee Details</div>
                <div className='text-sm mt-1 lg:ml-auto ml-1 '>Step 2/3</div>
            </div>
            <div className='flex h-1 my-1 rounded-lg overflow-hidden'>
                <div className='w-[65%] bg-[#24A0B5] rounded-r-lg'></div>
                <div className='w-[35%] bg-[#0E464F]'></div>
            </div>
  
  
        <div className='border border-[#0E464F] pt-3 pb-2 px-8 rounded-xl my-2 bg-[#08252B]'>
        <div className='border border-[#0E464F] bg-[#08252B] px-12 lg:px-4 py-2 flex flex-col rounded-lg '>
            <div className='mb-2 text-left'>Upload Profile Photo</div> 

        {uploadedImage ? 
            (<div className="bg-teal-300 w-[200px] h-[200px] rounded-lg mx-auto my-4 border border-4 border-[rgba(36,160,181,0.5)] bg-[rgba(36,160,181,0.5)] ">
                <img src={uploadedImage} alt="avatar-image" width="400px" height="400px" className="w-full h-full object-cover rounded-lg"/>
            </div>
            ):( 
            <label htmlFor="uploadFile"  className='border border-4 border-[rgba(36,160,181,0.5)] bg-[rgba(36,160,181,0.5)] rounded-lg items-center justify-center flex flex-col'>
                {uploading
                        ? <div className="px-12 py-20">Uploading...</div> : 
                    <>
                        <input id="uploadFile" type="file" className="hidden focus:outline-none" onChange={handleFileChange} />
                        <div className='px-12 py-12 lg:px-2 items-center justify-center flex flex-col'> 
                            <img src={uploadIcon} alt="upload-icon" className='w-8 h-8' />
                            <div className='text-center line-clamp-3'>Drag & drop or click to upload</div>
                        </div>
                    </>
                    }
            </label>
            )}
              
            {errors.uploadedImage && <p className="text-[#24A0B5] text-xs">{errors.uploadedImage}</p>}
        </div>
            
        <div className='flex h-px bg-[#07373F] p-[2px] my-4 rounded-lg w-full'></div> 
            
        <form onSubmit={handleSubmit} className="w-full">
            {/* Name Input */}
            <div className="text-left my-2">Enter your name</div>
            <input name="name" className="flex border border-[#07373F] rounded-lg bg-[#052228] p-2 w-full focus:ring-1 outline-none focus:ring-[#24A0B5]"
                    value={userDetails.name} onChange={handleOnChangeDetails}/>
                {errors.name && <p className="text-[#24A0B5] text-xs">{errors.name}</p>}

          {/* Email Input */}
            <div className="text-left my-2">Enter your email *</div>
            <div className="flex items-center border border-[#07373F] rounded-lg bg-[#052228] p-2 w-full focus-within:ring-1 focus-within:outline-none focus-within:ring-[#24A0B5]">
            <img src={envelope} alt="envelope-icon" className="w-5 h-5 mr-2" />
            <input name="email"
                className="flex-1 bg-transparent p-2 focus:ring-0 outline-none text-white"
                placeholder="hello@tixxlagos.io"
                value={userDetails.email}
                onChange={handleOnChangeDetails}
            />
        </div>
        {errors.email && <p className="text-[#24A0B5] text-xs">{errors.email}</p>}


            {/* Special Request Input */}
            <div className="text-left my-2">Special request?</div>
            <input name="request" className="flex border border-[#07373F] rounded-lg bg-[#052228] p-1 pb-20 w-full focus:ring-1 outline-none focus:ring-[#24A0B5]"
                placeholder="Textarea" value={userDetails.request} onChange={handleOnChangeDetails}/>
                {errors.request && <p className="text-[#24A0B5] text-xs">{errors.request}</p>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-4 w-full jeju-font">
                <button type="button" className="btn-secondary w-full" onClick={() => navigate('/')}>Back</button>
                <button type="submit" className="btn-primary w-full">Get My Ticket</button>
            </div>
         </form>

        </div>
        </div>
    </div>
    </>
  )
}
