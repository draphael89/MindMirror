import React from 'react';
import EssayList from '../../components/EssayList';

const EssayListPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Essays</h1>
      <EssayList />
    </div>
  );
};

export default EssayListPage;