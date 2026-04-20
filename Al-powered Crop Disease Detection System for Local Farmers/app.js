// ============================================
// Crop Disease Detection System - Main App
// ============================================

class CropDiseaseApp {
    constructor() {
        this.currentLanguage = 'en';
        this.currentImage = null;
        this.isOnline = navigator.onLine;
        this.scanHistory = this.loadHistory();
        
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.updateConnectionStatus();
        this.renderHistory();
        this.checkServiceWorker();
    }

    cacheElements() {
        // Upload elements
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.selectFileBtn = document.getElementById('selectFileBtn');
        this.takePhotoBtn = document.getElementById('takePhotoBtn');
        this.imagePreviewContainer = document.getElementById('imagePreviewContainer');
        this.imagePreview = document.getElementById('imagePreview');
        this.removeImageBtn = document.getElementById('removeImageBtn');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        
        // Progress and results
        this.analysisProgress = document.getElementById('analysisProgress');
        this.resultsSection = document.getElementById('resultsSection');
        
        // Disease info elements
        this.diseaseName = document.getElementById('diseaseName');
        this.confidenceValue = document.getElementById('confidenceValue');
        this.diseaseDescription = document.getElementById('diseaseDescription');
        this.severityIndicator = document.getElementById('severityIndicator');
        
        // Treatment lists
        this.organicTreatmentList = document.getElementById('organicTreatmentList');
        this.chemicalTreatmentList = document.getElementById('chemicalTreatmentList');
        this.preventiveMeasuresList = document.getElementById('preventiveMeasuresList');
        
        // Action buttons
        this.saveResultsBtn = document.getElementById('saveResultsBtn');
        this.newAnalysisBtn = document.getElementById('newAnalysisBtn');
        
        // Language and connection
        this.languageSelect = document.getElementById('languageSelect');
        this.connectionStatus = document.getElementById('connectionStatus');
        
        // History
        this.historyList = document.getElementById('historyList');
        
        // Toast
        this.toastContainer = document.getElementById('toastContainer');
        
        // Download model
        this.downloadModelBtn = document.getElementById('downloadModelBtn');
    }

    bindEvents() {
        // File upload events
        this.selectFileBtn.addEventListener('click', () => this.fileInput.click());
        this.takePhotoBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', () => this.handleDragLeave());
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        
        // Image preview actions
        this.removeImageBtn.addEventListener('click', () => this.removeImage());
        this.analyzeBtn.addEventListener('click', () => this.analyzeImage());
        
        // Result actions
        this.saveResultsBtn.addEventListener('click', () => this.saveResults());
        this.newAnalysisBtn.addEventListener('click', () => this.resetAnalysis());
        
        // Language change
        this.languageSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        
        // Connection status
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
        
        // Download model
        this.downloadModelBtn.addEventListener('click', () => this.downloadModel());
    }

    // File Upload Handlers
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave() {
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(event) {
        event.preventDefault();
        this.uploadArea.classList.remove('dragover');
        
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            this.processFile(file);
        } else {
            this.showToast('Please upload an image file', 'error');
        }
    }

    processFile(file) {
        if (!file.type.startsWith('image/')) {
            this.showToast(this.translate('errorOccurred'), 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImage = e.target.result;
            this.imagePreview.src = this.currentImage;
            this.uploadArea.style.display = 'none';
            this.imagePreviewContainer.style.display = 'block';
            this.showToast(this.translate('imageUploaded'), 'success');
        };
        reader.readAsDataURL(file);
    }

    removeImage() {
        this.currentImage = null;
        this.imagePreview.src = '';
        this.fileInput.value = '';
        this.imagePreviewContainer.style.display = 'none';
        this.uploadArea.style.display = 'block';
        this.resultsSection.style.display = 'none';
    }

    // Analysis
    async analyzeImage() {
        if (!this.currentImage) {
            this.showToast(this.translate('errorOccurred'), 'error');
            return;
        }

        // Show progress
        this.imagePreviewContainer.style.display = 'none';
        this.analysisProgress.style.display = 'block';

        // Simulate analysis (replace with actual API call)
        try {
            const result = await this.simulateAnalysis();
            this.displayResults(result);
            this.addToHistory(result);
        } catch (error) {
            this.showToast(this.translate('errorOccurred'), 'error');
            this.imagePreviewContainer.style.display = 'block';
        } finally {
            this.analysisProgress.style.display = 'none';
        }
    }

    simulateAnalysis() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulated result - replace with actual ML model inference
                const diseases = [
                    {
                        name: 'Leaf Blast',
                        description: 'A fungal disease that causes diamond-shaped lesions on leaves. It can reduce yield by up to 40% if not treated early.',
                        severity: 'medium',
                        confidence: 92,
                        organic: [
                            'Apply neem oil spray (3%) every 7 days',
                            'Use compost tea as foliar spray',
                            'Apply Trichoderma viride biofungicide'
                        ],
                        chemical: [
                            'Apply Carbendazim 50% WP (1g/L water)',
                            'Use Tricyclazole 75% WP (1g/L water)',
                            'Spray Isoprothiolane 40% EC (1.5ml/L)'
                        ],
                        preventive: [
                            'Use disease-resistant varieties',
                            'Avoid excessive nitrogen fertilization',
                            'Maintain proper spacing between plants',
                            'Ensure good drainage in the field'
                        ]
                    },
                    {
                        name: 'Bacterial Blight',
                        description: 'A bacterial disease causing yellow to white lesions along leaf veins. Can cause significant yield losses in rice.',
                        severity: 'high',
                        confidence: 88,
                        organic: [
                            'Spray copper oxychloride (0.3%)',
                            'Apply neem-based formulations',
                            'Use biocontrol agents like Pseudomonas fluorescens'
                        ],
                        chemical: [
                            'Apply Streptomycin sulfate (100ppm)',
                            'Use Copper hydroxide (2g/L water)',
                            'Spray Carbendazim + Mancozeb combination'
                        ],
                        preventive: [
                            'Use certified disease-free seeds',
                            'Avoid water stagnation',
                            'Practice crop rotation',
                            'Remove and destroy infected plant debris'
                        ]
                    },
                    {
                        name: 'Brown Spot',
                        description: 'Fungal disease causing brown oval spots on leaves. Common in nutrient-deficient soils.',
                        severity: 'low',
                        confidence: 95,
                        organic: [
                            'Apply potash to correct deficiency',
                            'Use neem cake in soil',
                            'Spray cow urine dilution (1:10)'
                        ],
                        chemical: [
                            'Apply Mancozeb 75% WP (2g/L water)',
                            'Use Carbendazim 50% WP (1g/L water)',
                            'Spray Propiconazole 25% EC (1ml/L)'
                        ],
                        preventive: [
                            'Apply balanced fertilizers',
                            'Correct potassium deficiency',
                            'Use resistant varieties',
                            'Maintain proper plant nutrition'
                        ]
                    }
                ];

                const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
                resolve(randomDisease);
            }, 2000);
        });
    }

    displayResults(result) {
        // Update disease info
        this.diseaseName.textContent = result.name;
        this.confidenceValue.textContent = `${result.confidence}%`;
        this.diseaseDescription.textContent = result.description;

        // Update severity
        this.severityIndicator.className = `severity-indicator ${result.severity}`;

        // Update treatment lists
        this.populateList(this.organicTreatmentList, result.organic);
        this.populateList(this.chemicalTreatmentList, result.chemical);
        this.populateList(this.preventiveMeasuresList, result.preventive);

        // Show results
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        this.showToast(this.translate('analysisComplete'), 'success');
    }

    populateList(element, items) {
        element.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    }

    resetAnalysis() {
        this.removeImage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    saveResults() {
        // Create a printable/savable version
        const results = {
            disease: this.diseaseName.textContent,
            confidence: this.confidenceValue.textContent,
            date: new Date().toLocaleString(),
            image: this.currentImage
        };

        // Save to localStorage
        const savedResults = JSON.parse(localStorage.getItem('savedResults') || '[]');
        savedResults.push(results);
        localStorage.setItem('savedResults', JSON.stringify(savedResults));

        this.showToast(this.translate('resultsSaved'), 'success');
    }

    // History Management
    addToHistory(result) {
        const historyItem = {
            id: Date.now(),
            disease: result.name,
            confidence: result.confidence,
            date: new Date().toISOString(),
            image: this.currentImage
        };

        this.scanHistory.unshift(historyItem);
        if (this.scanHistory.length > 10) {
            this.scanHistory.pop();
        }

        localStorage.setItem('scanHistory', JSON.stringify(this.scanHistory));
        this.renderHistory();
    }

    loadHistory() {
        const saved = localStorage.getItem('scanHistory');
        return saved ? JSON.parse(saved) : [];
    }

    renderHistory() {
        if (this.scanHistory.length === 0) {
            this.historyList.innerHTML = `<p class="empty-history">${this.translate('noHistory')}</p>`;
            return;
        }

        this.historyList.innerHTML = this.scanHistory.map(item => `
            <div class="history-item">
                <img src="${item.image}" alt="Scan" class="history-image">
                <div class="history-details">
                    <div class="history-disease">${item.disease}</div>
                    <div class="history-date">${new Date(item.date).toLocaleDateString()}</div>
                </div>
                <div class="history-confidence">${item.confidence}%</div>
            </div>
        `).join('');
    }

    // Language Management
    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.updatePageLanguage();
    }

    updatePageLanguage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update history if empty
        if (this.scanHistory.length === 0) {
            this.historyList.innerHTML = `<p class="empty-history">${this.translate('noHistory')}</p>`;
        }
    }

    translate(key) {
        const langData = translations[this.currentLanguage];
        return langData ? langData[key] : translations['en'][key];
    }

    // Connection Status
    updateConnectionStatus() {
        const statusDot = this.connectionStatus.querySelector('.status-dot');
        const statusText = this.connectionStatus.querySelector('.status-text');

        if (this.isOnline) {
            statusDot.classList.add('online');
            statusDot.classList.remove('offline');
            statusText.textContent = 'Online';
        } else {
            statusDot.classList.remove('online');
            statusDot.classList.add('offline');
            statusText.textContent = 'Offline';
        }
    }

    handleOnline() {
        this.isOnline = true;
        this.updateConnectionStatus();
        this.showToast(this.translate('onlineMessage'), 'success');
    }

    handleOffline() {
        this.isOnline = false;
        this.updateConnectionStatus();
        this.showToast(this.translate('offlineMessage'), 'warning');
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${message}</span>
        `;

        this.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Service Worker for Offline Support
    checkServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    downloadModel() {
        // Simulate model download
        this.showToast('Downloading model...', 'info');
        
        setTimeout(() => {
            localStorage.setItem('modelDownloaded', 'true');
            this.showToast(this.translate('modelDownloaded'), 'success');
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CropDiseaseApp();
});
