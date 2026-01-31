import React from 'react';
import PetirIcon, { TargetIcon, ShieldIcon, UsersIcon } from '@/components/icons';
const AuthLayout = ({ children}) => {
 return (
  <div className="flex min-h-screen bg-[#F8FAFC]"> 
   {/* Left side - Gradient */}
   <div 
    className="hidden lg:flex w-1/2 flex-col px-20 py-15 relative overflow-hidden"
    style={{ 
      background: 'linear-gradient(180deg, #1FA2FF 0%, #0F172A 100%)'
    }}
   >
    
    <div className="flex flex-col gap-6" >
      <img 
      className="bg-white p-3 rounded-lg h-12 w-fit"
      src="/logo.svg"
      />

      {/* <div> */}
        <h1 className="font-poppins font-medium text-[52px] text-[#0F172A] leading-tight">
          Smart <br/> Screening, <br />
          <span className="text-white">Better Hiring</span>
        </h1>
      {/* </div> */}
      <p className="text-[#ECEAEA]" >Our platform automates CV summarization and skill matching to give you instant, data-driven insights. Experience a more effective recruitment workflow that helps you pinpoint top-tier candidates shorty after they apply.</p>
      
      {/* Feature Cards Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Card 1 - Instant Summary */}
        <div className="bg-[#1B2335] p-4 border-2 border-[#333A4A] rounded-2xl">
          <div className="flex flex-row gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #5671AC 0%, #15223F 100%)'}}>
              <PetirIcon />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-white font-medium">Instant Summary</p>
              <p className="text-[10px] text-[#B6C5D2]">Ringkasan profile otomatis dari AI</p>
            </div>
          </div>
        </div>

        {/* Card 2 - Precision Match */}
        <div className="bg-[#1B2335] p-4 border-2 border-[#333A4A] rounded-2xl">
          <div className="flex flex-row gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #5671AC 0%, #15223F 100%)'}}>
              <TargetIcon />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-white font-medium">Precision Match</p>
              <p className="text-[10px] text-[#B6C5D2]">Skor kecocokan berdasarkan job desc</p>
            </div>
          </div>
        </div>

        {/* Card 3 - Bias-Free */}
        <div className="bg-[#1B2335] p-4 border-2 border-[#333A4A] rounded-2xl">
          <div className="flex flex-row gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #5671AC 0%, #15223F 100%)'}}>
              <ShieldIcon />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-white font-medium">Bias-Free</p>
              <p className="text-[10px] text-[#B6C5D2]">Penilaian objektif berdasarkan kompetensi</p>
            </div>
          </div>
        </div>

        {/* Card 4 - Bulk Processing */}
        <div className="bg-[#1B2335] p-4 border-2 border-[#333A4A] rounded-2xl">
          <div className="flex flex-row gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #5671AC 0%, #15223F 100%)'}}>
              <UsersIcon />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-white font-medium">Bulk Processing</p>
              <p className="text-[10px] text-[#B6C5D2]">Proses ratusan CV sekaligus</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
   </div>

   {/* Right side - Form */}
   <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
   <div className="w-full max-w-[300px] sm:max-w-[30.375rem]
          rounded-md sm:rounded-xl bg-white 
          px-4 sm:px-[1.6rem]
          py-3 sm:pt-[0.875rem] sm:pb-[2rem]
          shadow-lg">

    {children}
   </div>
    
   </div>
  </div>
 ) 
}

export default AuthLayout;