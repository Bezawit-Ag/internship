import React from 'react';

const RegisterBeneficiary = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold mb-6">Beneficiary Registry</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-slate-200">
        <p className="text-slate-600 mb-4">
          Welcome to the Beneficiary Registry. Here you will be able to register new beneficiaries, update their details, and track structural distributions.
        </p>
        <div className="h-64 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400">
          Beneficiary Data Table / Registration Form will go here
        </div>
      </div>
    </div>
  );
};

export default RegisterBeneficiary;
