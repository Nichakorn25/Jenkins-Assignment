# 🔥 Auto Deployment: React + Firebase + Jenkins + Docker + GitHub + VS Code
โปรเจคนี้แสดงการตั้งค่า CI/CD อัตโนมัติ ด้วย Jenkins โดยใช้ Docker, GitHub, Firebase Hosting และ React + TypeScript (TSX)

# 🧱 Stack ที่ใช้
- React + TypeScript
- Firebase Hosting
- Jenkins (Pipeline)
- Docker + Docker Compose
- GitHub (Webhook)
- VS Code + Dev Tunnels

# 🚧 ขั้นตอนการติดตั้ง
### 1️⃣ รัน Jenkins ด้วย Docker Compose
docker login
docker compose up --build
- เข้าผ่าน localhost:8080
- ใช้คำสั่งดึงรหัสแรกเข้า:
docker exec jenkins cat /var/jenkins-nodejs/secrets/initialAdminPassword
- ใส่รหัสในหน้า Jenkins → ติดตั้ง Plugin และสร้างผู้ใช้งาน
  
### 2️⃣ ตั้งค่า Jenkins Pipeline
1.ไปที่ Jenkins dashboard → New Item → ตั้งชื่อ (เช่น Auto-Deploy) → เลือก Pipeline
2.ไปที่ Configure
Build Triggers → ติ๊ก GitHub hook trigger for GITScm polling
Pipeline → Script from SCM
SCM: Git
กำหนด Repository URL, Branch, และ Script Path ให้ถูกต้อง

### 3️⃣ เปิด Jenkins ให้เข้าจากภายนอก (ผ่าน Dev Tunnel)
บน VS Code:

เปิด Terminal → คลิก "Port Forward" → Forward พอร์ต 8080
จะได้ URL เช่น:
https://f1pik2bs0-8080.asse.devtunnels.ms/
ใน Jenkins:

ไปที่ Manage Jenkins → System
ใส่ Jenkins URL ที่ได้ แล้ว Apply & Save
ใน GitHub:

ไปที่ Settings → Webhooks → Add webhook
URL = <Jenkins URL>/github-webhook/
เช่น: https://f1pik2bs0-8080.asse.devtunnels.ms/github-webhook/

### 4️⃣ สร้าง React Project + Firebase Hosting
npx create-react-app auto-deploy --template typescript
cd auto-deploy
npm install firebase
ไปที่ Firebase Console
สร้างโปรเจค + เปิดใช้งาน Hosting
คัดลอก config มาใส่ใน firebase.tsx
แก้ไฟล์ firebase.json
{
  "hosting": {
    "public": "dist", // เพิ่ม public
    "site": "auto-deploy01", //เพิ่ม site
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

### 5️⃣ ดึง Firebase Token และใส่ใน Jenkins
npm install -g firebase-tools
firebase login
firebase login:ci
Copy token ที่ได้
ไปที่ Jenkins → Manage Credentials → (global) → Add Credentials
Kind: Secret Text
ID: FIREBASE_TOKEN
Secret: วาง Token ที่ได้
🚀 Jenkins Pipeline Script
pipeline {
    agent any

    environment {
        FIREBASE_PROJECT = 'auto-deploy01'
    }

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('auto-deploy') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Install Firebase CLI') {
            steps {
                dir('auto-deploy') {
                    sh 'npm install firebase-tools'
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'FIREBASE_TOKEN', variable: 'FIREBASE_TOKEN')]) {
                    dir('auto-deploy') {
                        sh 'npx firebase deploy --only hosting:$FIREBASE_PROJECT --token $FIREBASE_TOKEN'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment succeeded.'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
🎯 ผลลัพธ์
ทุกครั้งที่ Push ไปยัง GitHub → GitHub ส่ง Webhook → Jenkins ดึง Code → Build → Deploy ไปยัง Firebase Hosting โดยอัตโนมัติ 🎉
