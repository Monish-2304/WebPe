import React,{useState} from 'react'
import Header from '../Components/Header'

const Transactions=()=>{
const [walletAddress, setWalletAddress] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formValid = true;
    const errorsObj = {};

    if (!walletAddress.trim()) {
      errorsObj.walletAddress = 'Please enter wallet address';
      formValid = false;
    }

    if (!transactionAmount.trim()) {
      errorsObj.transactionAmount = 'Please enter transaction amount';
      formValid = false;
    } else if (isNaN(transactionAmount)) {
      errorsObj.transactionAmount = 'Please enter valid transaction amount';
      formValid = false;
    } else if (Number(transactionAmount) < 0 || Number(transactionAmount) > 10000) {
      errorsObj.transactionAmount = 'Please enter transaction amount in the range 0 to 10000';
      formValid = false;
    }

    setErrors(errorsObj);
    return formValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform action on valid form submission
      console.log('Form is valid. Do something...');
    } else {
      console.log('Form submission halted due to validation errors');
    }
  };

  return (
    <div>
      <div className="flex flex-col m-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <span className="m-2 mr-12">Wallet Address</span>
            <input
              className="w-44 border border-gray-200 m-4"
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            {errors.walletAddress && <span className="text-red-500">{errors.walletAddress}</span>}
          </div>
          <div className="flex items-center">
            <span className="m-2 mr-3">Transaction Amount</span>
            <input
              className="w-44 border border-gray-200 m-4"
              type="number"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            {errors.transactionAmount && (
              <span className="text-red-500">{errors.transactionAmount}</span>
            )}
          </div>
          <button className="flex ml-2 bg-blue-500 w-fit text-white font-bold py-2 px-4 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transactions;
