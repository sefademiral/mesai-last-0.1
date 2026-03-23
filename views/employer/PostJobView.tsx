
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Job } from '../../types';
import { 
    ChevronLeftIcon, 
    ChevronRightIcon, 
    BriefcaseIcon, 
    TagIcon, 
    FileTextIcon, 
    MapPinIcon, 
    CalendarIcon, 
    ClockIcon, 
    DollarSignIcon,
    XIcon,
    PlusCircleIcon,
    CrosshairIcon,
    AlertCircleIcon,
    CheckCircleIcon,
    CreditCardIcon,
    UploadCloudIcon
} from '../../components/Icons';
import { categories as defaultCategories } from '../../data/mockData';

interface PostJobViewProps {
    onBack: () => void;
    onPostJob: (newJob: Omit<Job, 'id' | 'employer' | 'employerRating' | 'distance' | 'employerAvatarUrl'> & { id?: string, status?: 'active' | 'pending' | 'completed' }) => void;
    jobToEdit?: Job | null;
}

// Reusable components
const FormSection = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="bg-[var(--employer-card)] p-4 rounded-2xl border border-[var(--employer-border)] shadow-sm">
        <h2 className="text-lg font-bold text-[var(--employer-text-primary)] mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const InputGroup = ({ children, className }: { children?: React.ReactNode, className?: string }) => (
    <div className={`relative flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg transition-all duration-300 focus-within:border-[var(--employer-primary)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--employer-primary)]/20 ${className}`}>
        {children}
    </div>
);

const StepIndicator = ({ step, title, isActive, isCompleted }: { step: number; title: string; isActive: boolean; isCompleted: boolean }) => (
    <div className="flex flex-col items-center flex-1">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 z-10 ${isCompleted ? 'bg-[var(--employer-primary)] text-black' : isActive ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {isCompleted ? <CheckCircleIcon className="w-5 h-5" /> : step}
        </div>
        <div className={`mt-1 transition-colors duration-300 text-xs text-center ${isActive || isCompleted ? 'text-gray-800 font-bold' : 'text-gray-400 font-medium'}`}>
            {title}
        </div>
    </div>
);

export const PostJobView: React.FC<PostJobViewProps> = ({ onBack, onPostJob, jobToEdit }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [jobDetails, setJobDetails] = useState({
        title: '',
        category: '',
        description: '',
        payRate: '',
        payType: 'daily' as 'daily' | 'hourly',
        date: new Date().toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        location: { address: '', lat: 0, lng: 0 },
        requirements: [] as string[],
        jobImage: null as string | null,
    });

    const [newRequirement, setNewRequirement] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const [errorPopup, setErrorPopup] = useState({ show: false, message: '' });

    // Populate form if editing
    useEffect(() => {
        if (jobToEdit) {
            setJobDetails({
                title: jobToEdit.title,
                category: jobToEdit.category,
                description: jobToEdit.description,
                payRate: jobToEdit.payRate.replace(/[^0-9.]/g, ''),
                payType: jobToEdit.payType,
                date: jobToEdit.date,
                startTime: jobToEdit.shiftTime.split(' - ')[0] || '',
                endTime: jobToEdit.shiftTime.split(' - ')[1] || '',
                location: jobToEdit.location,
                requirements: jobToEdit.requirements || [],
                jobImage: null,
            });
        }
    }, [jobToEdit]);

    // Close category dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
                setIsCategoryDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    const getValidationError = (): string | null => {
        const { title, category, description, payRate, date, startTime, endTime, location } = jobDetails;
        
        if (currentStep === 1) {
            if (title.trim().length < 4) return "Lütfen bir ilan başlığı girin (en az 4 karakter).";
            if (category.trim().length < 3) return "Lütfen bir kategori seçin veya girin.";
            if (description.trim().length < 10) return "Lütfen en az 10 karakterlik bir iş tanımı girin.";
        }

        if (currentStep === 2) {
            if (location.address.trim().length < 5) return "Lütfen geçerli bir adres girin.";
            if (!date.trim()) return "Lütfen bir tarih seçin.";
            if (!startTime.trim()) return "Lütfen bir başlangıç saati seçin.";
            if (!endTime.trim()) return "Lütfen bir bitiş saati seçin.";
        }

        if (currentStep === 3) {
            if (payRate.trim().length === 0 || isNaN(Number(payRate)) || Number(payRate) <= 0) {
                return "Lütfen geçerli bir ücret girin.";
            }
        }

        return null;
    };

    const showValidationError = (message: string) => {
        setErrorPopup({ show: true, message: message });
        setTimeout(() => setErrorPopup({ show: false, message: '' }), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setJobDetails(prev => ({ ...prev, location: { ...prev.location, [name]: value } }));
    };

    const handleGetCurrentLocation = () => {
        setJobDetails(prev => ({ ...prev, location: { ...prev.location, address: 'Beachfront Road, Sunny Isles' } }));
    };

    const handleAddRequirement = () => {
        if (newRequirement.trim() && !jobDetails.requirements.includes(newRequirement.trim())) {
            setJobDetails(prev => ({ ...prev, requirements: [...prev.requirements, newRequirement.trim()] }));
            setNewRequirement('');
        }
    };
    
    const handleRemoveRequirement = (reqToRemove: string) => {
        setJobDetails(prev => ({ ...prev, requirements: prev.requirements.filter(r => r !== reqToRemove) }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setJobDetails(prev => ({ ...prev, jobImage: imageUrl }));
        }
    };

    const handleRemoveImage = () => {
         setJobDetails(prev => ({ ...prev, jobImage: null }));
    };
    
    const calculateCosts = () => {
        const workerPay = parseFloat(jobDetails.payRate) || 0;
        const serviceFee = workerPay * 0.10;
        const total = workerPay + serviceFee;
        return { workerPay, serviceFee, total };
    };

    const handleNext = () => {
        const errorMessage = getValidationError();
        if (errorMessage) {
            showValidationError(errorMessage);
            return;
        }
        setCurrentStep(prev => prev + 1);
    };

    const handleSubmit = () => {
        const jobToPost = {
            ...jobDetails,
            shiftTime: `${jobDetails.startTime} - ${jobDetails.endTime}`,
            id: jobToEdit ? jobToEdit.id : undefined,
            status: 'pending' as const,
        };
        const { startTime, endTime, jobImage, ...finalJob } = jobToPost;
        onPostJob(finalJob);
    };

    const filteredCategories = useMemo(() => {
        const searchLower = categorySearch.toLowerCase();
        return defaultCategories.filter(c => c !== 'All' && c.toLowerCase().includes(searchLower));
    }, [categorySearch]);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <FormSection title="İş Detayları">
                        <InputGroup>
                            <span className="pl-3 pr-2 text-gray-400"><BriefcaseIcon className="w-5 h-5" /></span>
                            <input type="text" name="title" value={jobDetails.title} onChange={handleChange} placeholder="İlan Başlığı (Örn: Etkinlik için Garson)" className="flex-1 bg-transparent h-12 pr-4 focus:outline-none" />
                        </InputGroup>
                        <div className="relative" ref={categoryDropdownRef}>
                            <InputGroup>
                                <span className="pl-3 pr-2 text-gray-400"><TagIcon className="w-5 h-5" /></span>
                                <input
                                    type="text"
                                    value={jobDetails.category}
                                    onChange={(e) => {
                                        setCategorySearch(e.target.value);
                                        setJobDetails(prev => ({ ...prev, category: e.target.value }));
                                        if (!isCategoryDropdownOpen) setIsCategoryDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsCategoryDropdownOpen(true)}
                                    placeholder="Kategori seç veya yaz"
                                    className="flex-1 bg-transparent h-12 pr-4 focus:outline-none"
                                />
                            </InputGroup>
                            {isCategoryDropdownOpen && (
                                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto no-scrollbar">
                                    <div className="p-2">
                                        {filteredCategories.map(c => (
                                            <button key={c} type="button" onClick={() => {
                                                setJobDetails(prev => ({ ...prev, category: c }));
                                                setCategorySearch(c);
                                                setIsCategoryDropdownOpen(false);
                                            }} className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium">
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <InputGroup className="items-start py-2">
                            <span className="pl-3 pr-2 pt-3 text-gray-400"><FileTextIcon className="w-5 h-5" /></span>
                            <textarea name="description" value={jobDetails.description} onChange={handleChange} rows={4} placeholder="İşin gerekliliklerini, görevleri ve beklentilerinizi detaylıca açıklayın..." className="flex-1 bg-transparent pr-4 focus:outline-none resize-none" />
                        </InputGroup>

                        <div className="mt-2">
                            <label className="block text-sm font-medium text-[var(--employer-text-secondary)] mb-2">
                                İlan Görseli <span className="text-gray-400 font-normal">(Opsiyonel)</span>
                            </label>
                            {jobDetails.jobImage ? (
                                <div className="relative w-full h-40 rounded-xl overflow-hidden group border border-gray-200">
                                    <img src={jobDetails.jobImage} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                                    >
                                        <XIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-[var(--employer-primary)] transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloudIcon className="w-8 h-8 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500 font-medium">Görsel Yüklemek için Tıkla</p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG (Max 5MB)</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>
                            )}
                        </div>
                    </FormSection>
                );
            case 2:
                return (
                    <FormSection title="Lojistik">
                        <InputGroup>
                            <span className="pl-3 pr-2 text-gray-400"><MapPinIcon className="w-5 h-5" /></span>
                            <input type="text" name="address" value={jobDetails.location.address} onChange={handleLocationChange} placeholder="Tam adresi girin" className="flex-1 bg-transparent h-12 pr-4 focus:outline-none" />
                            <button onClick={handleGetCurrentLocation} className="p-3 text-gray-500 hover:text-[var(--employer-primary)]"><CrosshairIcon className="w-5 h-5" /></button>
                        </InputGroup>
                        <InputGroup>
                            <span className="pl-3 pr-2 text-gray-400"><CalendarIcon className="w-5 h-5" /></span>
                            <input type="date" name="date" value={jobDetails.date} onChange={handleChange} className="flex-1 bg-transparent h-12 pr-4 focus:outline-none text-gray-700" />
                        </InputGroup>
                        <div className="grid grid-cols-2 gap-4">
                            <InputGroup>
                                <span className="pl-3 pr-2 text-gray-400"><ClockIcon className="w-5 h-5" /></span>
                                <input type="time" name="startTime" value={jobDetails.startTime} onChange={handleChange} className="flex-1 bg-transparent h-12 pr-4 focus:outline-none text-gray-700" />
                            </InputGroup>
                            <InputGroup>
                                <span className="pl-3 pr-2 text-gray-400"><ClockIcon className="w-5 h-5" /></span>
                                <input type="time" name="endTime" value={jobDetails.endTime} onChange={handleChange} className="flex-1 bg-transparent h-12 pr-4 focus:outline-none text-gray-700" />
                            </InputGroup>
                        </div>
                    </FormSection>
                );
            case 3:
                return (
                    <FormSection title="Ödeme & Gereksinimler">
                        <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-lg">
                            <button type="button" onClick={() => setJobDetails(prev => ({ ...prev, payType: 'daily' }))} className={`py-2 px-2 rounded-md transition-all duration-200 text-sm font-bold ${jobDetails.payType === 'daily' ? 'bg-white shadow text-black' : 'text-gray-500'}`}>Günlük</button>
                            <button type="button" onClick={() => setJobDetails(prev => ({ ...prev, payType: 'hourly' }))} className={`py-2 px-2 rounded-md transition-all duration-200 text-sm font-bold ${jobDetails.payType === 'hourly' ? 'bg-white shadow text-black' : 'text-gray-500'}`}>Saatlik</button>
                        </div>
                        <InputGroup>
                            <span className="pl-3 pr-2 text-gray-400"><DollarSignIcon className="w-5 h-5" /></span>
                            <input type="number" name="payRate" value={jobDetails.payRate} onChange={handleChange} placeholder={jobDetails.payType === 'daily' ? 'Günlük Ücret' : 'Saatlik Ücret'} className="flex-1 bg-transparent h-12 pr-4 focus:outline-none" />
                            <span className="pr-4 font-semibold text-gray-500">₺</span>
                        </InputGroup>
                        <div>
                            <div className="flex flex-wrap gap-2 mb-3 empty:mb-0">
                                {jobDetails.requirements.map(req => (
                                    <div key={req} className="flex items-center bg-[var(--employer-blue-soft)] text-blue-800 text-sm font-semibold pl-3 pr-2 py-1 rounded-full">
                                        {req}
                                        <button type="button" onClick={() => handleRemoveRequirement(req)} className="ml-1.5 p-0.5 rounded-full hover:bg-blue-200">
                                            <XIcon className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <InputGroup>
                                <input type="text" value={newRequirement} onChange={(e) => setNewRequirement(e.target.value)} placeholder="Gereksinim ekle (örn: SRC Belgesi)" onKeyPress={(e) => e.key === 'Enter' && handleAddRequirement()} className="flex-1 bg-transparent h-12 pl-4 focus:outline-none" />
                                <button type="button" onClick={handleAddRequirement} className="p-3 text-gray-500 hover:text-[var(--employer-primary)]"><PlusCircleIcon className="w-6 h-6" /></button>
                            </InputGroup>
                        </div>
                    </FormSection>
                );
            case 4:
                const { workerPay, serviceFee, total } = calculateCosts();
                return (
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3 overflow-hidden">
                            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">İlan Özeti</h3>
                            
                            {jobDetails.jobImage && (
                                <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                                    <img src={jobDetails.jobImage} alt="Job" className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div>
                                <h4 className="font-bold text-lg text-gray-800">{jobDetails.title}</h4>
                                <p className="text-sm text-gray-500">{jobDetails.category}</p>
                            </div>
                            <div className="flex items-start space-x-2 text-sm text-gray-600">
                                <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{jobDetails.location.address}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <CalendarIcon className="w-4 h-4" />
                                    <span>{jobDetails.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>{jobDetails.startTime} - {jobDetails.endTime}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--employer-green-soft)] p-4 rounded-2xl border border-[var(--employer-primary)] border-opacity-30 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                                <DollarSignIcon className="w-5 h-5 mr-2" />
                                Ödeme Detayları
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-700">
                                    <span>İşçi Ücreti ({jobDetails.payType === 'daily' ? 'Günlük' : 'Saatlik'})</span>
                                    <span className="font-medium">₺{workerPay.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Hizmet Bedeli (%10)</span>
                                    <span className="font-medium">₺{serviceFee.toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-black/10 my-2"></div>
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Toplam Ödenecek</span>
                                    <span>₺{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                         <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <CreditCardIcon className="w-6 h-6 text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-sm">Şirket Kredi Kartı</p>
                                    <p className="text-xs text-gray-500">**** 4242</p>
                                </div>
                            </div>
                            <button className="text-blue-600 text-xs font-bold hover:underline">Değiştir</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full bg-[var(--employer-bg)] relative">
            <header className="flex items-center p-4 bg-[var(--employer-card)] sticky top-0 z-20 border-b border-[var(--employer-border)]">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeftIcon className="w-6 h-6 text-[var(--employer-text-primary)]" />
                </button>
                <h1 className="text-xl font-bold text-[var(--employer-text-primary)] ml-2">
                    {jobToEdit ? 'İlanı Düzenle' : 'Yeni İlan Oluştur'}
                </h1>
            </header>

            <div className={`fixed top-20 left-4 right-4 max-w-sm mx-auto z-30 transition-all duration-300 ease-out ${errorPopup.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                {errorPopup.show && (
                    <div className="bg-[var(--employer-card)] p-4 rounded-xl shadow-lg border-l-4 border-red-500 flex items-center space-x-3">
                        <AlertCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <p className="flex-1 font-semibold text-[var(--employer-text-primary)]">{errorPopup.message}</p>
                        <button onClick={() => setErrorPopup({ show: false, message: '' })} className="p-1 -mr-1 rounded-full hover:bg-gray-100">
                            <XIcon className="w-5 h-5 text-gray-500"/>
                        </button>
                    </div>
                )}
            </div>

            <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6 pb-40">
                <div className="flex justify-between items-start px-2 py-4 bg-white rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 -z-10 mx-10 sm:mx-16"></div>
                    <div 
                        className="absolute top-8 left-0 h-0.5 bg-[var(--employer-primary)] -z-10 mx-10 sm:mx-16 transition-all duration-300" 
                        style={{width: `calc(((100% - 80px) / 3) * ${currentStep - 1})`}}
                    ></div>

                    <StepIndicator step={1} title="Detaylar" isActive={currentStep === 1} isCompleted={currentStep > 1} />
                    <StepIndicator step={2} title="Lojistik" isActive={currentStep === 2} isCompleted={currentStep > 2} />
                    <StepIndicator step={3} title="Ödeme" isActive={currentStep === 3} isCompleted={currentStep > 3} />
                    <StepIndicator step={4} title="Önizleme" isActive={currentStep === 4} isCompleted={false} />
                </div>

                {renderStepContent()}
            </main>

            <footer className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-[var(--employer-border)] flex gap-4 z-30">
                <button 
                    onClick={currentStep === 1 ? onBack : () => setCurrentStep(prev => prev - 1)} 
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center border border-gray-200"
                >
                    <ChevronLeftIcon className="w-5 h-5 mr-2" />
                    {currentStep === 1 ? 'İptal' : 'Geri'}
                </button>
                
                {currentStep < 4 ? (
                    <button onClick={handleNext} className="flex-[2] py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center shadow-lg shadow-black/10">
                        İleri
                        <ChevronRightIcon className="w-5 h-5 ml-2" />
                    </button>
                ) : (
                    <button 
                        onClick={handleSubmit} 
                        className="flex-[2] py-3 bg-[var(--employer-primary)] text-black font-bold rounded-xl hover:scale-[1.02] shadow-lg shadow-[var(--employer-primary)]/30 transition-all duration-300 transform flex items-center justify-center"
                    >
                        <span>{jobToEdit ? 'Güncelle ve Onaya Gönder' : 'Onayla ve Öde'}</span>
                        <ChevronRightIcon className="w-5 h-5 ml-2" />
                    </button>
                )}
            </footer>
        </div>
    );
};
