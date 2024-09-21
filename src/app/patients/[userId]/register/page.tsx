// import RegisterFrom from '@/components/forms/RegisterFrom'
// import { getUser } from '@/lib/actions/patient.actions'
// import { Fullscreen } from 'lucide-react'
// import React from 'react'

// const Ragister = async ({params:{userId}}: SearchParamProps) => {

//   const user = await getUser(userId)
//   return (
//     <div className="flex h-screen max-h-screen ">
//     <section className="remove-scrollbar container my-auto">
  
//   <div className="sub-container max-w-[950px] flex-1 flex-col py-10">
 
//    <img
//    src="/assets/icons/logo.png"
//    height= {1000}
//    width={1000}
//    alt="patient"
//    className="mb-12 h-16 w-fit "
//    />
 
//  <RegisterFrom user={user}/>

//  <p className="  py-12 copyright">
//  © 2024  Lucky
//  </p>

//   </div>
 
//     </section>
 
//     <img 
    
//     src="/assets/images/register-img.png" 
//     height={1000}
//     width={1000}
//     alt="patient"
//     className="side-img max-w-[400px]"
//     />
//     </div>
//   )
// }

// export default Ragister


import Image from "next/image";
import { redirect } from "next/navigation";

// import RegisterForm from "@/components/forms/RegisterForm";
import {  getUser } from "@/lib/actions/patient.actions";
import RegisterForm from "@/components/forms/RegisterFrom";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  // const patient = await getPatient(userId);

  // if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 Lucky</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
