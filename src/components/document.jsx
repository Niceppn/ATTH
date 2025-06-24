import React, { useState, useEffect } from 'react';
import { 
  Upload, Download, Trash2, FileText, Image, File,
  Eye, EyeOff, Keyboard, Users, CheckCircle,
  AlertTriangle, Search, Filter, BarChart3, Menu, X,
  Home, Folder, ClipboardCheck, Settings, HelpCircle
} from 'lucide-react';

const AccessibilityTestingSite = () => {
  const [documents, setDocuments] = useState([]);
  const [testForms, setTestForms] = useState([]);
  const [activeTab, setActiveTab] = useState('documents');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [screenReaderMode, setScreenReaderMode] = useState(false);

  // Initialize with accessibility testing documents
  useEffect(() => {
    const initialDocs = [
      {
        id: 1,
        name: 'WCAG_2.1_Checklist.pdf',
        type: 'application/pdf',
        size: 1024 * 1024,
        category: 'guidelines',
        accessibilityScore: 'A',
        uploadDate: new Date().toISOString(),
        description: 'เอกสารแนวทางการทดสอบตาม WCAG 2.1'
      },
      {
        id: 2,
        name: 'Screen_Reader_Test_Results.docx',
        type: 'application/msword',
        size: 512 * 1024,
        category: 'test-results',
        accessibilityScore: 'AA',
        uploadDate: new Date().toISOString(),
        description: 'ผลการทดสอบการใช้งานกับ Screen Reader'
      },
      {
        id: 3,
        name: 'Color_Contrast_Analysis.png',
        type: 'image/png',
        size: 256 * 1024,
        category: 'analysis',
        accessibilityScore: 'AAA',
        uploadDate: new Date().toISOString(),
        description: 'การวิเคราะห์ความคมชัดของสี'
      },
      {
        id: 4,
        name: 'Keyboard_Navigation_Report.txt',
        type: 'text/plain',
        size: 128 * 1024,
        category: 'test-results',
        accessibilityScore: 'AA',
        uploadDate: new Date().toISOString(),
        description: 'รายงานการทดสอบการใช้แป้นพิมพ์'
      }
    ];

    const initialForms = [
      {
        id: 1,
        name: 'แบบฟอร์มการทดสอบ Screen Reader',
        type: 'screen-reader',
        status: 'completed',
        lastModified: new Date().toISOString(),
        fields: ['ชื่อเว็บไซต์', 'URL', 'เครื่องมือที่ใช้', 'ผลการทดสอบ']
      },
      {
        id: 2,
        name: 'แบบฟอร์มการทดสอบ Keyboard Navigation',
        type: 'keyboard',
        status: 'in-progress',
        lastModified: new Date().toISOString(),
        fields: ['หน้าที่ทดสอบ', 'การเลื่อนด้วย Tab', 'Focus Indicator', 'Shortcut Keys']
      },
      {
        id: 3,
        name: 'แบบฟอร์มการทดสอบ Color Contrast',
        type: 'color-contrast',
        status: 'draft',
        lastModified: new Date().toISOString(),
        fields: ['สีพื้นหลัง', 'สีข้อความ', 'Contrast Ratio', 'WCAG Level']
      }
    ];

    setDocuments(initialDocs);
    setTestForms(initialForms);
  }, []);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const newDoc = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          category: 'uploaded',
          accessibilityScore: 'pending',
          uploadDate: new Date().toISOString(),
          description: 'เอกสารที่อัปโหลดใหม่'
        };
        setDocuments(prev => [...prev, newDoc]);
      };
      reader.readAsDataURL(file);
    });
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.category === filterType;
    return matchesSearch && matchesFilter;
  });

  const getAccessibilityBadge = (score) => {
    const badges = {
      'AAA': { color: 'bg-success', text: 'AAA' },
      'AA': { color: 'bg-primary', text: 'AA' },
      'A': { color: 'bg-warning', text: 'A' },
      'pending': { color: 'bg-secondary', text: 'รอการประเมิน' }
    };
    return badges[score] || badges.pending;
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return <FileText className="text-danger" size={24} />;
    if (type.includes('image')) return <Image className="text-success" size={24} />;
    return <File className="text-secondary" size={24} />;
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const AccessibilityToolbar = () => (
    <div className={`accessibility-toolbar p-3 mb-3 ${highContrast ? 'bg-dark text-light' : 'bg-light'} border rounded`}>
      <div className="row align-items-center">
        <div className="col-md-8">
          <div className="d-flex flex-wrap gap-3">
            <button
              className={`btn btn-sm ${highContrast ? 'btn-outline-light' : 'btn-outline-dark'}`}
              onClick={() => setHighContrast(!highContrast)}
              aria-label="เปิด/ปิดโหมดความคมชัดสูง"
            >
              <Eye className="me-1" size={16} />
              ความคมชัดสูง
            </button>
            
            <div className="btn-group" role="group" aria-label="ขนาดตัวอักษร">
              <button
                className={`btn btn-sm ${fontSize === 'small' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFontSize('small')}
              >
                A-
              </button>
              <button
                className={`btn btn-sm ${fontSize === 'medium' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFontSize('medium')}
              >
                A
              </button>
              <button
                className={`btn btn-sm ${fontSize === 'large' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFontSize('large')}
              >
                A+
              </button>
            </div>

            <button
              className={`btn btn-sm ${screenReaderMode ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setScreenReaderMode(!screenReaderMode)}
              aria-label="เปิด/ปิดโหมด Screen Reader"
            >
              <Users className="me-1" size={16} />
              Screen Reader
            </button>
          </div>
        </div>
        <div className="col-md-4 text-end">
          <span className="badge bg-info">
            <Keyboard className="me-1" size={16} />
            กด Tab เพื่อนำทาง
          </span>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`sidebar ${sidebarOpen ? 'show' : ''} ${highContrast ? 'bg-dark text-light' : 'bg-primary text-white'}`}>
      <div className="sidebar-header p-3">
        <h5 className="mb-0">
          <Users className="me-2" size={20} />
          Accessibility Testing
        </h5>
        <button
          className="btn btn-sm btn-outline-light d-md-none float-end"
          onClick={() => setSidebarOpen(false)}
          aria-label="ปิดเมนู"
        >
          <X size={16} />
        </button>
      </div>
      
      <nav className="sidebar-nav p-3">
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className={`nav-link w-100 text-start ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Home className="me-2" size={16} />
              หน้าหลัก
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`nav-link w-100 text-start ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <Folder className="me-2" size={16} />
              เอกสารการทดสอบ
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`nav-link w-100 text-start ${activeTab === 'forms' ? 'active' : ''}`}
              onClick={() => setActiveTab('forms')}
            >
              <ClipboardCheck className="me-2" size={16} />
              แบบฟอร์มทดสอบ
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`nav-link w-100 text-start ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="me-2" size={16} />
              การตั้งค่า
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );

  const DocumentsTab = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>เอกสารการทดสอบเพื่อการเข้าถึง</h2>
        <div className="d-flex gap-2">
          <input
            type="file"
            id="fileUpload"
            multiple
            onChange={handleFileUpload}
            className="d-none"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
          />
          <label htmlFor="fileUpload" className="btn btn-primary">
            <Upload className="me-1" size={16} />
            อัปโหลดเอกสาร
          </label>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="ค้นหาเอกสาร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="ค้นหาเอกสาร"
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            aria-label="กรองประเภทเอกสาร"
          >
            <option value="all">ทุกประเภท</option>
            <option value="guidelines">แนวทาง</option>
            <option value="test-results">ผลการทดสอบ</option>
            <option value="analysis">การวิเคราะห์</option>
            <option value="uploaded">อัปโหลดใหม่</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredDocuments.map(doc => (
          <div key={doc.id} className="col-lg-4 col-md-6 mb-4">
            <div className={`card h-100 ${highContrast ? 'bg-dark text-light border-light' : ''}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="file-icon" style={{ fontSize: '2rem' }}>
                    {getFileIcon(doc.type)}
                  </div>
                  <span className={`badge ${getAccessibilityBadge(doc.accessibilityScore).color}`}>
                    {getAccessibilityBadge(doc.accessibilityScore).text}
                  </span>
                </div>
                
                <h6 className="card-title">{doc.name}</h6>
                <p className="card-text text-muted small">{doc.description}</p>
                
                <div className="d-flex justify-content-between text-muted small mb-3">
                  <span>{formatBytes(doc.size)}</span>
                  <span>{new Date(doc.uploadDate).toLocaleDateString('th-TH')}</span>
                </div>
                
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary flex-fill">
                    <Download className="me-1" size={14} />
                    ดาวน์โหลด
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FormsTab = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>แบบฟอร์มการทดสอบ</h2>
        <button className="btn btn-success">
          <ClipboardCheck className="me-1" size={16} />
          สร้างแบบฟอร์มใหม่
        </button>
      </div>

      <div className="row">
        {testForms.map(form => (
          <div key={form.id} className="col-lg-6 col-md-12 mb-4">
            <div className={`card ${highContrast ? 'bg-dark text-light border-light' : ''}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h6 className="card-title mb-0">{form.name}</h6>
                  <span className={`badge ${
                    form.status === 'completed' ? 'bg-success' :
                    form.status === 'in-progress' ? 'bg-warning' : 'bg-secondary'
                  }`}>
                    {form.status === 'completed' ? 'เสร็จสิ้น' :
                     form.status === 'in-progress' ? 'กำลังดำเนินการ' : 'ร่าง'}
                  </span>
                </div>
                
                <p className="text-muted small mb-3">
                  แก้ไขล่าสุด: {new Date(form.lastModified).toLocaleDateString('th-TH')}
                </p>
                
                <div className="mb-3">
                  <small className="text-muted">ฟิลด์ในแบบฟอร์ม:</small>
                  <div className="mt-1">
                    {form.fields.slice(0, 2).map((field, index) => (
                      <span key={index} className="badge bg-light text-dark me-1 mb-1">
                        {field}
                      </span>
                    ))}
                    {form.fields.length > 2 && (
                      <span className="badge bg-light text-dark">
                        +{form.fields.length - 2} อื่นๆ
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-primary flex-fill">
                    แก้ไข
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    คัดลอก
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DashboardTab = () => (
    <div>
      <h2 className="mb-4">แดชบอร์ดการทดสอบเพื่อการเข้าถึง</h2>
      
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className={`card text-center ${highContrast ? 'bg-dark text-light border-light' : 'bg-primary text-white'}`}>
            <div className="card-body">
              <Folder className="mb-2" size={32} />
              <h4>{documents.length}</h4>
              <p className="mb-0">เอกสารทั้งหมด</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className={`card text-center ${highContrast ? 'bg-dark text-light border-light' : 'bg-success text-white'}`}>
            <div className="card-body">
              <ClipboardCheck className="mb-2" size={32} />
              <h4>{testForms.length}</h4>
              <p className="mb-0">แบบฟอร์มทดสอบ</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className={`card text-center ${highContrast ? 'bg-dark text-light border-light' : 'bg-warning text-white'}`}>
            <div className="card-body">
              <CheckCircle className="mb-2" size={32} />
              <h4>{documents.filter(d => d.accessibilityScore === 'AAA').length}</h4>
              <p className="mb-0">ผ่าน AAA</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className={`card text-center ${highContrast ? 'bg-dark text-light border-light' : 'bg-info text-white'}`}>
            <div className="card-body">
              <AlertTriangle className="mb-2" size={32} />
              <h4>{documents.filter(d => d.accessibilityScore === 'pending').length}</h4>
              <p className="mb-0">รอการประเมิน</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className={`card ${highContrast ? 'bg-dark text-light border-light' : ''}`}>
            <div className="card-header">
              <h5>การทดสอบล่าสุด</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                {documents.slice(0, 3).map(doc => (
                  <li key={doc.id} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-truncate me-2">{doc.name}</span>
                    <span className={`badge ${getAccessibilityBadge(doc.accessibilityScore).color}`}>
                      {getAccessibilityBadge(doc.accessibilityScore).text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className={`card ${highContrast ? 'bg-dark text-light border-light' : ''}`}>
            <div className="card-header">
              <h5>แบบฟอร์มที่ต้องดำเนินการ</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                {testForms.filter(f => f.status !== 'completed').map(form => (
                  <li key={form.id} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-truncate me-2">{form.name}</span>
                    <span className={`badge ${
                      form.status === 'in-progress' ? 'bg-warning' : 'bg-secondary'
                    }`}>
                      {form.status === 'in-progress' ? 'กำลังดำเนินการ' : 'ร่าง'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`app-container ${highContrast ? 'high-contrast' : ''} ${fontSize}`}>
      <div className="d-flex">

        
        <div className="main-content flex-fill">
          <div className="d-md-none p-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => setSidebarOpen(true)}
              aria-label="เปิดเมนู"
            >
              <Menu size={20} />
            </button>
          </div>
          
          <div className="container-fluid p-4">
            <AccessibilityToolbar />
            
            {activeTab === 'dashboard' && <DashboardTab />}
            {activeTab === 'documents' && <DocumentsTab />}
            {activeTab === 'forms' && <FormsTab />}
            {activeTab === 'settings' && (
              <div>
                <h2>การตั้งค่า</h2>
                <div className="alert alert-info">
                  <HelpCircle className="me-2" size={16} />
                  หน้านี้อยู่ระหว่างการพัฒนา
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 d-md-none"
          style={{ zIndex: 999 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AccessibilityTestingSite;