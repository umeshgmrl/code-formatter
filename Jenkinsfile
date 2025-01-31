pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('b1440d66-e7be-498f-8fec-c2467edb2a7d')
        AWS_SECRET_ACCESS_KEY = credentials('b1440d66-e7be-498f-8fec-c2467edb2a7d')
        S3_BUCKET = 'rajesh-react-app'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/umeshgmrl/code-formatter.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to S3') {
            steps {
                sh '''
                aws s3 sync build/ s3://$S3_BUCKET --delete
                '''
            }
        }
    }
}
