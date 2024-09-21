// import AppointmentFrom from '@/components/forms/Appointmentfrom'
import AppointmentFrom from '@/components/forms/AppointmentFrom'
import PatientForm from '@/components/forms/PatientFrom'
import { getPatient } from '@/lib/actions/patient.actions'
import { Sassy_Frass } from 'next/font/google'
import React from 'react'

 export default async function  NewAppointment({params:{userId}}:SearchParamProps) {

  const patient = await getPatient(userId)
  return (
  
        <div className="flex h-screen max-h-screen ">
   <section className="remove-scrollbar container my-auto">
 
 <div className="sub-container max-w-[860px] flex-1 justify-between ">

  <img
  src="/assets/icons/logo.png"
  height={1000}
  width={1000}
  alt="patient"
  className="mb-12 h-16 w-fit "
  />

{/* <AppointmentFrom
type = "create"
userId = {userId}
patientId = {patient.$id}

/> */}
<AppointmentFrom 
type = "create"
userId = {userId}
patientId = {patient.$id}
/>


  <p className=" copyright mt-10  py-12 ">
© 2024  Lucky
</p>

 </div>

   </section>

   <img 
   
   src="/assets/images/appointment-img.png" 
   height={1000}
   width={1000}
   alt="appointment"
   className="side-img max-w-[360px] bg-bottom"
   />
 
    </div>
  )
}

// export default  NewAppointment
