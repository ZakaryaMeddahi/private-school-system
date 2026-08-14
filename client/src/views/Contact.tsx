import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import RowInput from '@/components/RowInput';
import ContactInput from '@/components/contact-input/ContactInput';
import ContactHeader from '@/components/contact-header/ContactHeader';
import ContactInfo from '@/components/contact-info/ContactInfo';
import Media from '@/components/Socials/Media';

const ContactPage = () => {
    return (
        <div className="my-12.5 flex w-full max-w-full flex-col items-center">
            <ContactHeader title='Contact Us' Txt='Any question or remarks? Just write us a message!' textAlign='center' HColor='#F6AF03' HFontSize='40' TColor='#717171' tfW='500'/>
            <div className="my-12.5 grid w-299 grid-cols-[auto_1fr] gap-6 rounded-[10px] bg-white p-5 shadow-[rgba(0,0,0,0.35)_0px_5px_15px]" style={{ height: '667px' }}>
                <div className="grid h-full w-122.75 justify-between gap-6 rounded-[10px] bg-[#011C2B] p-7.5 text-white">
                    <ContactHeader title='Contact Information' Txt='Feel free to contact us for any question or remarks. We will be happy to help you.' HColor='white' HFontSize='28' TColor='#C9C9C9' hfW='600'/>
                    <div className="grid gap-3">
                        <ContactInfo icon={<PiPhoneCallFill size='25' />} info='+1 234 567 890' />
                        <ContactInfo icon={<MdEmail size='25' />} info='ex@gmail.com' />
                        <ContactInfo icon={<FaLocationDot size='25' />} info='1234 Street Name, City Name' />
                    </div>
                    <div className="flex flex-row items-end gap-5">
                        <Media icon={<FaFacebookF size='25' />} />
                        <Media icon={<BsInstagram size='25' />} />
                        <Media icon={<BsWhatsapp size='25' />} />
                    </div>
                </div>
                <div className="w-full">
                    <RowInput label_I1='First Name' label_I2='Last Name' placeholder_I1='|' placeholder_I2='Sid' />
                    <RowInput label_I1='Email' label_I2='Phone' placeholder_I1='ex@gmail.com' placeholder_I2='+1 234 567 89' />
                    <ContactInput label='Subject' placeholder='Write your Subject' mT='30px' />
                    <ContactInput label='Message' placeholder='Write your message..' mT='40px' imT='40px'/>
                    <div className="mt-10 flex justify-end">
                        <Button className="h-auto rounded-md bg-[#011C2A] px-7.5 py-2.5 text-base font-medium text-white hover:bg-[#F6AF03] hover:text-black">Send Message</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;