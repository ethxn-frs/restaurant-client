pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/ethxn-frs/restaurant-client.git', credentialsId: '5de0e5af-c4af-45cf-8a7a-b20a599baf8a'
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
                sh 'npm install --save-dev @babel/plugin-proposal-private-property-in-object' // Ajouter la dépendance manquante
            }
        }

        stage('Build') {
            steps {
                // Désactiver CI=true pour ignorer les warnings comme erreurs
                sh 'CI=false npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Commande pour déployer le front-end sur ton serveur Nginx
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