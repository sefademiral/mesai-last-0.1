
// views/WalletView.tsx

import React, { useState } from 'react';
import { User, Transaction } from '../types';
import { ChevronLeftIcon, CreditCardIcon, ArrowDownCircleIcon, ArrowUpCircleIcon, PlusCircleIcon, XIcon, MinusCircleIcon } from '../components/Icons';
import { mockTransactions } from '../data/mockData';

interface WalletViewProps {
  user: User;
  onBack: () => void;
  availableBalance: number;
  onNavigate: (view: 'payment-info') => void;
  userMode?: 'worker' | 'employer';
  employerTransactions?: Transaction[];
  onTransaction?: (amount: number, type: 'deposit' | 'withdraw') => void; // New callback
}

interface TransactionRowProps {
    transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
    // For employers: Deposit/Load is positive, Expense/Payment is negative
    // For workers: Earning/Bonus is positive, Payout is negative
    
    const isMoneyOut = transaction.type === 'payout' || transaction.type === 'expense';
    const amountColor = isMoneyOut ? 'text-red-600' : 'text-green-600';
    const Icon = isMoneyOut ? ArrowDownCircleIcon : ArrowUpCircleIcon;
    const sign = isMoneyOut ? '-' : '+';

    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
                <Icon className={`w-8 h-8 ${amountColor}`} />
                <div>
                    <p className="font-semibold text-gray-800">{transaction.title}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
            </div>
            <p className={`font-bold text-lg ${amountColor}`}>{sign}${Math.abs(transaction.amount).toFixed(2)}</p>
        </div>
    );
};


export const WalletView: React.FC<WalletViewProps> = ({ user, onBack, availableBalance, onNavigate, userMode = 'worker', employerTransactions, onTransaction }) => {
    const [isWeeklyPaymentActive, setIsWeeklyPaymentActive] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'deposit' | 'withdraw'>('deposit');
    const [amount, setAmount] = useState('');

    // Determine which transactions to show
    const transactions = userMode === 'worker' ? mockTransactions : (employerTransactions || []);

    const handleOpenModal = (type: 'deposit' | 'withdraw') => {
        setModalType(type);
        setAmount('');
        setIsModalOpen(true);
    };

    const handleConfirmTransaction = () => {
        const value = parseFloat(amount);
        if (isNaN(value) || value <= 0) {
            alert('Lütfen geçerli bir tutar girin.');
            return;
        }

        if (modalType === 'withdraw' && value > availableBalance) {
            alert('Yetersiz bakiye.');
            return;
        }

        if (onTransaction) {
            onTransaction(value, modalType);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 relative">
            <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 ml-2">Mesai Cüzdanım</h1>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
                {/* Balance Card */}
                <div className={`text-white p-6 rounded-2xl shadow-lg ${userMode === 'employer' ? 'bg-gray-800' : 'bg-gray-900'}`}>
                    <p className="text-sm text-gray-300">{userMode === 'worker' ? 'Çekilebilir Bakiye' : 'Cüzdan Bakiyesi'}</p>
                    <p className="text-4xl font-bold mt-1">${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    
                    <div className="mt-4 flex space-x-3">
                         {userMode === 'employer' ? (
                            <button 
                                onClick={() => handleOpenModal('deposit')}
                                className="flex items-center bg-[#39FF14] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors"
                            >
                                <PlusCircleIcon className="w-4 h-4 mr-2" />
                                Bakiye Yükle
                            </button>
                         ) : (
                             <button 
                                onClick={() => handleOpenModal('withdraw')}
                                className="flex items-center bg-white/20 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-white/30 transition-colors backdrop-blur-sm"
                            >
                                <MinusCircleIcon className="w-4 h-4 mr-2" />
                                Para Çek
                            </button>
                         )}
                    </div>
                </div>

                {/* Payment Options (Worker Only) */}
                {userMode === 'worker' && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Ödeme Seçenekleri</h3>
                        <div className="space-y-3">
                            {/* Weekly Payout */}
                            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-gray-900">Haftalık Otomatik Ödeme</h4>
                                    <p className="text-xs text-gray-600 mt-0.5">Her Pazartesi, komisyonsuz.</p>
                                </div>
                                <button
                                    onClick={() => setIsWeeklyPaymentActive(prev => !prev)}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isWeeklyPaymentActive ? 'bg-[#39FF14]' : 'bg-gray-300'}`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isWeeklyPaymentActive ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Linked Bank Account / Card */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <CreditCardIcon className="w-6 h-6 text-gray-500" />
                        <div>
                            <p className="font-semibold text-gray-800">{userMode === 'worker' ? 'Garanti Bankası' : 'Şirket Kredi Kartı'}</p>
                            <p className="text-sm text-gray-500">{userMode === 'worker' ? 'TRXX...1234' : '**** **** **** 4242'}</p>
                        </div>
                    </div>
                     <button onClick={() => onNavigate('payment-info')} className="text-sm font-bold text-blue-600 hover:underline">Değiştir</button>
                </div>


                {/* Transaction History */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">İşlem Geçmişi</h3>
                    <div className="divide-y divide-gray-100">
                        {transactions.length > 0 ? (
                             transactions.map(tx => <TransactionRow key={tx.id} transaction={tx} />)
                        ) : (
                            <p className="text-gray-500 text-center py-4">Henüz işlem yok.</p>
                        )}
                       
                    </div>
                </div>
            </main>

            {/* Transaction Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center sm:items-center p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl transform transition-all animate-slide-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                {modalType === 'deposit' ? 'Bakiye Yükle' : 'Para Çek'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                <XIcon className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="mb-6">
                             <label className="block text-sm font-medium text-gray-700 mb-2">Tutar</label>
                             <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">$</span>
                                <input 
                                    type="number" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-4 pl-8 pr-4 text-2xl font-bold text-gray-900 focus:outline-none focus:border-[#39FF14] focus:bg-white transition-all"
                                    autoFocus
                                />
                             </div>
                             {modalType === 'withdraw' && (
                                 <p className="text-xs text-gray-500 mt-2">Çekilebilir Bakiyeniz: ${availableBalance.toFixed(2)}</p>
                             )}
                        </div>

                        <button 
                            onClick={handleConfirmTransaction}
                            className="w-full py-4 bg-black text-white font-bold rounded-xl text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                        >
                            {modalType === 'deposit' ? 'Ödemeyi Onayla' : 'Çekim Talebi Oluştur'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
