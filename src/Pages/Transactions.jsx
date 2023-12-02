import React,{useState} from 'react'
import { initializeApp } from "firebase/app";
import 'firebase/firestore';

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1K82aTXX64DEcvfglJEr2Uw7vNNrEz0g",
    authDomain: "webpe-28ef8.firebaseapp.com",
    projectId: "webpe-28ef8",
    storageBucket: "webpe-28ef8.appspot.com",
    messagingSenderId: "514825054502",
    appId: "1:514825054502:web:0074a246042726f6edb9e7",
    measurementId: "G-9XP1S44R2F"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

const Transactions=()=>{
const [walletAddress, setWalletAddress] = useState('');
const [transactionAmount, setTransactionAmount] = useState('');
const [errors, setErrors] = useState({});

//Validate the form
  const validateForm = () => {
    let formValid = true;
    const errorsObj = {};

    if (!walletAddress.trim()) {
      errorsObj.walletAddress = 'Wallet address field cannot be empty';
      formValid = false;
    }

    if (!transactionAmount.trim()) {
      errorsObj.transactionAmount = 'Please enter a transaction amount';
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

  //Send data to firebase when submit button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validForm=validateForm();
    if(validForm){
        const data = {
            walletAddress,
            transactionAmount: Number(transactionAmount),
            timestamp: new Date().toISOString() 
          };
      
          try {
            const response = await fetch('https://webpe-28ef8-default-rtdb.firebaseio.com/transactions.json', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
      
            if (response.ok) {
              console.log('Data saved to Realtime Database');
              setWalletAddress('');
              setTransactionAmount('');
            } else {
              console.error('Failed to save data to Realtime Database');
            }
          } catch (error) {
            console.error('Error saving data to Realtime Database:', error);
          }
    }else{
        console.log("Invalid data , form not submitted");
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
