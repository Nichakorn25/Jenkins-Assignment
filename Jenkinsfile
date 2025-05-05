pipeline {
    agent any

    environment {
        FIREBASE_PROJECT = 'assignment5-jenkins'
    }

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('assignment-5-s-n') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Install Firebase CLI') {
            steps {
                dir('assignment-5-s-n') {
                    sh 'npm install firebase-tools'
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'FIREBASE_TOKEN', variable: 'FIREBASE_TOKEN')]) {
                    dir('assignment-5-s-n') {
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