# Enterprise Network Security System 🛡️

An intelligent, full-stack network intrusion detection system (IDS) that monitors, detects, and classifies network anomalies and cybersecurity threats in real time. 

Built during the **HCL Technologies Internship Program**, this system combines local machine learning classifiers (Random Forest & SVM), cluster-based anomaly detection (DBSCAN), and a sleek, modern React dashboard to give security analysts immediate visibility into network health.

---


## 🚀 Key Features

* **Advanced Machine Learning Detection**: Employs trained Random Forest and SVM models to classify network traffic into specific attack signatures (DDoS, Brute Force, Port Scan, Malware, etc.).
* **Zero-Day Anomaly Detection**: Uses unsupervised DBSCAN clustering to flag routing anomalies without pre-labeled signatures.
* **Modern Web Dashboard**: Responsive, clean dark-theme React user interface showing analysis history, key metrics cards, and actionable threat mitigations.
* **Comprehensive Audit Logs**: Stores analysis history in a secure local database (SQLite) for audit trails and compliance reviews.
* **Render-Ready Deployment**: Includes a zero-configuration Render Blueprint (`render.yaml`) for one-click cloud deployments.

---

## 🛠️ Technology Stack

* **Frontend**: React (Vite), Tailwind CSS, Axios, React Router.
* **Backend**: Flask REST API, Flask-CORS, SQLAlchemy, SQLite (`analysis.db`).
* **Machine Learning**: Python, Scikit-learn, Pandas, NumPy, Joblib.
* **Production Web Server**: Gunicorn (configured for Render).

---

## 📂 Project Architecture

```text
├── render.yaml                   # Render deployment configurations (Blueprint)
├── README.md                     # Documentation
├── project/
│   ├── backend/                  # Flask REST API
│   │   ├── app.py                # API entry point
│   │   ├── routes.py             # Route endpoints (/predict, /history, /stats)
│   │   ├── predict.py            # Prediction pipelines (Local & Groq LLM)
│   │   ├── train_model.py        # ML training script
│   │   └── models/               # Serialized classifier models (.pkl)
│   ├── frontend/                 # React SPA (Vite/JS)
│   │   ├── src/
│   │   │   ├── App.jsx           # Main layout and Footer
│   │   │   ├── pages/            # Dashboard, Upload, Results, History
│   │   │   └── services/api.js   # API client configuration
```

---

## 💻 Local Development Setup

### 1. Backend API Server Setup
1. Navigate to the backend directory:
   ```bash
   cd project/backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file inside `project/backend/` and configure your API environment variables.
5. Start the backend development server:
   ```bash
   python -m backend.app --port 5001 --debug
   ```

### 2. Frontend React Setup
1. Navigate to the frontend directory:
   ```bash
   cd project/frontend
   ```
2. Install Node packages:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.

---

## ☁️ Cloud Deployment (Render & Versal)

links ---https://hcl-frontend-iota.vercel.app/


7. ## 👤 Author Information

* **Author**: Akshu Panchal
* **Email**: [panchalchakshu0@gmail.com](mailto:panchalchakshu0@gmail.com)
* **LinkedIn**: [Akshu Panchal](https://www.linkedin.com/in/akshu-panchal-b658bb241?utm_source=share_via&utm_content=profile&utm_medium=member_ios)
* **Repository**: [HCL-backend](https://github.com/panchalchakshu0/HCL-backend.git)

---
