pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ethxn-frs/restaurant-client.git', credentialsId: '5de0e5af-c4af-45cf-8a7a-b20a599baf8a'
            }
        }

        stage('Install NodeJS') {
            steps {
                tool name: 'NodeJs 22', type: 'nodejs'
                script {
                    env.PATH = "${tool name: 'NodeJs 22', type: 'nodejs'}/bin:${env.PATH}"
                }
            }
        }

        stage('Check Node and NPM Versions') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                sudo rm -rf /var/www/restaurant-client/*
                sudo cp -r build/* /var/www/restaurant-client/
                '''
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed.'
        }
        success {
            echo 'Deployment succeeded.'
        }
    }
}
