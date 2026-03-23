// views/LoginScreen.tsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BriefcaseIcon, SmartphoneIcon, UserIcon, FileTextIcon, MailIcon, MapPinIcon } from '../components/Icons';

type LoginStep = 'phone' | 'otp' | 'role-selection' | 'register-details' | 'company-details';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  initialStep?: LoginStep;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, initialStep }) => {
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [tckn, setTckn] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [currentStep, setCurrentStep] = useState<LoginStep>(initialStep || 'phone');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isNewUserFlag, setIsNewUserFlag] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'worker' | 'employer' | null>(null);

  // New state for company details
  const [companyDetails, setCompanyDetails] = useState({
      companyName: '',
      taxNumber: '',
      companyEmail: '',
      companyAddress: ''
  });


  const simulateCheckRegistration = useCallback((phoneNumber: string) => {
      // Simulate a backend check: if phone number is '5555555555', it's an existing user.
      // Otherwise, it's a new user requiring detailed registration.
      return phoneNumber !== '5555555555'; // Returns true if new user, false if existing
  }, []);


  const handleSendOTP = () => {
    if (phone.length === 10) {
      // In a real app, you would send OTP to backend here
      setCurrentStep('otp'); // Always go to OTP after phone number
    }
  };

  const verifyAndProceed = useCallback(() => {
    const isNew = simulateCheckRegistration(phone);
    setIsNewUserFlag(isNew);
    if (isNew) {
        setCurrentStep('role-selection'); // Go to role selection if new user
    } else {
        onLoginSuccess(); // Go to main app if existing user
    }
  }, [phone, simulateCheckRegistration, onLoginSuccess]);

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
      
      // Auto-verify when all filled
      if (newOtp.every(digit => digit !== '') && index === 5) {
        // Simulate OTP verification success
        setTimeout(() => {
          verifyAndProceed();
        }, 500); // Simulate network delay for OTP verification
      }
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
          otpRefs.current[index - 1]?.focus();
      }
  };

  const handleTcknChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 11) {
        setTckn(value);
    }
  };

  const handleRegisterDetailsSubmit = () => {
      // Basic validation for detailed registration fields
      if (fullName.trim().length < 3 || tckn.length !== 11 || !email.includes('@') || !dob || !gender) {
          alert('Lütfen tüm kayıt bilgilerini eksiksiz ve doğru bir şekilde girin.');
          return;
      }
      if (selectedRole === 'employer') {
        setCurrentStep('company-details');
      } else {
        onLoginSuccess(); // Complete login for worker
      }
  };

  const handleCompanyDetailsSubmit = () => {
      // Basic validation for company details
      if (companyDetails.companyName.trim().length < 2 || companyDetails.taxNumber.length !== 10 || !companyDetails.companyEmail.includes('@') || companyDetails.companyAddress.trim().length < 5) {
          alert('Lütfen tüm firma bilgilerini eksiksiz ve doğru bir şekilde girin.');
          return;
      }
      onLoginSuccess();
  };


  // Focus the first OTP input when OTP screen appears
  useEffect(() => {
      if (currentStep === 'otp') {
          otpRefs.current[0]?.focus();
      }
  }, [currentStep]);
  
  if (currentStep === 'role-selection') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6 text-gray-800">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-2">Mesai'ye Hoş Geldiniz!</h1>
          <p className="text-[var(--muted-foreground)] mb-10">
            Uygulamayı hangi amaçla kullanacağınızı seçin.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => { setSelectedRole('worker'); setCurrentStep('register-details'); }}
              className="w-full p-6 bg-gray-50 border-2 border-gray-200 rounded-2xl text-left flex items-center space-x-4 transition-all duration-300 hover:border-[var(--mesai-green)] hover:bg-white hover:ring-2 hover:ring-[var(--mesai-green)]/20"
            >
              <div className="p-3 bg-green-100 rounded-lg">
                <UserIcon className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">İş Arıyorum</h3>
                <p className="text-sm text-gray-600">Yakınımdaki günlük işleri bulmak için.</p>
              </div>
            </button>

            <button
              onClick={() => { setSelectedRole('employer'); setCurrentStep('register-details'); }}
              className="w-full p-6 bg-gray-50 border-2 border-gray-200 rounded-2xl text-left flex items-center space-x-4 transition-all duration-300 hover:border-[var(--mesai-green)] hover:bg-white hover:ring-2 hover:ring-[var(--mesai-green)]/20"
            >
              <div className="p-3 bg-blue-100 rounded-lg">
                <BriefcaseIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Çalışan Arıyorum</h3>
                <p className="text-sm text-gray-600">Kısa süreli işlerim için güvenilir çalışanlar bulmak için.</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'otp') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6 text-gray-800">
        <div className="w-full max-w-sm">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: 'var(--mesai-green-light)' }}>
              <SmartphoneIcon className="w-8 h-8" style={{ color: 'var(--mesai-green)' }} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Telefonunu Doğrula</h1>
            <p className="text-[var(--muted-foreground)]">
              Telefonuna gönderilen 6 haneli kodu gir:
              <br />
              <span className="text-[var(--foreground)] font-semibold">{`+90 ${phone}`}</span>
            </p>
          </div>

          <div className="flex gap-2 justify-center mb-8">
            {otp.map((digit, index) => (
              // Fix: Corrected ref assignment to ensure the callback returns void.
              <input
                key={index}
                id={`otp-${index}`}
                ref={el => { otpRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleOTPKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold border-2 border-[var(--border)] rounded-2xl focus:outline-none focus:border-[var(--mesai-green)] transition-colors bg-white"
                style={{
                   boxShadow: `0 0 0 1px ${digit ? 'var(--mesai-green)' : 'transparent'}`,
                   borderColor: digit ? 'var(--mesai-green)' : 'var(--border)'
                }}
              />
            ))}
          </div>

          <button
            onClick={verifyAndProceed}
            className="w-full h-14 rounded-2xl bg-[var(--mesai-green)] text-black font-bold text-lg transition-colors hover:bg-opacity-90 shadow-md"
            disabled={!otp.every(digit => digit !== '')}
          >
            Doğrula ve Devam Et
          </button>

          <button className="w-full mt-4 text-[var(--muted-foreground)] text-sm hover:text-[var(--mesai-green)] transition-colors">
            Kodu almadın mı? <span className="font-semibold">Yeniden Gönder</span>
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'register-details') {
      return (
          <div className="flex flex-col items-center justify-center h-full bg-white px-6 text-gray-800 overflow-y-auto no-scrollbar">
              <div className="w-full max-w-sm py-8">
                  <div className="mb-12 text-center">
                      <h1 className="text-2xl font-bold mb-2">{selectedRole === 'employer' ? 'Yetkili Bilgileri' : 'Profilini Tamamla'}</h1>
                      <p className="text-[var(--muted-foreground)]">{selectedRole === 'employer' ? 'Şirketiniz adına işlem yapacak yetkilinin bilgilerini girin.' : 'Uygulamayı kullanmaya başlamak için bilgilerinizi girin:'}</p>
                  </div>

                  <div className="mb-6 space-y-4">
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">Ad Soyad</label>
                          <input
                              type="text"
                              placeholder="Adınız Soyadınız"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full h-14 rounded-2xl bg-[var(--input-background)] border border-[var(--border)] px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--mesai-green)] transition-colors"
                              style={{
                                  boxShadow: `0 0 0 1px ${fullName.trim().length > 2 ? 'var(--mesai-green)' : 'transparent'}`,
                                  borderColor: fullName.trim().length > 2 ? 'var(--mesai-green)' : 'var(--border)'
                              }}
                          />
                      </div>
                       <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">T.C. Kimlik Numarası</label>
                          <input
                              type="tel"
                              placeholder="11 haneli T.C. Kimlik Numaranız"
                              value={tckn}
                              onChange={handleTcknChange}
                              maxLength={11}
                              className="w-full h-14 rounded-2xl bg-[var(--input-background)] border border-[var(--border)] px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--mesai-green)] transition-colors"
                              style={{
                                  boxShadow: `0 0 0 1px ${tckn.length === 11 ? 'var(--mesai-green)' : 'transparent'}`,
                                  borderColor: tckn.length === 11 ? 'var(--mesai-green)' : 'var(--border)'
                              }}
                          />
                      </div>
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">E-posta</label>
                          <input
                              type="email"
                              placeholder="example@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full h-14 rounded-2xl bg-[var(--input-background)] border border-[var(--border)] px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--mesai-green)] transition-colors"
                              style={{
                                  boxShadow: `0 0 0 1px ${email.includes('@') && email.includes('.') ? 'var(--mesai-green)' : 'transparent'}`,
                                  borderColor: email.includes('@') && email.includes('.') ? 'var(--mesai-green)' : 'var(--border)'
                              }}
                          />
                      </div>
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">Doğum Tarihi</label>
                          <input
                              type="date"
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                              className="w-full h-14 rounded-2xl bg-[var(--input-background)] border border-[var(--border)] px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--mesai-green)] transition-colors"
                              style={{
                                  boxShadow: `0 0 0 1px ${dob ? 'var(--mesai-green)' : 'transparent'}`,
                                  borderColor: dob ? 'var(--mesai-green)' : 'var(--border)'
                              }}
                          />
                      </div>
                      <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">Cinsiyet</label>
                          <select
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              className="w-full h-14 rounded-2xl bg-[var(--input-background)] border border-[var(--border)] px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--mesai-green)] transition-colors appearance-none"
                              style={{
                                  boxShadow: `0 0 0 1px ${gender ? 'var(--mesai-green)' : 'transparent'}`,
                                  borderColor: gender ? 'var(--mesai-green)' : 'var(--border)'
                              }}
                          >
                              <option value="" disabled>Seçiniz</option>
                              <option value="male">Erkek</option>
                              <option value="female">Kadın</option>
                              <option value="other">Diğer</option>
                          </select>
                      </div>
                  </div>

                  <button
                      onClick={handleRegisterDetailsSubmit}
                      className="w-full h-14 rounded-2xl bg-[var(--mesai-green)] text-black font-bold text-lg transition-colors hover:bg-opacity-90 shadow-md"
                      disabled={!fullName.trim() || tckn.length !== 11 || !email.includes('@') || !dob || !gender}
                  >
                     {selectedRole === 'employer' ? 'Devam Et' : 'Kaydı Tamamla'}
                  </button>
              </div>
          </div>
      );
  }

  if (currentStep === 'company-details') {
    const isFormValid = companyDetails.companyName.trim().length >= 2 &&
                        companyDetails.taxNumber.length === 10 &&
                        companyDetails.companyEmail.includes('@') &&
                        companyDetails.companyAddress.trim().length >= 5;

    return (
        <div className="flex flex-col items-center justify-center h-full bg-white px-6 text-gray-800 overflow-y-auto no-scrollbar">
            <div className="w-full max-w-sm py-8">
                <div className="mb-12 text-center">
                    <h1 className="text-2xl font-bold mb-2">Firma Bilgileri</h1>
                    <p className="text-[var(--muted-foreground)]">İlan yayınlamak için firma bilgilerinizi girin:</p>
                </div>

                <div className="mb-6 space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Firma Ünvanı</label>
                        <input
                            type="text"
                            placeholder="Şirketinizin tam adı"
                            value={companyDetails.companyName}
                            onChange={(e) => setCompanyDetails({...companyDetails, companyName: e.target.value})}
                            className="w-full h-14 rounded-2xl bg-[var(--input-background)] border border-[var(--border)] px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--mesai-green)] transition-colors"
                        />
                    </div>
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Vergi Numarası</label>
                        <input
                            type="tel"
                            placeholder="10 haneli Vergi Kimlik Numaranız"
                            value={companyDetails.taxNumber}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                if (value.length <= 10) {
                                    setCompanyDetails({...companyDetails, taxNumber: value});
                                }
                            }}
                            maxLength={10}
                            className="w-full h-14 rounded-2xl bg-[var(--input-background)] border border-[var(--border)] px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--mesai-green)] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Firma E-postası</label>
                        <input
                            type="email"
                            placeholder="iletisim@sirket.com"
                            value={companyDetails.companyEmail}
                            onChange={(e) => setCompanyDetails({...companyDetails, companyEmail: e.target.value})}
                            className="w-full h-14 rounded-2xl bg-[var(--input-background)] border border-[var(--border)] px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--mesai-green)] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Firma Adresi</label>
                        <textarea
                            rows={3}
                            placeholder="Açık adres"
                            value={companyDetails.companyAddress}
                            onChange={(e) => setCompanyDetails({...companyDetails, companyAddress: e.target.value})}
                            className="w-full rounded-2xl bg-[var(--input-background)] border border-[var(--border)] p-4 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--mesai-green)] transition-colors resize-none"
                        />
                    </div>
                </div>

                <button
                    onClick={handleCompanyDetailsSubmit}
                    className="w-full h-14 rounded-2xl bg-[var(--mesai-green)] text-black font-bold text-lg transition-colors hover:bg-opacity-90 shadow-md"
                    disabled={!isFormValid}
                >
                    Kaydı Tamamla ve Başla
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white px-6 text-gray-800">
      <div className="w-full max-w-sm">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-5xl font-poppins font-bold lowercase" style={{ color: 'var(--mesai-green)' }}>mesai.</h1>
          <p className="text-[var(--muted-foreground)]">Yakınındaki günlük işleri bul</p>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Telefon Numarası</label>
          <div className="flex gap-2">
            <div className="flex items-center justify-center w-16 h-14 bg-[var(--input-background)] rounded-2xl border border-[var(--border)] text-gray-700">
              <span className="text-lg">🇹🇷</span>
            </div>
            <input
              type="tel"
              placeholder="5XX XXX XX XX"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
              className="flex-1 h-14 rounded-2xl bg-[var(--input-background)] border border-[var(--border)] px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--mesai-green)] transition-colors"
              style={{
                boxShadow: `0 0 0 1px ${phone.length === 10 ? 'var(--mesai-green)' : 'transparent'}`,
                borderColor: phone.length === 10 ? 'var(--mesai-green)' : 'var(--border)'
              }}
            />
          </div>
        </div>

        <button
          onClick={handleSendOTP}
          className="w-full h-14 rounded-2xl bg-[var(--mesai-green)] text-black font-bold text-lg transition-colors hover:bg-opacity-90 shadow-md"
          disabled={phone.length < 10}
        >
          Doğrulama Kodu Gönder
        </button>

        <p className="mt-6 text-center text-[var(--muted-foreground)] text-xs">
          Devam ederek Hizmet Şartları ve Gizlilik Politikamızı kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  );
};