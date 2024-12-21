pipeline {
    agent any
    environment {
        // Define Docker image name and version
        DOCKER_IMAGE = 'nadiah92/flowcart.frontend'
        DOCKER_TAG = "latest-${BUILD_NUMBER}" // or use a specific version
        registryCredential = 'dockerCredentials'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your repository
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        // stage('Run Unit Tests') {
        //     steps {
        //         script {
        //             // Run unit tests (e.g., using Jest or Mocha)
        //             sh 'npm test'
        //         }
        //     }
        // }
        stage('Run Sonarqube') {
            environment {
                scannerHome = tool 'Sonar'
            }
            steps {
                withSonarQubeEnv(credentialsId: 'Sonar', installationName: 'sq1') {
                    sh '${scannerHome}/bin/sonar-scanner \
                     -Dsonar.projectKey=nadiah-m_FlowCart.frontend \
                     -Dsonar.organization=nadiah-m'
                }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        stage('Upload Image') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push("V$BUILD_NUMBER")
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }
}
