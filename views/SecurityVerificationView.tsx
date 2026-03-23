// views/SecurityVerificationView.tsx

import React, { useState, useEffect } from 'react'; // Import useEffect
import { User, Certificate } from '../types';
import { ChevronLeftIcon, CheckCircleIcon, ClockIcon, AlertCircleIcon, UploadCloudIcon, ShieldIcon } from '../components/Icons';
import { mockAdliSicilStatus, mockCertificates, mockDriverLicenseStatus, mockResidencePermitStatus, mockDiplomaStatus, mockHealthReportStatus } from '../data/mockData';

interface SecurityVerificationViewProps {
  user: User;
  onBack: () => void;
  onUpdateTrustScore: (score: number) => void; // New: Callback to update trust score in parent
}

export const SecurityVerificationView: React.FC<SecurityVerificationViewProps> = ({ user, onBack, onUpdateTrustScore }) => {
  const [adliSicilStatus, setAdliSicilStatus] = useState<'not-uploaded' | 'pending' | 'verified'>(mockAdliSicilStatus);
  const [driverLicenseStatus, setDriverLicenseStatus] = useState<'not-uploaded' | 'pending' | 'verified'>(mockDriverLicenseStatus);
  const [residencePermitStatus, setResidencePermitStatus] = useState<'not-uploaded' | 'pending' | 'verified'>(mockResidencePermitStatus);
  const [diplomaStatus, setDiplomaStatus] = useState<'not-uploaded' | 'pending' | 'verified'>(mockDiplomaStatus);
  const [healthReportStatus, setHealthReportStatus] = useState<'not-uploaded' | 'pending' | 'verified'>(mockHealthReportStatus);
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);

  const totalSteps = 7;
  // Recalculate completed steps and trust score whenever relevant state changes
  const completedSteps = (user.isVerified ? 1 : 0) +
                         (adliSicilStatus === 'verified' ? 1 : 0) +
                         (driverLicenseStatus === 'verified' ? 1 : 0) +
                         (residencePermitStatus === 'verified' ? 1 : 0) +
                         (diplomaStatus === 'verified' ? 1 : 0) +
                         (healthReportStatus === 'verified' ? 1 : 0) +
                         (certificates.filter(c => c.status === 'verified').length > 0 ? 1 : 0);
  const trustScore = Math.round((completedSteps / totalSteps) * 100);

  // Use useEffect to send the trustScore to the parent component whenever it changes
  useEffect(() => {
    onUpdateTrustScore(trustScore);
  }, [trustScore, onUpdateTrustScore]);

  const handleUploadAdliSicil = () => {
    const fileName = prompt("Lütfen Adli Sicil Kaydı dosya adını girin (örn: AdliSicil.pdf):");
    if (fileName) {
      setAdliSicilStatus('pending');
      alert(`${fileName} yüklendi ve onay bekleniyor.`);
    }
  };
  
  const handleUploadDriverLicense = () => {
    const fileName = prompt("Lütfen Sürücü Belgesi dosya adını girin (örn: ehliyet.pdf):");
    if (fileName) {
        setDriverLicenseStatus('pending');
        alert(`${fileName} yüklendi ve onay bekleniyor.`);
    }
  };

  const handleUploadResidencePermit = () => {
    const fileName = prompt("Lütfen İkametgah Belgesi dosya adını girin (örn: ikametgah.pdf):");
    if (fileName) {
        setResidencePermitStatus('pending');
        alert(`${fileName} yüklendi ve onay bekleniyor.`);
    }
  };

  const handleUploadDiploma = () => {
    const fileName = prompt("Lütfen Diploma veya Mezuniyet Belgesi dosya adını girin (örn: diploma.pdf):");
    if (fileName) {
        setDiplomaStatus('pending');
        alert(`${fileName} yüklendi ve onay bekleniyor.`);
    }
  };
  
  const handleUploadHealthReport = () => {
    const fileName = prompt("Lütfen Sağlık Raporu dosya adını girin (örn: saglik_raporu.pdf):");
    if (fileName) {
        setHealthReportStatus('pending');
        alert(`${fileName} yüklendi ve onay bekleniyor.`);
    }
  };

  const handleAddCertificate = () => {
    const certName = prompt("Lütfen yeni sertifika dosya adını girin (örn: OGGKarti.pdf):");
    if (certName) {
      setCertificates([...certificates, { id: Date.now().toString(), name: certName, status: 'pending' }]);
      alert(`${certName} yüklendi ve onay bekleniyor.`);
    }
  };

  const getStatusIcon = (status: 'verified' | 'pending' | 'not-uploaded') => {
    switch (status) {
      case 'verified':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
      case 'not-uploaded':
      default:
        return <AlertCircleIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: 'verified' | 'pending' | 'not-uploaded') => {
    switch (status) {
      case 'verified':
        return <span className="text-green-600 font-medium">✓ Onaylandı</span>;
      case 'pending':
        return <span className="text-gray-600 font-medium">Onay Bekliyor</span>;
      case 'not-uploaded':
      default:
        return <span className="text-yellow-600 font-medium">! Yüklenmedi</span>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto no-scrollbar">
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-2">Güvenlik ve Doğrulama</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Trust Score & Description */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-bold text-gray-800">Güven Puanınız: {trustScore}%</p>
            <div className="p-1.5 rounded-full" style={{ backgroundColor: 'var(--mesai-green-light)' }}>
              <ShieldIcon className="w-5 h-5" style={{ color: 'var(--mesai-green)' }} />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-[#39FF14] h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${trustScore}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mt-3">
            Doğrulama adımlarını tamamlayarak 'Doğrulanmış Kullanıcı' rozeti kazanın. {' '}
            <span className="font-semibold text-[#39FF14]">Doğrulanmış kullanıcılar işverenler tarafından %80 daha fazla tercih edilir.</span>
          </p>
        </div>

        {/* Verification Steps */}
        <div className="space-y-4">
          {/* Step 1: ID Verification */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon('verified')}
              <p className="font-semibold text-gray-800">Aşama 1: Kimlik Doğrulama (Zorunlu)</p>
              {getStatusText('verified')}
            </div>
            <p className="text-sm text-gray-600 ml-7">Kimlik bilgileriniz (Ad, Soyad, TC No) API üzerinden başarıyla doğrulandı.</p>
          </div>

          {/* Step 2: Criminal Record */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon(adliSicilStatus)}
              <p className="font-semibold text-gray-800">Aşama 2: Adli Sicil Kaydı (Önemli)</p>
            </div>
            <p className="text-sm text-gray-600 ml-7 mb-3">Güvenlik, şoförlük gibi hassas işler için bu belge gereklidir. e-Devlet üzerinden aldığınız güncel (son 1 ay) 'Adli Sicil Kaydı' belgenizi .pdf formatında yükleyin.</p>
            {adliSicilStatus === 'not-uploaded' && (
              <button
                onClick={handleUploadAdliSicil}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <UploadCloudIcon className="w-5 h-5" />
                <span>Dosya Yükle</span>
              </button>
            )}
            {adliSicilStatus === 'pending' && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 text-yellow-800 font-semibold rounded-lg text-sm">
                <ClockIcon className="w-5 h-5" />
                <span>Onay Bekliyor</span>
              </div>
            )}
            {adliSicilStatus === 'verified' && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-800 font-semibold rounded-lg text-sm">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Onaylandı</span>
              </div>
            )}
          </div>

          {/* Step 3: Driver's License */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon(driverLicenseStatus)}
              <p className="font-semibold text-gray-800">Aşama 3: Sürücü Belgesi (Varsa)</p>
            </div>
            <p className="text-sm text-gray-600 ml-7 mb-3">Şoförlük veya vale gibi işler için ehliyetinizi yükleyerek şansınızı artırın.</p>
            {driverLicenseStatus === 'not-uploaded' && (
              <button
                onClick={handleUploadDriverLicense}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <UploadCloudIcon className="w-5 h-5" />
                <span>Dosya Yükle</span>
              </button>
            )}
            {driverLicenseStatus === 'pending' && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 text-yellow-800 font-semibold rounded-lg text-sm">
                <ClockIcon className="w-5 h-5" />
                <span>Onay Bekliyor</span>
              </div>
            )}
            {driverLicenseStatus === 'verified' && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-800 font-semibold rounded-lg text-sm">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Onaylandı</span>
              </div>
            )}
          </div>

          {/* Step 4: Residence Permit */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon(residencePermitStatus)}
              <p className="font-semibold text-gray-800">Aşama 4: İkametgah Belgesi (Önemli)</p>
            </div>
            <p className="text-sm text-gray-600 ml-7 mb-3">İşverenlerin adresinize yakın işleri size daha kolay sunabilmesi için e-Devlet'ten aldığınız İkametgah Belgenizi yükleyin.</p>
            {residencePermitStatus === 'not-uploaded' && (
              <button
                onClick={handleUploadResidencePermit}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <UploadCloudIcon className="w-5 h-5" />
                <span>Dosya Yükle</span>
              </button>
            )}
            {residencePermitStatus === 'pending' && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 text-yellow-800 font-semibold rounded-lg text-sm">
                <ClockIcon className="w-5 h-5" />
                <span>Onay Bekliyor</span>
              </div>
            )}
            {residencePermitStatus === 'verified' && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-800 font-semibold rounded-lg text-sm">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Onaylandı</span>
              </div>
            )}
          </div>

          {/* Step 5: Diploma */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon(diplomaStatus)}
              <p className="font-semibold text-gray-800">Aşama 5: Diploma veya Mezuniyet Belgesi</p>
            </div>
            <p className="text-sm text-gray-600 ml-7 mb-3">Eğitim seviyenizi doğrulamak, işverenlerin güvenini artırır. e-Devlet'ten veya okulunuzdan aldığınız belgeyi yükleyebilirsiniz.</p>
            {diplomaStatus === 'not-uploaded' && (
              <button
                onClick={handleUploadDiploma}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <UploadCloudIcon className="w-5 h-5" />
                <span>Dosya Yükle</span>
              </button>
            )}
            {diplomaStatus === 'pending' && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 text-yellow-800 font-semibold rounded-lg text-sm">
                <ClockIcon className="w-5 h-5" />
                <span>Onay Bekliyor</span>
              </div>
            )}
            {diplomaStatus === 'verified' && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-800 font-semibold rounded-lg text-sm">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Onaylandı</span>
              </div>
            )}
          </div>

          {/* Step 6: Health Report */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon(healthReportStatus)}
              <p className="font-semibold text-gray-800">Aşama 6: Sağlık Raporu (Opsiyonel)</p>
            </div>
            <p className="text-sm text-gray-600 ml-7 mb-3">Gıda, sağlık veya çocuk bakımı gibi işler için sağlık raporu talep edilebilir. Varsa yükleyerek profilinizi güçlendirin.</p>
            {healthReportStatus === 'not-uploaded' && (
              <button
                onClick={handleUploadHealthReport}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <UploadCloudIcon className="w-5 h-5" />
                <span>Dosya Yükle</span>
              </button>
            )}
            {healthReportStatus === 'pending' && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 text-yellow-800 font-semibold rounded-lg text-sm">
                <ClockIcon className="w-5 h-5" />
                <span>Onay Bekliyor</span>
              </div>
            )}
            {healthReportStatus === 'verified' && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-800 font-semibold rounded-lg text-sm">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Onaylandı</span>
              </div>
            )}
          </div>

          {/* Step 7: Professional Qualifications */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              {certificates.filter(c => c.status === 'verified').length > 0 ? getStatusIcon('verified') : getStatusIcon('not-uploaded')}
              <p className="font-semibold text-gray-800">Aşama 7: Mesleki Yeterlilik ve Sertifikalar (Opsiyonel)</p>
            </div>
            <p className="text-sm text-gray-600 ml-7 mb-3">Sertifikalarınızı yükleyerek o kategorilerdeki işlerde öncelik kazanın.</p>
            {certificates.map(cert => (
              <div key={cert.id} className="flex items-center justify-between text-sm text-gray-700 px-3 py-2 bg-gray-50 rounded-lg mb-2">
                <span>{cert.name}</span>
                {getStatusText(cert.status)}
              </div>
            ))}
            <button
              onClick={handleAddCertificate}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm mt-2"
            >
              <UploadCloudIcon className="w-5 h-5" />
              <span>Yeni Sertifika Ekle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};