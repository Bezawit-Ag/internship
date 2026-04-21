import { useState, useEffect } from 'react';
import ContractorList from './ContractorList';
import RegisterContractor from './RegisterContractor';
import ContractorDetails from './ContractorDetails';

const initialContractors = [
  { id: 'CON-001', name: 'Amhara Installation Services PLC', service_type: 'Institution', contact_person: 'Yohannes Tesfaye', contact_phone: '+251 911 100 200', registered_date: '2024-01-20', status: 'Active', address: 'Bahir Dar, Amhara Region' },
  { id: 'CON-002', name: 'EthioTech Energy Contractors Ltd', service_type: 'Off-Grid', contact_person: 'Almaz Hailu', contact_phone: '+251 912 200 300', registered_date: '2024-02-15', status: 'Active', address: 'Addis Ababa' },
  { id: 'CON-003', name: 'Rural Power Installations Co.', service_type: 'Off-Grid', contact_person: 'Dereje Mekasha', contact_phone: '+251 913 300 400', registered_date: '2024-03-08', status: 'Active', address: 'Gondar, Amhara Region' },
  { id: 'CON-004', name: 'Solar Install Amhara', service_type: 'Institution', contact_person: 'Tigist Worku', contact_phone: '+251 914 400 500', registered_date: '2024-04-11', status: 'Inactive', address: 'Dessie, Amhara Region' }
];

export default function ContractorRegistration() {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'register', 'details'
  const [selectedContractorId, setSelectedContractorId] = useState(null);
  const [contractors, setContractors] = useState(initialContractors);

  const viewDetails = (id) => {
    setSelectedContractorId(id);
    setCurrentView('details');
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {currentView === 'list' && (
        <ContractorList 
          contractors={contractors} 
          onRegister={() => setCurrentView('register')} 
          onViewDetails={viewDetails}
        />
      )}
      {currentView === 'register' && (
        <RegisterContractor 
          onCancel={() => setCurrentView('list')} 
          onSuccess={(newContractor) => {
             setContractors([...contractors, { id: `CON-00${contractors.length+1}`, ...newContractor, status: 'Active', registered_date: new Date().toISOString().split('T')[0] }]);
             setCurrentView('list');
          }}
        />
      )}
      {currentView === 'details' && (
        <ContractorDetails 
          contractorId={selectedContractorId} 
          contractor={contractors.find(c => c.id === selectedContractorId)}
          onBack={() => setCurrentView('list')} 
        />
      )}
    </div>
  );
}
