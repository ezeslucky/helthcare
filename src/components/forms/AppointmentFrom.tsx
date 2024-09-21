"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
//@ts-ignore
import { AppointmentFormValidation} from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";

import SubmitButton from "../SubmitButton";
import { Doctors } from "../../../constants";
import { SelectItem } from "@radix-ui/react-select";

export enum FromFieldType{
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATA_PICKER = 'dataPicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

export const AppointmentFrom = ({userId, patientId, type}:{
   userId: string                          
   patientId: string
   type: "create" | "cancel" | "schedule";
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
     primaryPhysician: "",
     sehedule: new Date(),
     reason:"",
     note:"",
     cancellationReason:"",

    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true)

let status;
switch (type) {
  case 'schedule':
    status = 'schedule';
    break;
    case 'cancel':
      status = 'cancelled';
      break;
    
  default:
    status = 'pending'
    break;
}

    try {
      const userData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const user = await createUser(userData);

      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

   
  };

  let buttonLable;

  switch (type) {
    case 'cancel':
      buttonLable = 'Cancel Appointment'
      break;
      case 'create':
        buttonLable = 'Create Appointment'
  break;
  case 'schedule':
    buttonLable = 'Schedule Appointment'
    break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Request a new  appointment.</p>
        </section>

        {type !== "cancel" && (
        <>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Doctor"
          placeholder="Select a doctor"
        >
          {Doctors.map((doctor, i) => (
            <SelectItem key={doctor.name + i} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <img
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt="doctor"
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Expected appointment date"
          showTimeSelect
          dateFormat="MM/dd/yyyy  -  h:mm aa"
        />

        <div className="flex flex-col gap-6 xl:flex-row" >
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Appointment reason"
            placeholder="Annual montly check-up"
          
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="note"
            label="Comments/notes"
            placeholder="Prefer afternoon appointments, if possible"
          
          />
        </div>
      </>
        )}

{type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton isLoading={isLoading} className= {`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLable}</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentFrom